import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  customerArray,
  db,
  deliveryArray,
  manufacturerArray,
} from "./Firebase";
import "./Styles/signup_signin.css";
import { doc, getDoc } from "firebase/firestore";
import { LoginContext } from "../Context/Context";

export default function Signin() {
  const [input, setInput] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const { account, setAccount } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(input.userName, input.password)
      .then(async (authUser) => {
        let userType;
        if (customerArray.includes(authUser.user.uid)) {
          userType = "customer";
        } else if (manufacturerArray.includes(authUser.user.uid)) {
          userType = "manufacturer";
        } else if (deliveryArray.includes(authUser.user.uid)) {
          userType = "delivery";
        } else {
          userType = "admin";
        }
        
        const direction = userType.toLowerCase();

        navigate(`/${direction}`);
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

  useEffect(() => {
    if (account.data) {
      navigate(`/${account.data.userType.toLowerCase()}`);
    }
  });

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
