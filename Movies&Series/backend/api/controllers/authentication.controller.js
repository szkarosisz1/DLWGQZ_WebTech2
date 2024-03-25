import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"
import nodemailer from "nodemailer"
import UserToken from "../models/UserToken.js"


export const register = async (req, res, next)=>{
    if (!req.body.userName) {
        return res.status(400).send("Felhasználónév megadása kötelező!");
    }

    const role = await Role.findOne({ role: 'User' });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        roles: role
    });     
    await newUser.save();           
    return next(CreateSuccess(200,"Felhasználó sikeresen regisztrált!"))  
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role")

        const { roles } = user
        if (!user) {
            return next(CreateError(404, "Felhasználó nem található!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(CreateError(400, "Jelszó helytelen!"))
        }
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )
        
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200, 
            message: "Sikeres bejelentkezés",
            data: user
        })
    } catch (error) {
        return next(CreateError(500, "Valamilyen hiba történt!"))
    }
}

export const logout = async (req, res, next) => {
    try {     
        res.clearCookie('access_token', { httpOnly: true, expires: new Date(0)})
        .status(200)
        .json({
            status: 200, 
            message: "Sikeres kijelentkezés"
        })
    } catch (error) {
        console.log(error)
        return next(CreateError(500, "Nem sikerült a kijelentkezés."))
    }
}

export const registerAdmin = async (req, res, next)=>{
    if (!req.body.userName) {
        return res.status(400).send("Felhasználónév megadása kötelező!")
    }

    const role = await Role.find({});
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        isAdmin: true,
        roles: role
    });     
    await newUser.save();           
    return next(CreateSuccess(200,"Admin sikeresen regisztrált!"))  
}

export const sendEmail = async (req, res, next) => {
    const email = req.body.email
        const user = await User.findOne({ email: { $regex: '^'+email+'$', $options: 'i' } })
        if (!user) {
            return next(CreateError(404, "Felhasználó nem található!"))
        }

        const payload = {
            email: user.email
        };
        const expiryTime = 300
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime })

        const newToken = new UserToken({
            userId: user._id,
            token: token
        })

        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "szkarosi.szilard@gmail.com",
                pass: "lxxsljcsfzivrzbs" 
            }
        })

        let mailDetails = {
            from: "szkarosi.szilard@gmail.com",
            to: email,
            subject: "Jelszó visszaállítása",
            html: `
                <html>
                <head>
                    <title>Jelszó Visszaállítás Kérelem</title>    
                </head>
                <body>
                    <h1>Jelszó Visszaállítás Kérelem</h1>
                    <p>Kedves ${user.userName}!</p>
                    <p>Kérés érkezett hozzánk, hogy állítsuk vissza jelszavát MoviesAndSeries fiókjához.
                    A jelszó-visszaállítási folyamat befejezéséhez kérjük, kattintson az alábbi gombra:</p>
                    <a href=${process.env.LIVE_URL}/reset/${token}>
                    <button style="background-color: #38B000"; color: white; padding: 25px 25px; border:none; cursor: pointer;
                        border-radius: 4px;">Jelszó visszaállítás</button>
                    </a>
                    <p>Felhívjuk figyelmét, hogy ez a link csak 5 percig érvényes. Ha nem kérte a jelszó visszaállítását,
                    kérjük, hagyja figyelmen kívül ezt az üzenetet.</p>
                    <p>Üdvözlettel:</p>
                    <p>IT Szervezet</p>   
                </body>
                </html>        
            `,
        }

        mailTransporter.sendMail(mailDetails, async (err, data) => {
            if (err) {
                console.log(err)
                throw CreateError(500, "Valamilyen hiba történt az Email küldése során.")
            } else {
                await newToken.save()
                return CreateSuccess(200, "Email elküldése sikeresen megtörtént!")
            }
        })
}

export const resetPassword = async (req, res, next) => {
    const token = req.body.token
    const newPassword = req.body.password

    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
        if (err) {
            return next(CreateError(500, "A jelszó visszaállító link lejárt!"))
        } else {
            const response = data
            const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } })
            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hash(newPassword, salt)
            user.password = encryptedPassword
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(CreateSuccess(200, "Jelszó visszaállítása sikeresen megtörtént."))
            } catch (error) {
                return next(CreateError(500, "Valamilyen hiba történt a jelszó visszaállítása során."))
            }
        }
    })
}