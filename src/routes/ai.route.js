import express from "express"
import { aiChat, getAiModel } from "../controllers/ai.controller.js";

const aiRoute = express.Router()


aiRoute.post('/chat', aiChat)
aiRoute.get('/model', getAiModel)


export default aiRoute;