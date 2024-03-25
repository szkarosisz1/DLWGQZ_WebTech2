import express from "express"
import { createMovies, updateMovie, getAllMovies, deleteMovie } from "../controllers/movies.controller.js"
import { verifyUser } from "../utils/verifyToken.js"
const router = express.Router();

//Create a new Movies - Új film létrehozása
router.post('/create', verifyUser, createMovies)

//Update Movies - Film módosítása
router.put('/update/:id', verifyUser, updateMovie)

//Get all Movies - Összes film kilistázása 
router.get('/getAll', verifyUser, getAllMovies)

//Delete Movie by Id - Film törlése Id alapján
router.delete('/delete/:id', verifyUser, deleteMovie)

export default router