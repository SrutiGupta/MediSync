import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();
const app=express()
app.use("/api/auth",authRoutes)

app.listen (process.env.PORT,()=>{
 console.log(`Server is running on port ${process.env.PORT}`)
})
