import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const ManufacturerHome = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();
  // console.log(account);

  return (
    <div className="manufacturer-home">
      <div className="manufacturer-products">
        <h2 className="manufacturer-heading">Products</h2>
        {account ? (
          account.item?.map((data, index) => (
            <div className="product" key={index}>
              <div className="product-image">
                <img
                  src={data.product.image}
                  alt="laptop"
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <p className="product-id">
                  <b>Product Id:</b> &nbsp;&nbsp;{data.product.productId}
                </p>
                <p className="product-name">
                  <b>Shipping Address:</b> &nbsp;&nbsp;
                  {data.manufacturer.address}
                </p>
                <p className="product-status">
                  {" "}
                  <b>Status:</b> &nbsp;
                  <span className={`${data.manufacturer.status}`}>
                    <span className="point"></span> {data.manufacturer.status}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="circle" style={{ cursor: "progress" }}>
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
        <button
          className="manufacturer-btn"
          onClick={() => navigate("/manufacturer/product")}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ManufacturerHome;
