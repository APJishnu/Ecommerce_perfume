// src/repositories/auth-repo.js

import User from "../models/auth-models.js";

class AuthRepository {
  // Create a new user
  async createUser(data) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return null
    }

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const savedUser = await newUser.save();
    return savedUser._id;
  }
  async loginUser(data) {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return {
            status:false,
            message:"user not exist",
            data:null
          }
    }
   
    return user;
  }
}

export default new AuthRepository();
