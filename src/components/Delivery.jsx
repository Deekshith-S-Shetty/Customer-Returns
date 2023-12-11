import React, { useState } from "react";
import "./Delivery.css";

export default function Delivery() {
  const [fileName, setFileNames] = useState([]);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const files = e.target.files;
    setFileNames([...files]);
    e.target.name = fileName;
  };

  return (
    <div className="delivery">
      <div className="delivery-container">
        <form onSubmit={handleSubmit} className="delivery-product-info">
          <h2 className="product-info-header">Delivery Information</h2>
          <div className="product-group delievery-name">
            <label className="product-label">Delivery Person Name</label>
            <input type="text" placeholder="Delievery Person's Name" required />
          </div>
          <div className="product-group recipient-name">
            <label className="product-label">Recipient Name</label>
            <input type="text" placeholder="Recipient Name" required />
          </div>
          <div className="product-group product-name">
            <label className="product-label">Product Name</label>
            <input type="text" placeholder="Product Name" required />
          </div>
          <div className="product-group product-id">
            <label className="product-label">Product Id</label>
            <input type="text" placeholder="Product Id" required />
          </div>
          <div className="product-group delivery-address">
            <label className="product-label">Delivered Address</label>
            <input type="text" placeholder="Enter Address" required />
          </div>
          <div className="product-group product-delivery-image">
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
          <div className="delivery-desc">
            <div className="delivery-desc-header">
              <h3>Additional Details (if any)</h3>
            </div>
            <textarea
              rows={9}
              className="delivery-desc-text"
              placeholder="Enter the Details"
            />
          </div>
          <div className="product-group">
            <input id="delivery-submit-btn" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
