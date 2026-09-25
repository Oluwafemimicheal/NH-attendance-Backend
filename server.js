import express from "express"
import dotenv from "dotenv"
import path from 'path';
import cors from "cors"
import { fileURLToPath } from 'url';
import connectDB from "./src/configs/db.config.js";
import authRoute from "./src/routes/auth.route.js";

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));

//Router
app.use("/api/auth", authRoute)


app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Service currently running..." })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})