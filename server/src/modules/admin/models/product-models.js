import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  buyOneGetOne: { type: Boolean, default: false }, // Indicates if the product has a BOGO offer
  discountOnBulk: { type: Number, default: 0 }, // Discount per unit when buying 3 or more products
});

const Product = mongoose.model("Perfume", ProductSchema);

export default Product;
