// src/repositories/auth-repo.js

import User from "../models/auth-models.js";
import Cart from "../models/cart-models.js";

class userCartRepo {
  async addToCart(cartDetials) {
    const { userId, productId } = cartDetials;
    console.log(productId);
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

  async removeCart(cartDetails) {
    const { userId, productId } = cartDetails;
    try {
      let userCart = await Cart.findOne({ user: userId });

      if (userCart) {
        let proExist = userCart.products.find((product) =>
          product.item.equals(productId)
        );

        if (proExist && proExist.quantity > 1) {
          // If the product exists and quantity is greater than 1, decrement its quantity
          await Cart.updateOne(
            { user: userId, "products.item": productId },
            { $inc: { "products.$.quantity": -1 } }
          );
        } else if (proExist && proExist.quantity === 1) {
          // If the quantity is 1, remove the product from the cart
          await Cart.updateOne(
            { user: userId },
            { $pull: { products: { item: productId } } }
          );
        }

        userCart = await Cart.findOne({ user: userId });
        return userCart;
      }
    } catch (error) {
      console.error("Error decreasing cart quantity:", error);
      throw error;
    }
  }

  async getCart(userId) {
    try {
      const userCart = await Cart.findOne({ user: userId }).populate({
        path: "products.item",
        model: "Product",
      });

      if (!userCart) {
        return { message: "Cart not found" };
      }

      userCart.products.forEach((product) => {
        if (!product.item) {
          console.log(
            `Product with ID ${product.item} not found in cart ${userCart._id}`
          );
        }
      });

      console.log(userCart);
      const totalDetails = await this.calculateTotalWithOffers(userCart);
      console.log(totalDetails, "totalDetails");
      return { cart: userCart, ...totalDetails };
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  async calculateTotalWithOffers(userCart) {
    let totalPrice = 0;
    let offersApplied = [];

    for (const product of userCart.products) {
      const productData = product.item;
      const quantity = product.quantity;
      const currentDate = new Date();
      totalPrice += productData.price * quantity;

      if (productData.offers && productData.offers.length > 0) {
        for (const offer of productData.offers) {
          let discount = 0;
          if (offer.type === "buy_one_get_one" && quantity >= 2) {
            discount = Math.floor(quantity / 2) * productData.price;
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "bulk_purchase_discount" && quantity >= 3) {
            discount = 5 * quantity;
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "membership_discount") {
            discount = (15 / 100) * (productData.price * quantity);
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "limited_time_discount") {
            if (
              currentDate >= offer.startDate &&
              currentDate <= offer.endDate
            ) {
              discount = 10 * quantity; // $10 off
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            }
          }
        }
      }
    }

    const totalDiscount = offersApplied.reduce(
      (acc, offer) => acc + offer.discount,
      0
    );
    const finalPrice = totalPrice - totalDiscount;

    return {
      totalPrice,
      totalDiscount,
      finalPrice,
      offersApplied,
    };
  }
}

export default new userCartRepo();
