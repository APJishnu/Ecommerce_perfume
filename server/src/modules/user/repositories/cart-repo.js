// src/repositories/auth-repo.js

import Product from "../../admin/models/product-models.js";
import User from "../models/auth-models.js";

class userCartRepo {
  async addToCart(cartDetials) {
    const { userId, productId } = cartDetials;
    console.log(userId, productId);

    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    // Optionally, check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return null;
    }

    // Add the product to the user's cart
    user.cart.push(productId);
    await user.save();
    console.log(user);
    return user.cart;
  }
  catch(error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  async getCart(userId) {
    const user = await User.findById(userId).populate("cart"); // Populate the cart with product details

    if (!user || !user.cart) {
      return null;
    }

    // Calculate discounts and offers
    const cartItems = user.cart.map((product) => ({
      ...product._doc,
      price: this.calculateFinalPrice(product),
    }));

    return cartItems;
  }

  static calculateFinalPrice(product) {
    let finalPrice = product.price;

    // Apply Buy One Get One offer
    if (product.buyOneGetOne) {
      finalPrice = product.price / 2; // Assuming the offer means you pay half for each product
    }

    // Apply bulk discount
    if (product.discountOnBulk > 0) {
      finalPrice -= product.discountOnBulk; // Subtract the bulk discount
    }

    return finalPrice;
  }
}

export default new userCartRepo();
