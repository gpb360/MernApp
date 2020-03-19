const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    elevation: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
