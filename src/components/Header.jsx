import React from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="header">
      <p className="header-text">Customer-Returns</p>
      <FontAwesomeIcon icon={faUserSecret} size="xl" />
    </div>
  );
}
