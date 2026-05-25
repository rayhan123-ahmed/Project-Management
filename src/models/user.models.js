import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//  methods for comapred password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// genrate access token
userSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCES_TOKEN_EXPIRY },
  );
};

// genrate refresh token
userSchema.methods.genrateRefreshToken = function () {
   return jwt.sign(
     {
       _id: this._id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
   );
}

// Temporary token
 userSchema.methods.genrateTemroraryToken = function (){
    const unHashedToken = crypto.randomBytes(20).toString('hex');

    const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex')

    const tokenExpiry = Date.now() + (20*60*1000);

    return {unHashedToken, hashedToken, tokenExpiry}
 }

export default user;
