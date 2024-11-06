// src/repositories/auth-repo.js

import Cart from "../models/cart-models.js";
import Order from "../models/order-models.js";

class checkOutRepo {
  async checkOutCart(userId) {
    let cartItems = await Cart.findOne({ user: userId });
    console.log(cartItems, "products in cart");

    if (!cartItems) {
      throw new Error("Cart not found");
    }

    let status = true;
    let date = new Date();

    let orderProducts = cartItems.products.map((product) => ({
      item: product.item,
      quantity: product.quantity,
      status: status,
      date: date,
    }));

    let orderObj = new Order({
      user: userId,
      products: orderProducts,
    });

    let orders = await orderObj.save();

    await Cart.deleteOne({ user: userId });

    return orders;
  }
}

export default new checkOutRepo();
