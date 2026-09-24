import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  username: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters"],
    trim: true,
  },

  center: {
    type: String, 
    enum: ["Lekki", "Egbeda", "Head Office"],
    default: "Head Office",
    required: true
  },

  image: {
    type: String,
    default: "/images/openclipart-vectors-avatar-154375_640.png"
  },

  isVerified: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', async function () {
  try {
    if (!this.username) {
      const cleanName = this.fullName ? this.fullName.replace(/[^a-z0-9]/g, '') : 'user';
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      this.username = `${cleanName}${randomNum}`;
    }
  } catch (error) {
    throw error; 
  }
});



const User = mongoose.model('User', userSchema);
export default User;