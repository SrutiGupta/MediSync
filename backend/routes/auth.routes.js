import express from "express"
import {logIn,SignUp,logOut} from "../controllers/auth.controller.js"
 const router=express.Router()
 router.post("/signup",SignUp)
router.post("/login",logIn)
router.post("/logout",logOut)
export default router