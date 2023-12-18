import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const ManufacturerHome = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  return (
    <div className="manufacturer-home">
      <div className="manufacturer-products">
        <h2 className="manufacturer-heading">Products</h2>
        {account ? (
          <>
            <div className="product">
              <div className="product-image">
                <img src="/laptop.jpg" alt="laptop" className="product-image" />
              </div>
              <div className="product-info">
                <p className="product-id">Product is id</p>
                <p className="product-name">Address</p>
                <p className="product-status">Product status: status</p>
              </div>
            </div>
            <button className="manufacturer-btn" onClick={()=>navigate('/manufacturer/product')} >Add Product</button>
          </>
        ) : (
          <div className="circle" style={{ cursor: "progress" }}>
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerHome;
