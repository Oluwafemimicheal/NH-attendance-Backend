import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [4, "Full name must be at least 4 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    course: {
      type: String,
      required: [true, "Course selection is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    attendanceScore: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"],
    },
    projectScore: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"],
    },
    verificationCode: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true 
  }
);


studentSchema.pre("save", function () {
  if (!this.verificationCode) {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    const codeLength = 6;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    this.verificationCode = result;
  }

  if (!this.image) {
    this.image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.email}`;
  }
});

export const Student = mongoose.model("Student", studentSchema);
