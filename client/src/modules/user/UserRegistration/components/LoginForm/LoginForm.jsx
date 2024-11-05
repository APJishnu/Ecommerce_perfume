// pages/SignIn.js

"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/api";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/user/user-login`, {
        email,
        password,
      });
      const data = response.data;

      const userId = response.data.data.user._id;
      const token = response.data.data.token;
      console.log(userId)
      Cookies.set("userId", userId, { expires: 1 / 24 });
      Cookies.set("userToken", token, { expires: 1 / 24 });


      if (data.status) {
        setSuccess(data.message || "Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.card}>
        <img
          src="../img/cross-ash.svg"
          alt="Close"
          className={styles.closeIcon}
        />
        <h2 className={styles.heading}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputFieldWrapper}>
            {success && <p className={styles.successMessage}>{success}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <p className={styles.inName}>Email or Phone Number</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email or Phone Number"
              className={styles.inputField}
            />
            <p className={styles.inName}>Password</p>
            <div className={styles.passwordField}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={styles.inputField}
              />
              <img
                src="../img/eye.svg"
                alt="Show Password"
                className={styles.eyeIcon}
              />
            </div>
            <button
              type="submit"
              className={styles.signUpButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <p className={styles.signInText}>
              Don't have an account?{" "}
              <a href="/SignUp" className={styles.signInLink}>
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
