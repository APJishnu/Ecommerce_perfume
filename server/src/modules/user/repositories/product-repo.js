// src/repositories/auth-repo.js

import Product from "../../admin/models/product-models.js";

class userProductRepo {
  async getProducts() {
    const products = await Product.find();
    if (!products) {
        return {
            status:false,
            message:"user not exist",
            data:null
          }
    }
   
    return products;
  }
}

export default new userProductRepo();
