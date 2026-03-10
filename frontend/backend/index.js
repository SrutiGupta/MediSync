import express from "express";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket/socket.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import bedRoutes from "./routes/bed.routes.js";
import dashboardRoutes from "./routes/dash.routes.js"
import queueRoutes from "./routes/queue.routes.js";
import cookieParser from "cookie-parser"

dotenv.config();
connectDB();

const app=express()
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/beds", bedRoutes);
app.use("/api/patients", patientRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/queue", queueRoutes);
// create HTTP server
const server = http.createServer(app);

// initialize socket
initSocket(server);
app.listen (process.env.PORT,()=>{
 console.log(`Server is running on port ${process.env.PORT}`)
})
