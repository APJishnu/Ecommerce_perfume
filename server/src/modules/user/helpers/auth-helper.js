// helpers/auth-helper.js
import authRepo from "../repositories/auth-repo.js";

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

    if (user) {
      return {
        status: true,
        message: "user loggined successfully",
        data: {
          user,
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
