"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/api";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(`${API_URL}/api/user/user-signup`, {
        name,
        email,
        password,
      });
      const data = response.data;

      if (data.status) { // Check for success based on the backend response
        setSuccess(data.message || "Registration successful!");
        setTimeout(() => {
          router.push("/user/user-login");
        }, 2000);
      } else {
        console.log(data.message)
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.backgroundImage}>
        <div className={styles.card}>
          <img
            src="../img/cross-ash.svg"
            alt="Close"
            className={styles.closeIcon}
          />
          <form onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Sign Up</h2>

            {success && <p className={styles.successMessage}>{success}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.inputFieldWrapper}>
              <div>
                <p className={styles.inName}>Name</p>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className={styles.inputField}
                />
              </div>
              <div>
                <p className={styles.inName}>Email</p>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className={styles.inputField}
                />
              </div>

              <div>
                <p className={styles.inName}>Password</p>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className={styles.inputField}
                />
              </div>
            </div>
            <button
              type="submit"
              className={styles.signUpButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className={styles.signInText}>
              Already have an account?{" "}
              <a href="/user/user-login" className={styles.signInLink}>
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;