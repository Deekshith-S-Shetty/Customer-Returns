import React, { useState } from "react";
import Header from "./Header";
import "./Return.css";

export default function Return() {
  const [fileName, setFileNames] = useState([]);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const files = e.target.files;
    setFileNames([...files]);
    e.target.name = fileName;
  };

  return (
    <div className="return-page">
      <Header />
      <div className="return-container">
        <form onSubmit={handleSubmit} className="return-product-info">
          <h2 className="product-info-header">Product Information</h2>
          <div className="product-group product-name">
            <label className="product-label">Product Name</label>
            <input type="text" placeholder="Product Name" required />
          </div>
          <div className="product-group product-id">
            <label className="product-label">Product Id</label>
            <input type="text" placeholder="Product Id" required />
          </div>
          <div className="product-group product-return-image">
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
          <div className="return-desc">
            <div className="return-desc-header">
              <h3>Reason For Return</h3>
            </div>
            <textarea
              rows={9}
              className="return-desc-text"
              placeholder="Enter the reason for return"
              required
            />
          </div>
          <div className="product-group">
            <input id="return-submit-btn" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
