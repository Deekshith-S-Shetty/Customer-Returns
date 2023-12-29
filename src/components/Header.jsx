import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import "./Styles/Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { LoginContext } from "../Context/Context";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  return (
    <div className="header">
      <Link to={"/"} style={{ textDecoration: "none", background: "none" }}>
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
  );
}
