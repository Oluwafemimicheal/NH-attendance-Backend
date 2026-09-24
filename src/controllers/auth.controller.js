import argon2 from "argon2";
import User from "../models/auth.model.js";



export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, center } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(400).json({ success: false, message: "Email already in used!" })

    const hashPassword = await argon2.hash(password)

    const newlyUser = await User.create({ fullName, email, password: hashPassword, center });

    if (!newlyUser) return res.status(400).json({ success: false, message: "Sorry something went wrong creating your account, try again in 5min!" })

    res.status(201).json({
      success: true, message: "Account created successfully!",
      username: newlyUser?.username
    })
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error"})
    console.error(`Something went wrong with creating this user ${req.body.fullName} | error: ${error}`)
  }
}

export const login = async (req, res) => {
  try {
    const { username, password} = req.body;

    const checkingUser = await User.findOne({ username })

    if (!checkingUser) return res.status(400).json({ success: false, message: "Username don't exist" })

    const verifyPassword = await argon2.verify(checkingUser.password, password)

    if (!verifyPassword) return res.status(400).json({ success: false, message: "Incorrect password" })

    res.status(201).json({
      success: true, message: "Login successfully!"
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error"})
    console.error(`Something went wrong with creating this user ${req.body.fullName} | error: ${error}`)
  }
}


export const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;

    const checkingUserEmail = await User.findOne({ email })

    if (!checkingUserEmail) return res.status(400).json({ success: false, message: "Username don't exist" })

    res.status(201).json({
      success: true, message: "Check your Email, For Password Reset!"
    })

  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error"})
    console.error(`Something went wrong with creating this user ${req.body.fullName} | error: ${error}`)
  }
}

