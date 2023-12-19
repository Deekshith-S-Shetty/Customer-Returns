import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export default function Admin() {
  const navigate = useNavigate();
  const [productsArr, setProductsArr] = useState([]);

  const getproducts = async () => {
    const myCollection = collection(db, "products");
    const querySnapshot = await getDocs(myCollection);

    // Create an array to hold the new products
    const newProductsArr = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().product.return) {
        newProductsArr.push(doc.data().product);
      }
    });

    // Set the state once after processing all documents
    setProductsArr(newProductsArr);
  };

  useEffect(() => {
    getproducts();
  }, []);
  console.log(productsArr);

  return (
    <div className="admin-container">
      <div className="left-container">
        <div className="left-box">
          <h4 className="approved-header">Approved products</h4>
        </div>
      </div>
      <div className="right-container">
        <div className="right-box">
          <h2 className="right-header">Return requests</h2>
          <div className="request-container">
            {productsArr.length ? (
              productsArr.map((data, index) => (
                <div className="review-product" key={index}>
                  <div className="review-product-info">
                    <p className="review-product-name">
                      <b>Product Name:</b> &nbsp;&nbsp;{data.name}
                    </p>
                    <p className="review-product-id">
                      <b>Product Id:</b> &nbsp;&nbsp;{data.productId}
                    </p>
                    <p className="review-product-status">
                      <b>Status:</b> &nbsp;
                      <span className={`${data.status}`}>
                        <span className="point"></span> {data.status}
                      </span>
                    </p>
                    <button className="review-btn" onClick={() => navigate(`/admin/review/${data.productId}`)}>
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="classic">No request yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
