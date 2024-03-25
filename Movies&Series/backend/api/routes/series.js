import express from "express"
import { createSeries, updateSeries, getAllSeries, deleteSeries } from "../controllers/series.controller.js"
import { verifyUser } from "../utils/verifyToken.js"
const router = express.Router();

//Create a new Series - Új sorozat létrehozása
router.post('/create', verifyUser, createSeries)

//Update Series - Sorozat módosítása 
router.put('/update/:id', verifyUser, updateSeries)

//Get all Series - Összes sorozat kilistázása
router.get('/getAll', verifyUser, getAllSeries)

//Delete Series by Id - Sorozat törlése Id alapján
router.delete('/delete/:id', verifyUser, deleteSeries)

export default router
