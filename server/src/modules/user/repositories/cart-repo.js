// src/repositories/auth-repo.js

import User from "../models/auth-models.js";
import Cart from "../models/cart-models.js";

class userCartRepo {
  async addToCart(cartDetials) {
    const { userId, productId } = cartDetials;
    try {
      let userCart = await Cart.findOne({ user: userId });

      if (userCart) {
        let proExist = userCart.products.find((products) =>
          products.item.equals(productId)
        );

        if (proExist) {
          // If the product exists in the cart, increment its quantity
          await Cart.updateOne(
            { user: userId, "products.item": productId },
            { $inc: { "products.$.quantity": 1 } }
          );
        } else {
          // If the product doesn't exist in the cart, add it with quantity 1
          await Cart.updateOne(
            { user: userId },
            { $push: { products: { item: productId, quantity: 1 } } }
          );
        }

        userCart = await Cart.findOne({ user: userId });
        return userCart;
      } else {
        // If the user doesn't have a cart yet, create a new cart with the product
        await Cart.insertMany({
          user: userId,
          products: [{ item: productId, quantity: 1 }],
        });
        userCart = await Cart.findOne({ user: userId });
        return userCart;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
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
