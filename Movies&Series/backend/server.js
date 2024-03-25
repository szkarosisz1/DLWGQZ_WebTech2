import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import roleRoute from '../backend/api/routes/role.js'
import authenticationRoute from '../backend/api/routes/authentication.js'
import userRoute from '../backend/api/routes/user.js'
import moviesRoute from '../backend/api/routes/movies.js'
import seriesRoute from '../backend/api/routes/series.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app = express()
dotenv.config()


const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Sikeresen kapcsolódott a MongoDB-hez!")
    } catch (error) {
        throw error
    }
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use('/api/role', roleRoute)
app.use('/api/authentication', authenticationRoute)
app.use('/api/user', userRoute)
app.use('/api/movies', moviesRoute)
app.use('/api/series', seriesRoute)

//Response Handler Middleware
app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500
    const message = obj.message || "Valamilyen hiba történt!"
    return res.status(statusCode).json({
        success: [200,201,404].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
})

app.listen(8800, ()=>{
    connectMongoDB()
    console.log("Sikeresen kapcsolódott a Backend-hez!")
})
