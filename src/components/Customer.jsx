import React, { useContext } from "react";
import "./Customer.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/Context";
import { CircularProgress } from "@mui/material";

export default function Customer() {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  return (
    <div className="orders">
      <div className="products">
        <h2 className="orders-heading">YOUR ORDERS</h2>
        {account ? (
          <div className="product">
            <div className="product-image">
              <img src="/laptop.jpg" alt="laptop" className="product-image" />
            </div>
            <div className="product-info">
              <p className="product-name">Product Name is laptop</p>
              <p className="product-id">Product is is id</p>
              <p className="product-price">150000</p>
              <p className="product-status">Product status: status</p>
              {account.return.length ? (
                <button className="return-btn cancel">Cancel return</button>
              ) : (
                <Link to={"/main/return"} style={{ textDecoration: "none" }}>
                  <button className="return-btn">Return</button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
      </div>
    </div>
  );
}
