import express from "express"
import { forgotPassword, login, signUp } from "../controllers/auth.controller.js";

const authRoute = express.Router()


authRoute.post('/sign-up', signUp)
authRoute.post('/login', login)
authRoute.post('/forgot-password', forgotPassword)

export default authRoute;