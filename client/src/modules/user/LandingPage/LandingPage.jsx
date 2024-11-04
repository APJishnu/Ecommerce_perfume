import React from 'react'
import './LandingPage.css';
import ProductList from './components/Products/Products';


const LandingPage = () => {
  return (
    <div>
        

        <div class="main-content-wrapper">
            <div class="explore-block">
                <div class="image-container">
                    <img src="../img/img-2.svg" alt="Explore Image" class="full-width-image" />
                </div>
            </div>


            <div class="collections">
                <div class="collection-left">
                    <div class="left-box">
                        <div class="filter-main">
                            <p class="top-filter">Filter</p>
                            <p class="top-clear">Clear All</p>
                        </div>

                        <div>
                            <div class="tag">
                                <div>
                                    <span class="tag-text">Armani Code</span>
                                    <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                </div>
                            </div>

                            <div class="d-flex gp-10">
                                <div class="tag">
                                    <div>
                                        <span class="tag-text">Cool water</span>
                                        <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                    </div>
                                </div>

                                <div class="tag">
                                    <div>
                                        <span class="tag-text">CK</span>
                                        <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                    </div>
                                </div>
                            </div>

                            <div class="tag">
                                <div>
                                    <span class="tag-text">Gucci Bloom</span>
                                    <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                </div>
                            </div>

                            <div class="tag">
                                <div>
                                    <span class="tag-text">Lataffa</span>
                                    <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                </div>
                            </div>

                            <div class="tag">
                                <div>
                                    <span class="tag-text">Channel No.5</span>
                                    <img src="../img/x.svg" alt="Close" class="tag-icon" />
                                </div>
                            </div>
                        </div>

                        <div class="border-bottom">
                            <hr class="hr" />
                        </div>

                        <div class="">
                            <div class="gender-feild">
                                <div>Gender</div>
                                <img src="../img/right-arrow.svg" alt="" />
                            </div>

                            <div class="gender-feild">
                                <div>Discount</div>
                                <img src="../img/right-arrow.svg" alt="" />
                            </div>

                            <div class="gender-feild">
                                <div>Price</div>
                                <img src="../img/right-arrow.svg" alt="" />
                            </div>
                        </div>

                        <div class="border-bottom">
                            <hr class="hr" />
                        </div>

                        <div class="brand-wrapper">
                            <div class="brand-title">Brands</div>

                            <input type="text" placeholder="   Search Brand" class="search-field" />

                            <div>
                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Ajmal
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Armani Code
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Cool water
                                    </label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Channel No. 5
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Calvin Klein
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Gucci Bloom
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        Lataffa
                                    </label>
                                </div>

                                <div class="checkbox-wrapper">
                                    <label>
                                        <input type="checkbox" class="brand-checkbox" />
                                        La French
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collection-right">
                    <div class="our-collections">Our Collections</div>
                    <div class="results-info">
                        <div class="results-count">Showing 06 results</div>
                        <div class="sort-by">
                            <span>Sorted by : <b>Popularity</b>
                                <img class="mt-50" src="../img/down-arrow.svg" alt="" />
                            </span>
                        </div>
                    </div>

                    <div class="class-card">
                        <ProductList />
                    </div>
                </div>
            </div>
        </div>


        <footer class="footer">
            <div class="footer-container">
                <div class="footer-brand">
                    <h2>Scentora</h2>
                    <p>
                        We have perfumes that suits your <br />style and which you’re proud.
                    </p>
                    <div class="social-icons">
                        <a href="#"><img src="../assets/icons/twitter.png" alt="" /></a>
                        <a href="#"><img src="../assets/icons/fb2.png" alt="" /></a>
                        <a href="#"><img src="../assets/icons/insta.png" alt="" /></a>
                        <a href="#"><img src="../assets/icons/git.png" alt="" /></a>
                    </div>
                </div>

                <div class="footer-links">
                    <div class="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Works</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Help</h3>
                        <ul>
                            <li><a href="#">Customer Support</a></li>
                            <li><a href="#">Delivery Details</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>FAQ</h3>
                        <ul>
                            <li><a href="#">Account</a></li>
                            <li><a href="#">Manage Deliveries</a></li>
                            <li><a href="#">Orders</a></li>
                            <li><a href="#">Payments</a></li>
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
  )
}

export default LandingPage