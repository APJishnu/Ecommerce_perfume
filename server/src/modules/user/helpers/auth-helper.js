// helpers/auth-helper.js
import authRepo from "../repositories/auth-repo.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

class AuthHelper {
  static async userSignUp({ name, email, password }) {
    if (!name || !email || !password) {
      return {
        status: false,
        message: "All Fields are required !",
        data: null,
      };
    }
    const userId = await authRepo.createUser({ name, email, password });

    if (userId) {
      return {
        status: true,
        message: "user registered successfully",
        data: {
          userId,
        },
      };
    } else {
      return {
        status: false,
        message: "user already exist",
        data: null,
      };
    }
  }
  static async userLogin({ email, password }) {
    if (!email || !password) {
      return {
        status: false,
        message: "All Fields are required !",
        data: null,
      };
    }

    const user = await authRepo.loginUser({ email, password });
    console.log(user);

    const token = jwt.sign({ id: user.data._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (user.status) {
      return {
        status: true,
        message: "user loggined successfully",
        data: {
          user: user.data,
          token,
        },
      };
    } else {
      return {
        status: false,
        message: user.message,
        data: null,
      };
    }
  }
}

export default AuthHelper;
