import express from "express"
import { forgotPassword, getAuth, login, signUp } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRoute = express.Router()


authRoute.post('/sign-up', signUp)
authRoute.post('/login', login)
authRoute.post('/forgot-password', forgotPassword)
authRoute.get('/me', authMiddleware, getAuth)

export default authRoute;