import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./Styles/Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { LoginContext } from "../Context/Context";
import Hamburger from "./Hamburger";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hamburger, setHamburger] = useState(true);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  //user logout
  const handleLogout = () => {
    handleClose();

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const route = account.data ? account.data?.userType : "";
    navigate("/" + route);
  };

  const handleHamClick = () => {
    console.log("hi");
    setHamburger(!hamburger);
    console.log(hamburger);
  };

  return (
    <div className="header-container">
      <div onClick={() => handleHamClick()}>
        <Hamburger />
      </div>
      <div className="header" id={hamburger ? "display-ham" : ""}>
        <Link style={{ textDecoration: "none", background: "none" }}>
          <p className="header-item" onClick={handleHomeClick}>
            Customer-Returns
          </p>
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
        <p className="header-item" id="header-profile">
          <FontAwesomeIcon
            icon={faUserSecret}
            size="xl"
            className="header-icon"
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              {account ? account.data.Name : "Profile"}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </p>
      </div>
    </div>
  );
}
