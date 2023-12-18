import React, { useState } from "react";
import "./Return.css";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function Return() {
  const [fileName, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState();
  const [inputField, setInputField] = useState({
    name: "",
    productName: "",
    productId: "",
    reason: "",
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
    const updatedReturn = {
      ...inputField,
      images: updateImages,
    };
    // Add document to the subcollection
    console.log(updatedReturn);

    // Add document to the subcollection
    updateDoc(mainDocRef, {
      customer: updatedReturn,
    })
      .then(() => {
        navigate('/customer');
        console.log("Document updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

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
