// helpers/auth-helper.js
import dotenv from "dotenv";
import checkOutRepo from "../repositories/check-out-repo.js";
dotenv.config();

class checkCartHelper {
  static async checkOutCart(userId ) {
    if (!userId) {
      return {
        status: false,
        message: "user not loggined !",
        data: null,
      };
    }
    const orderDetails = await checkOutRepo.checkOutCart( userId );

    if (orderDetails) {
      return {
        status: true,
        message: "product ordered  successfully",
        data: {
          orderDetails,
        },
      };
    } else {
      return {
        status: false,
        message: "product not added",
        data: null,
      };
    }
  }

}

export default checkCartHelper;
