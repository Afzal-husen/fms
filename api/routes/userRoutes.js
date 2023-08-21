import express from "express"
import {home_page, register, login, logout} from "../controllers/user.js"
import { authentication } from "../middleware/auth.js"

const router = express.Router()


//login
router.post("/login",  login)

//register
router.post("/register", register)

// logout
router.get("/logout", logout)

//find a user
router.get("/", authentication,  home_page)

export default router