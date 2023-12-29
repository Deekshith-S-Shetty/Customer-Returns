import React, { useContext } from "react";
import "./Styles/Customer.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/Context";
import { CircularProgress } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

export default function Customer() {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const handleCancel = (productId) => {
    const collectionRef = collection(db, "products");

    const mainDocRef = doc(collectionRef, productId);

    const statusUpdate = {
      "product.status": "delivered",
      "product.return": false,
    };

    updateDoc(mainDocRef, statusUpdate)
      .then(() => {
        window.location.reload();
        console.log("Document updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div className="orders">
      <div className="customer-products">
        <h2 className="orders-heading">YOUR ORDERS</h2>
        {account ? (
          account.item?.map((data, index) => (
            <div className="customer-product" key={index}>
              <div className="customer-product-image">
                <img
                  src={data.product.image}
                  alt="laptop"
                  className="customer-product-image"
                />
              </div>
              <div className="customer-product-info">
                <p className="customer-product-name">
                  <b>Product Name:</b> &nbsp;&nbsp;{data.product.name}
                </p>
                <p className="customer-product-id">
                  <b>Product Id:</b> &nbsp;&nbsp;{data.product.productId}
                </p>
                <p className="customer-product-price">
                  <b>Price:</b> &nbsp;&nbsp;{data.product.price}
                </p>
                <p className="customer-product-status">
                  <b>Status:</b> &nbsp;
                  <span className={`${data.product.status}`}>
                    <span className="point"></span> {data.product.status}
                  </span>
                </p>
                {data.product?.remark && (
                  <p className="customer-product-remark">
                    {data.product.remark}
                  </p>
                )}
                {data.product.return || data.product.status !== "delivered" ? (
                  <button
                    className="customer-return-btn cancel"
                    onClick={() => handleCancel(data.product.productId)}
                    disabled={data.product.status !== "Requested for return"}
                  >
                    Cancel return
                  </button>
                ) : (
                  <Link
                    to={`/customer/return/${data.product.productId}`}
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
