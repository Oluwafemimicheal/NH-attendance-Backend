import { upload } from "../middlewares/multerConfig";
import express from "express"

export const imageRouter = express.Router()

imageRouter.post("/upload", upload.single("image"), uploadImage)