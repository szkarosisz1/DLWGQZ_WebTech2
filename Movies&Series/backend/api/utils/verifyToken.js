import jwt from "jsonwebtoken"
import { CreateError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next(CreateError(401, "Nem vagy hitelesítve!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return next(CreateError(403, "Token nem érvényes!"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && (req.user.id || req.user.isAdmin)) {
            next();
        } else {
            return next(CreateError(403, "Nincs jogosultságod!"));
        }
    });
};


export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin) {
            next()
        } else {
            return next(CreateError(403, "Nincs jogosultságod!"))
        }
    })
}