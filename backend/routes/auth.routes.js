import express from "express"
import {logIn,SignUp,logOut} from "../controllers/auth.controller.js"
 const router=express.Router()
 router.post("/signup",SignUp) 
router.get("/login", (_req, res) => {
	res.status(405).json({ message: "Use POST /api/auth/login to log in." })
})
router.post("/login",logIn)
router.post("/logout",logOut)
export default router