import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import "./signup_signin.css";

export default function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.cpassword) {
      alert("Confirmation password not same as password");
      return;
    }
    auth
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((auth) => {
        navigate("/main");
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
    <div>
      <div className="auth-container">
        <div className="auth-card-signup">
          <h2 className="auth-header">Sign Up</h2>
          <div className="auth-form-signup">
            <form onSubmit={handleSubmit} className="auth-form-login">
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
              <br />
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
              <br />
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
                <select name="user" id="user-select" required>
                  <option value="customer">Customer</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              <button type="submit" className="btn-2">
                Sign Up
              </button>
              <br />
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
