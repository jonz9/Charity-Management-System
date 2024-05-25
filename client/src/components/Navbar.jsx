import React from "react";
import WalletCard from "./WalletCard";
import Logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav className="flex flex-col bg-[#4542E2] px-5">
      <div className="flex flex-row justify-between text-white">
        <a href="/">
          <img src={Logo} alt="logo" className="w-50 h-20 m-3 cursor-pointer" />
        </a>
        <button className="">
          <WalletCard />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
