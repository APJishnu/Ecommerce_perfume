"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../config/api";
import { useRouter } from "next/navigation"; // Assuming you are using Next.js for routing
import Cookies from "js-cookie";
import { message } from "antd";

const ProductList = () => {
  // Assuming userId is passed as a prop
  const [products, setProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/get-products`);
        const data = await response.data.data.products;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const userId = Cookies.get("userId");
      const response = await axios.post(`${API_URL}/api/user/add-to-cart`, {
        userId,
        productId,
      });

      if (response.data.status) {
        console.log("Product added to cart:", response.data);
        message.success("Product added to cart successfully!"); // Notify user of success
        // Redirect to the cart page
        router.push("/cart");
      } else {
        console.warn("Product not added to cart:", response.data);
        message.error("Product could not be added to the cart."); // Notify user of failure
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      message.error("An error occurred while adding the product to the cart."); // Notify user of error
    }
  };

  return (
    <>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="text-center image-wrap">
            <div className="image-block">
              <img
                src={`${API_URL}${product.image}`}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="heart-wrapper">
              <img src="../img/heart.svg" alt="Heart" className="heart-image" />
            </div>
            <div className="badge-wrapper">
              <img src="../img/badge.svg" alt="Badge" className="badge-image" />
            </div>
          </div>

          <div className="details-block">
            <div className="head-1">{product.brand}</div>
            <p className="sub-head-1">{product.description}</p>
            <p className="price">${product.price}</p>
            <button
              className="buy-button"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
