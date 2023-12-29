import React, { useState } from "react";
import "./Styles/Delivery.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const [fileName, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState();
  const [inputField, setInputField] = useState({
    deliveryName: "",
    recipientName: "",
    productId: "",
    productName: "",
    shipping: "",
    details: "",
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
      // setImagePath((prev) => {
      //   return { ...prev, [res.metadata.name]: res.metadata.fullPath };
      // });
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

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // await selectedFiles.forEach((file) => {
    //   handleFileUpload(file);
    // });

    await uploadAllFiles(selectedFiles);

    const collectionRef = collection(db, "products");
    // document with custom ID
    const mainDocRef = doc(collectionRef, inputField.productId);

    const { ...updateImages } = imageArr;
    //updating image paths
    const updatedDelivery = {
      ...inputField,
      images: updateImages,
    };
    // Add document to the subcollection
    console.log(updatedDelivery);

    updateDoc(mainDocRef, {
      delivery: updatedDelivery,
    })
      .then(() => {
        navigate('/delivery');
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
    <div className="delivery">
      <div className="delivery-container">
        <form onSubmit={handleSubmit} className="delivery-product-info">
          <h2 className="product-info-header">Delivery Information</h2>
          <div className="product-group delievery-name">
            <label className="product-label">Delivery Person Name</label>
            <input
              type="text"
              placeholder="Delievery Person's Name"
              name="deliveryName"
              value={inputField.deliveryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group recipient-name">
            <label className="product-label">Recipient Name</label>
            <input
              type="text"
              placeholder="Recipient Name"
              name="recipientName"
              value={inputField.recipientName}
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
          <div className="product-group delivery-address">
            <label className="product-label">Delivered Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              name="shipping"
              value={inputField.shipping}
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-group product-delivery-image">
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
          <div className="delivery-desc">
            <div className="delivery-desc-header">
              <h3>Additional Details (if any)</h3>
            </div>
            <textarea
              rows={9}
              className="delivery-desc-text"
              placeholder="Enter the Details"
              name="details"
              value={inputField.details}
              onChange={handleChange}
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
