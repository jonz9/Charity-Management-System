import React from "react";
import Logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav className="flex flex-col bg-[#4542E2] px-10">
      <div className="flex flex-row items-center justify-between text-white">
        <a href="/">
          <img src={Logo} alt="logo" className="w-50 h-20 m-3 cursor-pointer" />
        </a>
        <div className="grid grid-flow-col gap-2">
          <button className="p-3 border-2 border-black rounded-xl border-spacing-2 bg-slate-400 hover:bg-slate-500">
            // verification
          </button>
          <button className="p-3 border-2 border-black rounded-xl border-spacing-2 bg-slate-400 hover:bg-slate-500">
            // verification
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
