import userCartRepo from "../repositories/cart-repo.js";

class userCartHelper {
  static async addToCart(cartDetials) {
    const cart = await userCartRepo.addToCart(cartDetials);

    if (cart) {
      return {
        status: true,
        message: "product added to cart",
        data: {
          cart,
        },
      };
    } else {
      return {
        status: false,
        message: "product not added to cart",
        data: null,
      };
    }
  }
  static async removeCart(cartDetials) {
    const cart = await userCartRepo.removeCart(cartDetials);

    if (cart) {
      return {
        status: true,
        message: "product added to cart",
        data: {
          cart,
        },
      };
    } else {
      return {
        status: false,
        message: "product not added to cart",
        data: null,
      };
    }
  }
  
static async getCart(userId) {
    const cartItems = await userCartRepo.getCart(userId);
  
    if (cartItems) {
      return {
        status: true,
        message: "Cart fetched successfully",
        data: {
          cart: cartItems,
        },
      };
    } else {
      return {
        status: false,
        message: "User  has no cart",
        data: null,
      };
    }
  }
}

export default userCartHelper;
