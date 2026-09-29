import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {type: String, require: true, unique: true},
  otp: {type: String, require: true},
  createdAt: {type: Date, default: Date.now, expires: 300},
})

export const Otp = mongoose.model("Otp", otpSchema)
