import mongoose from "mongoose";
import moment from "moment";
import Cart from "./models/Cart";
import Product from "./models/Product";
import User from "./models/User";
import Order from "./models/Order";

const applyOffers = async (userId, cartItems) => {
  let totalPrice = 0;
  let offersApplied = [];

  const productIdsInCart = new Set(
    cartItems.map((item) => item.item.toString())
  );
  const uniquePerfumeIds = new Set();

  for (const cartItem of cartItems) {
    const productData = await Product.findById(cartItem.item).lean();
    const quantity = cartItem.quantity;

    let bogoFreeQuantity = 0;

    if (productData.offers && productData.offers.length > 0) {
      for (const offer of productData.offers) {
        let discount = 0;

        if (offer.type === "buy_one_get_one" && quantity >= 1) {
          bogoFreeQuantity = Math.floor(quantity / 2);
          discount = bogoFreeQuantity * productData.price;
          offersApplied.push({
            type: offer.type,
            description: offer.description,
            discount: discount,
          });
        } else if (
          offer.type === "bulk_purchase_discount" &&
          quantity - bogoFreeQuantity >= 3
        ) {
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
        }
      }
    }

    totalPrice += productData.price * (quantity - bogoFreeQuantity);
  }

  if (totalPrice >= 100) {
    let discount = totalPrice * 0.05;
    offersApplied.push({
      type: "cart_wide_discount",
      description: "5% discount on orders over $100",
      discount: discount,
    });
  }

  const user = await User.findOne({ _id: userId });
  const anniversaryDate = moment(user.createdAt).format("DD-MM-YY");
  const currentDate = moment(new Date()).format("DD-MM-YY");

  if (anniversaryDate === currentDate) {
    let discount = totalPrice * 0.2;
    offersApplied.push({
      type: "anniversary_discount",
      description: "20% Anniversary Discount",
      discount: discount,
    });
  }

  const orderDetails = await Order.findOne({ user: userId });
  if (orderDetails && orderDetails.products.length >= 5) {
    let loyaltyDiscount = totalPrice * 0.05;
    offersApplied.push({
      type: "loyalty_discount",
      description: "5% Loyalty Discount",
      discount: loyaltyDiscount,
    });
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
};

const addProductToCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(productId).lean();

  if (!product) {
    throw new Error("Product not found");
  }

  const cartItemIndex = cart.products.findIndex(
    (item) => item.item.toString() === productId.toString()
  );

  if (cartItemIndex === -1) {
    cart.products.push({ item: productId, quantity: 1 });

    const bogoOffer = product.offers.find(
      (offer) => offer.type === "buy_one_get_one"
    );
    if (bogoOffer) {
      cart.products.push({ item: productId, quantity: 1 });
    }
  } else {
    cart.products[cartItemIndex].quantity += 1;

    const bogoOffer = product.offers.find(
      (offer) => offer.type === "buy_one_get_one"
    );
    if (bogoOffer && cart.products[cartItemIndex].quantity % 2 === 0) {
      cart.products[cartItemIndex].quantity += 1;
    }
  }

  await cart.save();
  return cart;
};

async function addToCart(cartDetails) {
  const { userId, productId } = cartDetails;
  console.log(productId);

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const hasBogoOffer = product.offers.some(
      (offer) => offer.type === "buy_one_get_one"
    );

    let userCart = await Cart.findOne({ user: userId });

    if (userCart) {
      let proExist = userCart.products.find((product) =>
        product.item.equals(productId)
      );

      if (proExist) {
        const incrementValue = hasBogoOffer ? 2 : 1;
        await Cart.updateOne(
          { user: userId, "products.item": productId },
          { $inc: { "products.$.quantity": incrementValue } }
        );
      } else {
        const initialQuantity = hasBogoOffer ? 2 : 1;
        await Cart.updateOne(
          { user: userId },
          {
            $push: { products: { item: productId, quantity: initialQuantity } },
          }
        );
      }

      userCart = await Cart.findOne({ user: userId });
      return userCart;
    } else {
      const initialQuantity = hasBogoOffer ? 2 : 1;
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

async function calculateTotalPrice(cartDetails, userId) {
  const { products } = cartDetails;
  let totalPrice = 0;
  const offersApplied = new Set();

  for (const product of products) {
    const productData = await Product.findById(product.item);

    if (!productData) continue;

    let quantity = product.quantity;

    const hasBogoOffer = productData.offers.some(
      (offer) => offer.type === "buy_one_get_one"
    );

    if (hasBogoOffer) {
      const effectiveQuantity = Math.ceil(quantity / 2);
      const productTotal = productData.price * effectiveQuantity;

      const bogoDiscount = productData.price * quantity - productTotal;
      offersApplied.add({
        type: "buy_one_get_one",
        description: "Buy one, get one free",
        discount: bogoDiscount,
      });

      totalPrice += productTotal;
    } else {
      totalPrice += productData.price * quantity;
    }
  }

  const productIdsInCart = new Set(products.map((p) => p.item.toString()));

  const discount = 10;
  if (productIdsInCart.has("COOL_WATER_ID")) {
    offersApplied.add({
      type: "combo_discount",
      description: "Add cool water, get $10 off",
      discount: discount,
    });
    totalPrice -= discount;
  }

  if (productIdsInCart.has("P4")) {
    const seasonalDiscount = totalPrice * 0.25;
    offersApplied.add({
      type: "seasonal_discount",
      description: "Cart contains Armani Code - 25% off",
      discount: seasonalDiscount,
    });
    totalPrice -= seasonalDiscount;
  }

  if (totalPrice >= 100) {
    const cartWideDiscount = totalPrice * 0.05;
    offersApplied.add({
      type: "cart_wide_discount",
      description: "Cart wide discount",
      discount: cartWideDiscount,
    });
    totalPrice -= cartWideDiscount;
  }

  const user = await User.findById(userId);
  const anniversaryDate = moment(user.createdAt).format("DD-MM-YY");
  const currentDate = moment(new Date()).format("DD-MM-YY");

  if (anniversaryDate === currentDate) {
    const anniversaryDiscount = totalPrice * 0.2;
    offersApplied.add({
      type: "anniversary_discount",
      description: "Anniversary Discount",
      discount: anniversaryDiscount,
    });
    totalPrice -= anniversaryDiscount;
  }

  const orderDetails = await Order.findOne({ user: userId });
  if (orderDetails && orderDetails.products.length >= 5) {
    const loyaltyDiscount = totalPrice * 0.05;
    offersApplied.add({
      type: "loyalty_discount",
      description: "Loyalty discount applied",
      discount: loyaltyDiscount,
    });
    totalPrice -= loyaltyDiscount;
  }

  const totalDiscount = Array.from(offersApplied).reduce(
    (acc, offer) => acc + offer.discount,
    0
  );
  const finalPrice = totalPrice - totalDiscount;

  return {
    totalPrice,
    totalDiscount,
    finalPrice,
    offersApplied: Array.from(offersApplied),
  };
}

if (anniversaryDate === currentDate) {
  const paidProducts = totalProducts - bogoFreeQuantity;

  const pricePerProduct = totalPrice / totalProducts;
  const effectivePrice = paidProducts * pricePerProduct;

  let discount = effectivePrice * 0.2;
  console.log(effectivePrice, "effective price in anniversary");
  console.log(bogoFreeQuantity, "bogo free");

  offersApplied.push({
    type: "anniversary_discount",
    description: "Anniversary Discount",
    discount: discount,
  });
}
