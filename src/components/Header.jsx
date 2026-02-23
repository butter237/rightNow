import React from "react";
import logo from "../assets/logo.png"


function Header() {
    // const imageData = { src: logo, alt: "React Logo" };
  return (
    <div className="header">
        <img className="w-[10%]" src={logo} alt="logo" />
      <input className="search" placeholder="Search" />

      <div className="user">
        <span>🔔</span>
        <span>👤 Klin Kerdyoo</span>
      </div>
    </div>
  );
}

export default Header;