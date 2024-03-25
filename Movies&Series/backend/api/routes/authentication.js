import express from "express"
import { login, register, registerAdmin, sendEmail, resetPassword, logout } from "../controllers/authentication.controller.js"

const router = express.Router()

//Register as User - Regisztráció Felhasználóként
router.post('/register', register)

//Login - Bejelentkezés
router.post('/login', login)

//Logout - Kijelentkezés
router.post('/logout', logout)

//Register as Admin - Regisztráció Adminként
router.post('/register-admin', registerAdmin)

//Send reset email - Email küldése a jelszó visszaállításához
router.post('/send-email', sendEmail)

//Reset password - Jelszó visszaállítása
router.post('/reset-password', resetPassword)

export default router