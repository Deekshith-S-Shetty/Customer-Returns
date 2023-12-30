import React, { useState } from "react";
import "./Styles/Manufacturer.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";

export default function Manufacturer() {
  const [fileName, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState();
  const [inputField, setInputField] = useState({
    shipmentName: "",
    productId: "",
    productName: "",
    address: "",
    description: "",
    images: {},
  });

  const navigate = useNavigate();
  let imageArr = [];

  //upload filles to cloud
  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + file.name);
      const res = await uploadBytes(storageRef, file);
      imageArr.push(res.metadata.fullPath);

      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  //manging file upload
  const uploadAllFiles = async (files) => {
    const uploadPromises = files.map((file) => handleFileUpload(file));
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await uploadAllFiles(selectedFiles);

    const collectionRef = collection(db, "products");
    // document with custom ID
    const mainDocRef = doc(collectionRef, inputField.productId);

    const { ...updateImages } = imageArr;
    //updating image paths
    const updatedManufacturing = {
      ...inputField,
      images: updateImages,
    };
    // Add document to the subcollection
    console.log(updatedManufacturing);

    updateDoc(mainDocRef, {
      manufacturer: updatedManufacturing,
    })
      .then(() => {
        navigate("/manufacturer");
        console.log("Document updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  //handle change in input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handle file changing
  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const fileList = Array.from(files);
      setFileNames([...files]);
      setSelectedFiles(fileList);
    }
    e.target.name = fileName;
  };

  return (
    <div className="manufacture">
      <div className="manufacture-container">
        <form onSubmit={handleSubmit} className="manufacture-product-info">
          <h2 className="product-info-header" id="manufacture-info-header">
            Shipping Information
          </h2>
          <div className="product-group shipment-name">
            <label className="product-label">Enter Shipment Name</label>
            <input
              type="text"
              placeholder="Shipment Name"
              name="shipmentName"
              value={inputField.shipmentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group product-name">
            <label className="product-label">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              value={inputField.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group product-id">
            <label className="product-label">Product Id</label>
            <input
              type="text"
              placeholder="Product Id"
              name="productId"
              value={inputField.productId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group product-address">
            <label className="product-label">Shipping Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              value={inputField.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group product-manufacture-image">
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
          <div className="manufacture-desc">
            <div className="manufacture-desc-header">
              <h3>Product Description</h3>
            </div>
            <textarea
              rows={9}
              className="manufacture-desc-text"
              placeholder="Enter the Description of product"
              name="description"
              value={inputField.description}
              onChange={handleChange}
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
