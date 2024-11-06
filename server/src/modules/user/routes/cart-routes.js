import dotenv from "dotenv";
import userCartHelper from "../helpers/cart-helper.js";
import checkCartHelper from "../helpers/check-out-helper.js";

dotenv.config();

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const response = await userCartHelper.addToCart({ userId, productId });
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
export const removeCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const response = await userCartHelper.removeCart({ userId, productId });
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

export const getCart = async (req, res) => {
  try {
    const  userId  = req.params.userId;
    console.log(userId)
    const response = await userCartHelper.getCart(userId);
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

export const checkOutCart = async (req, res) => {
  try {
    const  userId  = req.params.userId;
    const {cartItems} = req.body
    console.log(userId)
    const response = await checkCartHelper.checkOutCart(userId);
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
    console.error("Error during checkOut:", error);
    res
      .status(500)
      .json({ errors: { general: "An unexpected error occurred." } });
  }
};
