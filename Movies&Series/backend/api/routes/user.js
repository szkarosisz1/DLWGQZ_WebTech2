import express from "express"
import { getAllUsers, getUserById } from "../controllers/user.controller.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router();

//Get all Users - Összes Felhasználó kilistázása 
router.get('/', verifyAdmin, getAllUsers)

//Get User by Id - Felhasználó kilistázása Id alapján
router.get('/:id', verifyUser, getUserById)

export default router