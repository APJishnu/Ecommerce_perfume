"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { API_URL } from "../../../../config/api";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const userId = Cookies.get("userId");


  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/get-cart/${userId}`);
      console.log(response.data.data)
      const { cart } = response.data.data; // Adjust according to your response structure
      setCartItems(cart.cart.products);
      setTotalPrice(cart.totalPrice);
      setTotalDiscount(cart.totalDiscount);
      setFinalPrice(cart.finalPrice);
    } catch (err) {
      setError('Error fetching cart details');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchCartDetails();
  }, [userId]);

  const increaseQty = async (item) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/add-to-cart`, {
        userId,
        productId: item.item._id,
      });

      if (response.data.status) {
        console.log("Quantity increased:", response.data);
        fetchCartDetails(); // Fetch updated cart details
      } else {
        console.warn("Could not increase quantity:", response.data);
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await axios.post(`${API_URL}/api/user/remove-cart`, {
          userId,
          productId: item.item._id,
        });

        if (response.data.status) {
          console.log("Quantity decreased:", response.data);
          fetchCartDetails(); // Fetch updated cart details
        } else {
          console.warn("Could not decrease quantity:", response.data);
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    } else {
      console.log("Cannot decrease quantity below 1");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container">
      <div className="product-list">
        {cartItems.map((item) => (
          <div className="product-container" key={item._id}>
            <div className="product-item">
              {item.item ? (
                <>
                  <img src={`${API_URL}${item.item.image}`} alt={item.item.name} />
                  <div className="product-details">
                    <h3>{item.item.name}</h3>
                    <p>{item.item.description}</p>
                    <p className="price">${item.item.price}</p>
                    {item.item.offers && item.item.offers.length > 0 && (
                      <div className="offer">
                        {item.item.offers.map((offer, index) => (
                          <div key={index} className="offer-item">
                            <p>{offer.description}</p> {/* Assuming offer has a description */}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => decreaseQty(item)}>-</button>
                      <span className="quantity"> Qty: {item.quantity}</span>
                      <button className="qty-btn" onClick={() => increaseQty(item)}>+</button>
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
                </>
              ) : (
                <p>Item not found</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Details</h3>
        <div className="summary-item">
          <span>Bag total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Discount</span>
          <span className="discount">- ${totalDiscount}</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>${finalPrice}</span>
        </div>
        <p className="congrats-message">
          Congratulations! You've Saved ${totalDiscount} today!
        </p>
        <button class="checkout-btn">Go to Checkout</button>
      </div>
    </div>
  );
};

export default CartList;


