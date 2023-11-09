import React from "react";
import "./navbar.css";
import { NavLink, Link, Route, Routes } from "react-router-dom";

const Navbar = () => {
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
          <i class="fa-solid fa-house"></i>
          <p>home</p>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i class="fa-solid fa-chart-line"></i>
          <p>dashboard</p>
        </NavLink>
        <NavLink
          to="/recent"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i class="fa-solid fa-clock-rotate-left"></i>
          <p>recent</p>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "link-active" : ""
          }
        >
          <i class="fa-solid fa-gear"></i>
          <p>settings</p>
        </NavLink>
      </div>
      <div className="nav-btns">
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
