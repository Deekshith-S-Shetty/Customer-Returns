import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./Firebase";
import "./Styles/review.css";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { CircularProgress } from "@mui/material";

const AdminReview = () => {
  const [imgData, setImgData] = useState("");
  const [formItem, setFormItem] = useState(false);
  const [inputField, setInputField] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleApprove = async() => {
    try {
      //updating status
      const statusUpdate = { 'product.status': 'Return initiated','product.return':false };

      const documentRef = doc(db, "products", id);
      
      await updateDoc(documentRef, statusUpdate);
      navigate('/admin');

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async() => {
    setFormItem(!formItem);
    try {
      //updating status
      const statusUpdate = { 'product.status': 'Return rejected','product.return':false,'product.remark':'We regret to inform data available with us and your description is not matching' };

      const documentRef = doc(db, "products", id);
      
      await updateDoc(documentRef, statusUpdate);
      navigate('/admin');

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputField(e.target.value);
  };

  // get image url
  const getUrl = async (filePath) => {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, filePath);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error;
    }
  };

  const getData = async (id) => {
    const documentRef = doc(db, "products", id);
    const data = await getDoc(documentRef);
    const documentData = data.data();

    const promises = Object.entries(documentData).map(async ([key, value]) => {
      if (key !== "product") {
        const updatedImages = await Promise.all(
          Object.entries(value.images).map(async ([imageKey, imageUrl]) => {
            //fetch the URL based on imageUrl
            const fetchedUrl = await getUrl(imageUrl);
            return [imageKey, fetchedUrl];
          })
        );

        // Update the value.images object with the fetched URLs
        value.images = Object.fromEntries(updatedImages);
      }
    });

    delete documentData["product"];

    await Promise.all(promises);

    setImgData(documentData);
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <div className="review-container">
      {imgData ? (
        <>
          <div className="manufacturer-box">
            <h2 className="review-header">Manufacturer</h2>
            <div className="review-imgbox">
              {imgData.manufacturer &&
                Object.entries(imgData.manufacturer.images).map(
                  ([key, value]) => (
                    <img
                      key={key}
                      src={value}
                      alt="laptop"
                      className="review-product-image"
                    />
                  )
                )}
            </div>
          </div>
          <div className="delivery-box">
            <h2 className="review-header">Delivery</h2>
            <div className="review-imgbox">
              {imgData.delivery &&
                Object.entries(imgData.delivery.images).map(([key, value]) => (
                  <img
                    key={key}
                    src={value}
                    alt="laptop"
                    className="review-product-image"
                  />
                ))}
            </div>
          </div>
          <div className="customer-box">
            <h2 className="review-header">Customer</h2>
            <div className="review-imgbox">
              {imgData.customer &&
                Object.entries(imgData.customer.images).map(([key, value]) => (
                  <img
                    key={key}
                    src={value}
                    alt="laptop"
                    className="review-product-image"
                  />
                ))}
            </div>
          </div>
          <div className="review-processbox">
            <button onClick={handleApprove}>Approve </button>
            <button onClick={() => setFormItem(!formItem)}>Reject </button>
            {formItem && (
              <form onSubmit={handleCancel}>
                <div className="delivery-desc">
                  <div className="delivery-desc-header">
                    <h3>Remark</h3>
                  </div>
                  <textarea
                    rows={9}
                    className="delivery-desc-text"
                    placeholder="Enter the Details"
                    name="details"
                    value={inputField}
                    onChange={handleChange}
                    required
                  />
                  <button type="reset" onClick={()=>setFormItem(!formItem)}>Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            )}
          </div>
        </>
      ) : (
        <div className="circle" style={{ cursor: "progress" }}>
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
