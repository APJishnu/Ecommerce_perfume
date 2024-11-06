"use client"
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import './Navbar.css'
import axios from 'axios';
import { API_URL } from "../../../config/api";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get("userId");

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/get-cart/${userId}`);
      if (response.data.status === false) {
        setError(response.data.message || "Error fetching cart details");
      } else {
        console.log(response.data.data)
        const { cart } = response.data.data;
        setCartItems(cart.cart.products);
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    fetchCartDetails();
  }, [userId]);

  const cartQuantity = cartItems.length
  console.log(cartQuantity)

  return (
    <div>
      <div class="top-banner">
        Sign up and get 20% off on your first order. <a href="/user/user-signup">Sign Up Now</a>
        <span class="close-banner">&times;</span>
      </div>

      <nav class="navbar">
        <div class="logo">Scentora</div>

        <ul class="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">New Arrivals</a>
          </li>
          <li>
            <a href="#">Brands</a>
          </li>
        </ul>

        <div class="search-bar">
          <input type="text" placeholder="Search for products..." />
          <span class="search-icon">
            <img src="../assets/icons/search-icon.png" alt="" />
          </span>
        </div>

        <div class="icons">
          <div class="icon wishlist">
            <span>
              <img src="../assets/icons/Vector.png" alt="" />
            </span>
            <span class="badge">2</span>
          </div>
          <div class="icon cart">
            <span>
              <a href="/user/user-cart"><img src="../assets/icons/Cart1.png" alt="" /></a>
            </span>
            <span class="badge">{cartQuantity}</span>
          </div>
          <div class="icon profile">
            <span>
              <img src="../assets/icons/person.png" alt="" />
            </span>
          </div>
        </div>
      </nav>


    </div>
  );
};

export default Navbar;
