const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
    images: [String],
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
