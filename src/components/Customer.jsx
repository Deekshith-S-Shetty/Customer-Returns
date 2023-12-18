import React, { useContext } from "react";
import "./Customer.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/Context";
import { CircularProgress } from "@mui/material";

export default function Customer() {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const handleCancel = () => {
    // do cancel
  };

  console.log(account?true:false);

  return (
    <div className="orders">
      <div className="customer-products">
        <h2 className="orders-heading">YOUR ORDERS</h2>
        {account ? (
          account.item.map((data,index) => (
            <div className="customer-product" key={index}>
              <div className="customer-product-image">
                <img
                  src={data.product.image}
                  alt="laptop"
                  className="customer-product-image"
                />
              </div>
              <div className="customer-product-info">
                <p className="customer-product-name"><b>Product Name:</b> &nbsp;&nbsp;{data.product.name}</p>
                <p className="customer-product-id"><b>Product Id:</b> &nbsp;&nbsp;{data.product.productId}</p>
                <p className="customer-product-price"><b>Price:</b> &nbsp;&nbsp;{data.product.price}</p>
                <p className="customer-product-status"><b>Status:</b> &nbsp;<span className={`${data.product.status}`}><span className="point"></span> {data.product.status}</span></p>
                {data.product.return ? (
                  <button
                    className="customer-return-btn cancel"
                    onClick={handleCancel}
                  >
                    Cancel return
                  </button>
                ) : (
                  <Link
                    to={"/customer/return"}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="customer-return-btn">Return</button>
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="circle" style={{ cursor: "progress" }}>
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
      </div>
    </div>
  );
}
