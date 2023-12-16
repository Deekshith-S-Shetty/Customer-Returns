import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import "./signup_signin.css";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { LoginContext } from "../Context/Context";

export default function Signin() {
  const [input, setInput] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const { account, setAccount } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(input.userName, input.password)
      .then(async(auth) => {
        console.log(auth.user.uid);
        const docRef = doc(db, "Users", auth.user.uid);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          try {
            const subcollectionRef = collection(docRef, "return");

            // Fetch documents from the subcollection
            const subcollectionDocs = await getDocs(subcollectionRef);
            const subcollectionDataArray = subcollectionDocs.docs.map(
              (subDoc) => ({
                id: subDoc.id,
                data: subDoc.data(),
              })
            );
            setAccount({
              data: docSnap.data(),
              return: subcollectionDataArray,
            });
            
          } catch (error) {
            setAccount({ data: docSnap.data() });
            console.error("Error fetching document: ", error);
          }
          navigate(`/${docSnap.data().userType.toLowerCase()}`);
        } else {
            console.log("No such document!");
          }
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-header">Login</h2>
        <br />
        <div className="auth-form-login">
          <form onSubmit={handleSubmit} className="auth-form-login">
            <div className="input-container">
              <input
                type="email"
                placeholder="email"
                name="userName"
                onChange={handleChange}
                value={input.userName}
              />
              <label>User Email</label>
            </div>
            <br />
            <div className="input-container">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={input.password}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-2">
              Login
            </button>
            <br />
            <div className="redirect">
              Don't have an account?{" "}
              <Link to="/signup" className="link-color">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
