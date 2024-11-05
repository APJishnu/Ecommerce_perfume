// helpers/auth-helper.js
import authRepo from "../repositories/auth-repo.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';

class AuthHelper {
  static async userSignUp({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
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
      throw new Error("All fields are required");
    }

    const user = await authRepo.loginUser({ email, password });

    if (user.password !== password) {
      return {
        status: false,
        message: "invalid password",
        data: null,
      };
    }
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (user) {
      return {
        status: true,
        message: "user loggined successfully",
        data: {
          user,
          token
        },
      };
    } else {
      return {
        status: false,
        message: "user not exist exist",
        data: null,
      };
    }
  }
}

export default AuthHelper;
