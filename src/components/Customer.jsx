import React from "react";
import "./Customer.css";
import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <div className="orders">
      <div className="products">
        <h2 className="orders-heading">YOUR ORDERS</h2>
        <div className="product">
          <div className="product-image">
            <img src="./laptop.jpg" alt="laptop" className="product-image" />
          </div>
          <div className="product-info">
            <p className="product-name">Product Name is laptop</p>
            <p className="product-id">Product is is id</p>
            <p className="product-price">150000</p>
            <p className="product-status">Product status: status</p>
            <Link to={"/return"} style={{ textDecoration: "none" }}>
              <button className="return-btn">Return</button>
            </Link>
          </div>
        </div>
        <div className="product">
          <div className="product-image">
            <img src="./laptop.jpg" alt="laptop" className="product-image" />
          </div>
          <div className="product-info">
            <p className="product-name">Product Name is Laptop</p>
            <p className="product-id">Product id is a number</p>
            <p className="product-price">150000</p>
            <p className="product-status">Product status: status</p>
            <Link to={"/return"} style={{ textDecoration: "none" }}>
              <button className="return-btn">Return</button>
            </Link>
          </div>
        </div>
        <div className="product">
          <div className="product-image">
            <img src="./laptop.jpg" alt="laptop" className="product-image" />
          </div>
          <div className="product-info">
            <p className="product-name">Product Name is name</p>
            <p className="product-id">Product id is number</p>
            <p className="product-price">150000</p>
            <p className="product-status">Product status: status</p>
            <Link to={"/return"} style={{ textDecoration: "none" }}>
              <button className="return-btn">Return</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
