const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
