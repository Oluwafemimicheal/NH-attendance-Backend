import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  studentFullName: {
    type: String,
    required: true,
    trim: true,
    min: [4, "Full name character should most be more than 3"]
  },
  email:{
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },

  attendanceScore: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: Number,
  },
  projectScore: {
    type: Number,
    default: 0
  },
  studentVerifyNumber:{
    type: String,
  },

  isStudentVerify: {
    type: Boolean,
    default: false
  }
})

studentSchema.pre('save', async function () {
  try {
    if (!this.studentVerifyNumber) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      this.studentVerifyNumber = `${randomNum}`;
    }
  } catch (error) {
    throw error;
  }
});

export const Student = mongoose.model("Students", studentSchema)

