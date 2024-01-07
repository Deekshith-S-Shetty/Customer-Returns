import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import "./Styles/signup_signin.css";
import { collection, setDoc, doc } from "firebase/firestore";
import { LoginContext } from "../Context/Context";

export default function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    userType: "customer",
    password: "",
    cpassword: "",
    gstNumber:"",
  });

  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.cpassword) {
      alert("Confirmation password not same as password");
      return;
    }
    auth
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((data) => {
        //collection reference WRT database
        const collectionRef = collection(db, input.userType);

        //conditional gst append
        const docObject = {
          userType: input.userType,
          Email: input.email,
          Name: input.fullName,
        }

        if(input.gstNumber){
          docObject.gstNumber=input.gstNumber
        }

        //Creating new Doc inside the collection
        const docRef = doc(collectionRef, data.user.uid);
        setDoc(docRef, {
         ...docObject
        })
          .then(() => {
            navigate(`/${input.userType.toLowerCase()}`);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        alert(error.message);
        return;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (account.data) {
      navigate(`/${account.data.userType.toLowerCase()}`);
    }
  });

  return (
    <div>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-header">Sign Up</h2>
          <div className="auth-form-signup">
            <form onSubmit={handleSubmit} className="auth-form-login">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleChange}
                  value={input.fullName}
                  required
                />
                <label>Name</label>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  value={input.email}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  value={input.password}
                  required
                />
                <label>Password</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="cpassword"
                  name="cpassword"
                  onChange={handleChange}
                  value={input.cpassword}
                  required
                />
                <label>Confirm Password</label>
              </div>
              <div className="input-container">
                <select
                  name="userType"
                  onChange={handleChange}
                  id="user-select"
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              {input.userType === "manufacturer" && (
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Enter GST Numbber"
                    name="gstNumber"
                    onChange={handleChange}
                    value={input.gstNumber}
                    required
                  />
                  <label>GST Number</label>
                </div>
              )}
              <button type="submit" className="btn-2">
                Sign Up
              </button>
              <div className="redirect">
                Have an account?{" "}
                <Link to="/signin" className="link-color">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
