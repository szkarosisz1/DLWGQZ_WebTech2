import User from "../models/User.js"

export const getAllUsers = async (req, res, next)=>{
    try {
        const users = await User.find()
        return res.status(200).json({ success: true, status: 200, message: 'Összes felhasználó kilistázva', data: users })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const getUserById = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user) 
        return res.status(404).json({ success: false, error: "Felhasználó nem található!" })       
            return res.status(200).json({ success: true, status: 200, message: 'felhasználó Id-ja', data: user })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}