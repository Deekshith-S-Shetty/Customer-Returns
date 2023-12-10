import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <Link to={"/main"} style={{ textDecoration: "none", background: "none" }}>
        <p className="header-item">Customer-Returns</p>
      </Link>
      <Link
        to={"/about"}
        style={{ textDecoration: "none", background: "none" }}
      >
        <p className="header-item">About Us</p>
      </Link>
      <Link
        to={"/contact"}
        style={{ textDecoration: "none", background: "none" }}
      >
        <p className="header-item">Contact Us</p>
      </Link>
      <p className="header-item">
        <FontAwesomeIcon
          icon={faUserSecret}
          size="xl"
          className="header-icon"
        />
      </p>
    </div>
  );
}
