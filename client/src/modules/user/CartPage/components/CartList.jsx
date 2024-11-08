"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { API_URL } from "../../../../config/api";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [offersApplied, setOffersApplied] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const userId = Cookies.get("userId");

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/get-cart/${userId}`);


      if (response.data.status === false) {
        setError(response.data.message || "Error fetching cart details");
      } else {
        console.log(response.data.data)
        const { cart } = response.data.data;
        console.log(cart.offersApplied)

        setOffersApplied(cart.offersApplied)
        setCartItems(cart.cart.products);
        setTotalPrice(cart.totalPrice);
        setTotalDiscount(cart.totalDiscount);
        setFinalPrice(cart.finalPrice);
      }
    } catch (err) {
      setError("cart is empty");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartDetails();
  }, [userId]);

  const cartQuantity = cartItems.length

  const increaseQty = async (item) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/add-to-cart`, {
        userId,
        productId: item.item._id,
      });
      if (response.data.status) {
        console.log("Quantity increased:", response.data);
        fetchCartDetails();
      } else {
        console.warn("Could not increase quantity:", response.data);
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity > 0) {
      try {
        const response = await axios.post(`${API_URL}/api/user/remove-cart`, {
          userId,
          productId: item.item._id,
        });
        if (response.data.status) {
          console.log("Quantity decreased:", response.data);
          fetchCartDetails();
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


  const checkOut = async (cartItems) => {
    if (cartItems.length > 0) {
      const response = await axios.post(`${API_URL}/api/user/check-out-cart/${userId}`, {
      });

      if (response.data.status) {
        console.log("Checkout successful:", response.data);
        alert("Checkout successful:")
        fetchCartDetails();
      } else {
        console.log("Checkout unSuccessful:");
        alert("Checkout not proceed:")
        fetchCartDetails();
      }
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="product-count">
        <h2>{cartQuantity} Items</h2>
      </div>
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
                              {offer.description}<span className="offer-image"><img src="../assets/icons/iemo.png" alt="" /></span> {/* Assuming offer has a description */}
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
            <span>${totalPrice?.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Discount</span>
            <span className="discount">- ${totalDiscount?.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${finalPrice?.toFixed(2)}</span>
          </div>
          <div className='offers-applied-div'>
            <h3>Offers Applied</h3>
            {offersApplied.map((offer, index) => {
              return (
                <div key={index} className='applied-offers'>
                  {offer.type} Applied
                </div>
              )
            })}
          </div>

          <p className="congrats-message">
            Congratulations! You've Saved ${totalDiscount.toFixed(2)} today!
          </p>
          <button className="checkout-btn" onClick={() => checkOut(cartItems)}>Go to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartList;


