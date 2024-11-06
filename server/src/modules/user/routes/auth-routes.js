import dotenv from "dotenv";
import authHelper from "../helpers/auth-helper.js";
dotenv.config();

export const userSignUp = async (req, res) => {
  const { name, email, password } = req.body; // Removed 'aadhar'

  try {
    const response = await authHelper.userSignUp({ name, email, password });
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

export const userLogin = async (req, res) => {
  const { email, password } = req.body; // Removed 'aadhar'

  try {
    const response = await authHelper.userLogin({ email, password });
    console.log(response)
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

 
