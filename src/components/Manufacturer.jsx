import React, { useState } from "react";
import "./Manufacturer.css";

export default function Manufacturer() {
  const [fileName, setFileNames] = useState([]);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const files = e.target.files;
    setFileNames([...files]);
    e.target.name = fileName;
  };

  return (
    <div className="manufacture">
      <div className="manufacture-container">
        <form onSubmit={handleSubmit} className="manufacture-product-info">
          <h2 className="product-info-header">Shipping Information</h2>
          <div className="product-group shipment-name">
            <label className="product-label">Enter Shipment Name</label>
            <input type="text" placeholder="Shipment Name" required />
          </div>
          <div className="product-group product-name">
            <label className="product-label">Product Name</label>
            <input type="text" placeholder="Product Name" required />
          </div>
          <div className="product-group product-id">
            <label className="product-label">Product Id</label>
            <input type="text" placeholder="Product Id" required />
          </div>
          <div className="product-group product-address">
            <label className="product-label">Shipping Address</label>
            <input type="text" placeholder="Enter Address" required />
          </div>
          <div className="product-group product-manufacture-image">
            <label className="product-label">Product Images</label>
            <div className="upload-input">
              <input
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
                id="file-input"
                multiple
                required
              />
              <label htmlFor="file-input" className="upload-label">
                <span id="choose-btn">Choose File</span>
                <span id="choose-names">
                  {fileName.length === 0
                    ? "No Files Choosen"
                    : fileName.map((file, index) => (
                        <span key={index}>{file.name}&nbsp;&nbsp;&nbsp;</span>
                      ))}
                </span>
              </label>
            </div>
          </div>
          <div className="manufacture-desc">
            <div className="manufacture-desc-header">
              <h3>Product Description</h3>
            </div>
            <textarea
              rows={9}
              className="manufacture-desc-text"
              placeholder="Enter the Description of product"
              required
            />
          </div>
          <div className="product-group">
            <input id="manufacture-submit-btn" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
