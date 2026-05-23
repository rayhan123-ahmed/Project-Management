import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    avater: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        type: {
          url: `https://placehold.co/200x200`,
          localPath: "",
        },
      },
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isEmailVerfied: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: date,
    },
  },
  {
    timestamps: true,
  },
);

// pre hoocks for hasing password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10);
    next()
})
//  methods for comapred password
userSchema.methods.isPasswordCorrect = async function(password) {
     return await bcrypt.compare(password,this.password)
}

export default user;
