const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
