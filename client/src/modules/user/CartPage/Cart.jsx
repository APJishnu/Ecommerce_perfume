import React from "react";
import "./Cart.css";
import CartList from './components/CartList'

const Cart = () => {
  return (
    <div>
      <section class="breadcrumb-section">
        <div class="breadcrumb">
          <a href="">Home </a> <a href="">Cart</a>
        </div>
      </section>

      <div class="product-count">
        <h2>04 Items</h2>
      </div>

      <div class="cart-container">
        <div class="product-list">
          <CartList/>
          <div class="product-container">
            <div class="product-item">
              <img src="../assets/icons/image 2.png" alt="Armani" />
              <div class="product-details">
                <h3>ARMANI</h3>
                <p>Acqua di Gio Profumo for Men</p>
                <p class="price">$400</p>

                <div class="pop">
                  <p class="offer" onclick="togglePopupTwo()">
                    1 Offers Available
                    <span class="offer-image">
                      <img src="../assets/icons/iemo.png" alt="" />
                    </span>
                  </p>
                  <div class="offer-popup-two" id="PopupTwo">
                    <p>
                      <strong>Offers Applied</strong>
                    </p>

                    <p>Buy 2 Get 1 Free</p>
                    <button onclick="togglePopupTwo()">Close</button>
                  </div>
                </div>
                <div class="quantity-controls">
                  <button class="qty-btn" onclick="decreaseQty(this)">
                    -
                  </button>
                  <span class="quantity"> Qty: 01</span>
                  <button class="qty-btn" onclick="increaseQty(this)">
                    +
                  </button>
                </div>
              </div>
              <div class="product-actions">
                <span class="wishlist-icon">
                  <img
                    class="wishlist-icon"
                    src="../assets/icons/delete.png"
                    alt="Wishlist Icon"
                  />
                </span>
              </div>
            </div>
          </div>

          <div class="product-container">
            <div class="product-item">
              <img src="../assets/icons/image3.png" alt="Chanel" />
              <div class="product-details">
                <h3>CHANEL</h3>
                <p class="product-p">Bleu de Chanel Eau De Parfum</p>
                <p class="price">$320</p>
                <p class="offer" onclick="togglePopupThree()">
                  1 Offers Available
                  <span class="offer-image">
                    <img src="../assets/icons/iemo.png" alt="" />
                  </span>
                </p>
                <div class="quantity-controls">
                  <button class="qty-btn" onclick="decreaseQty(this)">
                    -
                  </button>
                  <span class="quantity"> Qty: 01</span>
                  <button class="qty-btn" onclick="increaseQty(this)">
                    +
                  </button>
                </div>
              </div>
              <div class="product-actions">
                <span class="wishlist-icon">
                  <img
                    class="wishlist-icon"
                    src="../assets/icons/delete.png"
                    alt=""
                  />
                </span>
              </div>
            </div>
          </div>

          <div class="product-item">
            <img src="../assets/icons/image4.png" alt="Versace" />
            <div class="product-details">
              <h3>VERSACE</h3>
              <p>Dylan Blue Eau De Toilette for Men</p>
              <p class="price">$310</p>

              <div class="quantity-controls">
                <button class="qty-btn" onclick="decreaseQty(this)">
                  -
                </button>
                <span class="quantity">Qty: 02</span>
                <button class="qty-btn" onclick="increaseQty(this)">
                  +
                </button>
              </div>
            </div>
            <div class="product-actions">
              <span class="wishlist-icon">
                <img
                  class="wishlist-icon"
                  src="../assets/icons/Vector.png"
                  alt=""
                />
              </span>
              <span class="wishlist-icon">
                <img
                  class="wishlist-icon"
                  src="../assets/icons/delete.png"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <h3>Order Details</h3>
          <div class="summary-item">
            <span>Bag total</span>
            <span>$1390</span>
          </div>
          <div class="summary-item">
            <span>Discount</span>
            <span class="discount">- $450</span>
          </div>
          <div class="pop">
            <p class="offers-applied" onclick="openPopup()">
              3 offers Applied <span class="info-icon">i</span>
            </p>

            <div id="offersModal" class="modal">
              <div class="modal-content">
                <span class="close" onclick="closePopup()">
                  &times;
                </span>
                <h4>5 Offers Applied</h4>
                <ul>
                  <li>
                    <strong>
                      Buy 1 Get 1 <span class="free-label">Free</span>
                    </strong>
                  </li>
                  <li>
                    Buy 3 or More & Pay Just <strong>$75 Each!</strong>
                  </li>
                  <li>
                    Special Combo: Buy Cool Water + Calvin Klein & Get{" "}
                    <strong>$10 Off</strong> on Calvin Klein
                  </li>
                  <li>
                    Limited Time Only: <strong>15% Off</strong> When You Buy in
                    the Next 2 Days
                  </li>
                  <li>
                    Gucci Deal: Save More When You Buy More! Buy 2 units for{" "}
                    <strong>10% off</strong>, or 4+ units for
                    <strong>20% off</strong>.
                  </li>
                </ul>
                <div class="total-discount">
                  <span>Total Discount</span>
                  <span class="discount-amount">- $345</span>
                </div>
              </div>
            </div>
          </div>
          <div class="summary-item total">
            <span>Total</span>
            <span>$940</span>
          </div>
          <p class="congrats-message">
            Congratulations! You've Saved $450 today!
          </p>
          <button class="checkout-btn">Go to Checkout</button>
        </div>
      </div>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-brand">
            <h2>Scentora</h2>
            <p>
              We have perfumes that suits your <br />
              style and which you’re proud.
            </p>
            <div class="social-icons">
              <a href="#">
                <img src="../assets/icons/twitter.png" alt="" />
              </a>
              <a href="#">
                <img src="../assets/icons/fb2.png" alt="" />
              </a>
              <a href="#">
                <img src="../assets/icons/insta.png" alt="" />
              </a>
              <a href="#">
                <img src="../assets/icons/git.png" alt="" />
              </a>
            </div>
          </div>

          <div class="footer-links">
            <div class="footer-column">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Works</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Help</h3>
              <ul>
                <li>
                  <a href="#">Customer Support</a>
                </li>
                <li>
                  <a href="#">Delivery Details</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>FAQ</h3>
              <ul>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Manage Deliveries</a>
                </li>
                <li>
                  <a href="#">Orders</a>
                </li>
                <li>
                  <a href="#">Payments</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>Scentora © 2000-2023, All Rights Reserved</p>
          <div class="payment-icons">
            <img src="../assets/icons/visa.png" alt="Visa" />
            <img src="../assets/icons/master.png" alt="MasterCard" />
            <img src="../assets/icons/paypal.png" alt="PayPal" />
            <img src="../assets/icons/applepay.png" alt="Apple Pay" />
            <img src="../assets/icons/gpay.png" alt="Google Pay" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
