// src/repositories/auth-repo.js

import moment from "moment/moment.js";
import User from "../models/auth-models.js";
import Cart from "../models/cart-models.js";
import Order from "../models/order-models.js";
import Product from "../../admin/models/product-models.js";

class userCartRepo {
  async addToCart(cartDetials) {
    const { userId, productId } = cartDetials;
    console.log(productId);
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const ifBogoOffer = product.offers.some(
        (offer) => offer.type === "buy_one_get_one"
      );

      let userCart = await Cart.findOne({ user: userId });

      if (userCart) {
        let proExist = userCart.products.find((products) =>
          products.item.equals(productId)
        );

        if (proExist) {
          const incrementValue = ifBogoOffer ? 2 : 1;
          await Cart.updateOne(
            { user: userId, "products.item": productId },
            { $inc: { "products.$.quantity": incrementValue } }
          );
        } else {
          const initialQuantity = ifBogoOffer ? 2 : 1;
          await Cart.updateOne(
            { user: userId },
            {
              $push: {
                products: { item: productId, quantity: initialQuantity },
              },
            }
          );
        }

        userCart = await Cart.findOne({ user: userId });
        return userCart;
      } else {
        const initialQuantity = ifBogoOffer ? 2 : 1;

        await Cart.insertMany({
          user: userId,
          products: [{ item: productId, quantity: initialQuantity }],
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
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const ifBogoOffer = product.offers.some(
        (offer) => offer.type === "buy_one_get_one"
      );

      let userCart = await Cart.findOne({ user: userId });

      if (userCart) {
        let proExist = userCart.products.find((product) =>
          product.item.equals(productId)
        );

        const ifBogoOffer = product.offers.some(
          (offer) => offer.type === "buy_one_get_one"
        );
        if (ifBogoOffer && proExist && proExist.quantity === 2) {
          await Cart.updateOne(
            { user: userId },
            { $pull: { products: { item: productId } } }
          );
        }

        if (proExist && proExist.quantity > 1) {
          const decrementValue = ifBogoOffer ? -2 : -1;

          await Cart.updateOne(
            { user: userId, "products.item": productId },
            { $inc: { "products.$.quantity": decrementValue } }
          );
        } else if (proExist && proExist.quantity === 1) {
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
      const totalDetails = await this.calculateTotalWithOffers(
        userCart,
        userId
      );
      console.log(totalDetails, "totalDetails");
      return { cart: userCart, ...totalDetails };
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  async calculateTotalWithOffers(userCart, userId) {
    let totalPrice = 0;
    let offersApplied = [];
    const uniquePerfumeIds = new Set();
    const productIdsInCart = new Set();
    let bogoFreeQuantity = 0;
    let totalProducts = 0;

    for (const product of userCart.products) {
      const productData = product.item;
      const quantity = product.quantity;
      totalProducts = quantity;
      const currentDate = new Date();
      totalPrice += productData.price * quantity;

      if (productData) {
        uniquePerfumeIds.add(productData.uId);
        productIdsInCart.add(productData.uId);
      }

      if (productData.offers && productData.offers.length > 0) {
        for (const offer of productData.offers) {
          let discount = 0;
          if (offer.type === "buy_one_get_one" && quantity >= 2) {
            bogoFreeQuantity = Math.floor(quantity / 2);
            discount = bogoFreeQuantity * productData.price;
            const bogoDiscount = productData.price * quantity - discount;
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: bogoDiscount,
            });
          } else if (offer.type === "bulk_purchase_discount" && quantity >= 3) {
            discount = 5 * (quantity - bogoFreeQuantity);
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "membership_discount") {
            discount =
              (15 / 100) * (productData.price * (quantity - bogoFreeQuantity));
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "tiered_discount") {
            if (quantity === 2) {
              discount =
                0.1 * (productData.price * (quantity - bogoFreeQuantity));
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            } else if (quantity === 4) {
              discount =
                0.2 * (productData.price * (quantity - bogoFreeQuantity));
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            }
          } else if (offer.type === "limited_time_discount") {
            if (
              currentDate >= offer.startDate &&
              currentDate <= offer.endDate
            ) {
              discount = 10 * (quantity - bogoFreeQuantity);
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

    console.log(uniquePerfumeIds);
    if (uniquePerfumeIds.size === 5) {
      let additionalDiscount = totalPrice * 0.1;
      offersApplied.push({
        type: "buy more save more",
        description: "10% discount for buying 5 different perfumes",
        discount: additionalDiscount,
      });
    } else if (uniquePerfumeIds.size > 5) {
      let additionalDiscount = totalPrice * 0.15;
      offersApplied.push({
        type: "buy more save more",
        description: "15% discount for buying 6 different perfumes",
        discount: additionalDiscount,
      });
    }

    const coolWaterId = "P1";
    const ckId = "P3";
    if (productIdsInCart.has(coolWaterId) && productIdsInCart.has(ckId)) {
      let discount = 10;
      offersApplied.push({
        type: "combo_discount",
        description: "add cool water get $10 discount",
        discount: discount,
      });
    }

    const ArmaniId = "P4";
    if (productIdsInCart.has(ArmaniId)) {
      let discount = 10;
      offersApplied.push({
        type: "seasonal_discount",
        description: "cart contain ARMANI CODE get 25% off",
        discount: discount,
      });
    }

    if (totalPrice >= 100) {
      let discount = totalPrice * 0.05;
      offersApplied.push({
        type: "cart_wide_discount",
        description: "cart wide discount",
        discount: discount,
      });
    }

    //anivercery logic--------------------------------------------------------------------
    const user = await User.findOne({ _id: userId });

    console.log(user.createdAt);

    const anniverceryDate = moment(user.createdAt).format("DD-MM-YY");

    const today = new Date();
    const currentDate = moment(today).format("DD-MM-YY");
    console.log(anniverceryDate, currentDate);
    if (anniverceryDate === currentDate) {
      const paidProducts = totalProducts - bogoFreeQuantity;
      const pricePerProduct = totalPrice / totalProducts;
      const effectivePrice = paidProducts * pricePerProduct;

      let discount = effectivePrice * 0.2;
      console.log(effectivePrice, "effective price in anniversary");
      console.log(bogoFreeQuantity, "bogo free");

      // Apply the discount
      offersApplied.push({
        type: "anniversary_discount",
        description: "Anniversary Discount",
        discount: discount,
      });
    }
    // -------------------------------------------------------------------

    // //loyality program--------------------------------------------------------

    const orderDetails = await Order.findOne({ user: userId });

    if (orderDetails && orderDetails.products.length >= 5) {
      const loyalityDiscount = totalPrice * 0.05;

      if (loyalityDiscount) {
        offersApplied.push({
          type: "loyality_discount",
          description: "loyality discount applied",
          discount: loyalityDiscount,
        });
      }
    }

    // --------------------------------------------------------

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
