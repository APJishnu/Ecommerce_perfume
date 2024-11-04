import userProductRepo from "../repositories/product-repo.js";


class userProductHelper {
  static async getProducts() {
    const products = await userProductRepo.getProducts();

    
    if (products) {
      return {
        status: true,
        message: "product fetched successfully",
        data: {
          products,
        },
      };
    } else {
      return {
        status: false,
        message: "product fetched null",
        data: null,
      };
    }
  }
 
}

export default userProductHelper;
