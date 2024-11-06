import React from "react";
import './Navbar.css'

const Navbar = () => {

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
              <a href="/user/user-cart"><img src="../assets/icons/Cart1.png" alt=""/></a>
            </span>
            <span class="badge">4</span>
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
