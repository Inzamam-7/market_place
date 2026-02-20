import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDB from './lib/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

//connecting databse
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PATCH','PUT'],
    credentials:true
}))
//routes
app.use("/api/v1",authRoutes)
app.use("/api/v1/",productRoutes)

//listening
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`);
})