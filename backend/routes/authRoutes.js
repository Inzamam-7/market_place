import express from 'express'
import { register,login, logout, getUser } from '../controller/authController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",protect, logout)
router.get("/getuser", protect, getUser)

export default router