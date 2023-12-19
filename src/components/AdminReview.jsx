import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";

const AdminReview = () => {
  const { id } = useParams();

  const getData = async(id)=>{
    const documentRef = doc(db, "products", id);
    const data = await getDoc(documentRef);
    const documentData = data.data();
    console.log(documentData);
  }

  useEffect(() => {
    getData(id);
  }, []);

  return <div>AdminReview</div>;
};

export default AdminReview;
