import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h2 className="home-header">Welcome 👋</h2>
        <div className="home-subtitle">SignIn or SignUp to get started</div>
        <div className="home-links">
          <Link to={"/signup"} className="home-link">
            SignUp
          </Link>
          <Link to={"/signin"} className="home-link">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}
