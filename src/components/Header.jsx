import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <Link to={"/main"} style={{ textDecoration: "none" }}>
        <p className="header-text header-item">Customer-Returns</p>
      </Link>
      <p className="header-item">About Us</p>
      <p className="header-item">Contact Us</p>
      <p className="header-icon header-item">
        <FontAwesomeIcon icon={faUserSecret} size="xl" />
      </p>
    </div>
  );
}
