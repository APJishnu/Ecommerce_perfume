import dotenv from "dotenv";
import userProductHelper from "../helpers/product-helper.js";

dotenv.config();

  export const getProducts = async (req, res) => {

  try {
    const response = await userProductHelper.getProducts();
    
    if (response.status === false) {
      return res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    }

    return res.status(200).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ errors: { general: "An unexpected error occurred." } });
  }
};
