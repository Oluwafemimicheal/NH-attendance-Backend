import mongoose from "mongoose";

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("Database connected successfully!")
  } catch (error) {
    console.log("Database failed to connect!")
    console.error(error)
  }
}

export default connectDB;