import React, { useContext, useState } from "react";
import "./Return.css";
import { LoginContext } from "../Context/Context";
import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";

export default function Return() {
  const [fileName, setFileNames] = useState([]);
  const [inputField, setInputField] = useState({
    name: "",
    productName: "",
    productId: "",
    reason: "",
  });

  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerRef = collection(db, "customer");
    // document with custom ID
    const mainDocRef = doc(customerRef, account.uid);

    // Reference to the subcollection
    const subCollectionRef = collection(mainDocRef, "return");

    // Add document to the subcollection
    addDoc(subCollectionRef, {
      return: true,
      name:inputField.name,
      productName:inputField.productName,
      productId:inputField.productId,
      reason:inputField.reason,
    })
      .then((data) => {
        console.log("success", data.id);
        navigate("/customer");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFileNames([...files]);
    e.target.name = fileName;
  };

  return (
    <div className="return-page">
      <div className="return-container">
        <form onSubmit={handleSubmit} className="return-product-info">
          <h2 className="product-info-header">Product Information</h2>
          <div className="product-group your-name">
            <label className="product-label">Enter Your Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              required
              onChange={handleChange}
              value={inputField.name}
            />
          </div>
          <div className="product-group product-name">
            <label className="product-label">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              required
              onChange={handleChange}
              value={inputField.productName}
            />
          </div>
          <div className="product-group product-id">
            <label className="product-label">Product Id</label>
            <input
              type="text"
              placeholder="Product Id"
              name="productId"
              required
              onChange={handleChange}
              value={inputField.productId}
            />
          </div>
          <div className="product-group product-return-image">
            <label className="product-label">Product Images</label>
            <div className="upload-input">
              <input
                type="file"
                onChange={handleFileChange}
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
              name="reason"
              required
              onChange={handleChange}
              value={inputField.reason}
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
