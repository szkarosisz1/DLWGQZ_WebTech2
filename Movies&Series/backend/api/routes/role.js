import express from "express"
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//Create a new Role - Új Pozíció létrehozása
router.post('/create', verifyAdmin, createRole)

//Update Role - Pozíció módosítása
router.put('/update/:id', verifyAdmin, updateRole)

//Get all Roles - Összes Pozíció kilistázása
router.get('/getAll', verifyAdmin, getAllRoles)

//Delete Role by Id - Pozíció törlése Id alapján 
router.delete('/deleteRole/:id', verifyAdmin, deleteRole)

export default router