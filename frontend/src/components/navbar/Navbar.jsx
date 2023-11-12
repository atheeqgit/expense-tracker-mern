import React from "react";
import "./navbar.css";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setUserID } = useGlobalContext();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
    toast.success("ypu have success fully loged out");
    setUserID("");
  };

  return (
    <div className="navbar" id="padding">
      <div className="logo">blinder</div>
      <div className="links">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i className="fa-solid fa-house"></i>
          <p>home</p>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i className="fa-solid fa-chart-line"></i>
          <p>dashboard</p>
        </NavLink>
        <NavLink
          to="/recent"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          <p>recent</p>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i className="fa-solid fa-gear"></i>
          <p>settings</p>
        </NavLink>
      </div>
      <div className="nav-btns">
        <button
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
