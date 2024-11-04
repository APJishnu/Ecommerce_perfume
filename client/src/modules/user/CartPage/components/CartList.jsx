"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { API_URL } from "../../../../config/api";


const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
    
    const fetchCartDetails = async () => {
      try {
       
        const response = await axios.get(`${API_URL}/api/user/get-cart/${userId}`);
        setCartItems(response.data);
      } catch (err) {
        setError('Error fetching cart details');
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div className="product-container" key={item._id}>
          <div className="product-item">
            <img src={item.image} alt={item.name} />
            <div className="product-details">
              <div>
                <h3>{item.name}</h3>
              </div>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
              {item.buyOneGetOne && (
                <div className="pop">
                  <p className="offer">
                    1 Offers Available
                    <span className="offer-image">
                      <img src="../assets/icons/iemo.png" alt="" />
                    </span>
                  </p>
                  <div className="offer-popup" id="Popup">
                    <p>
                      <strong>Offers Applied</strong>
                    </p>
                    <p>Buy 1 Get 1 Free</p>
                    <button onClick={() => togglePopup()}>Close</button>
                  </div>
                </div>
              )}
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => decreaseQty(item)}>
                  -
                </button>
                <span className="quantity"> Qty: {item.quantity}</span>
                <button className="qty-btn" onClick={() => increaseQty(item)}>
                  +
                </button>
              </div>
            </div>
            <div className="product-actions">
              <span className="wishlist-icon">
                <img
                  className="wishlist-icon"
                  src="../assets/icons/delete.png"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;


