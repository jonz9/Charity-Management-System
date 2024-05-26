import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import Modal2 from "./Modal2"; // Import your modal component

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="flex flex-col bg-[#4542E2] px-10 relative z-10 w-full">
      <div className="flex flex-row items-center justify-between text-white">
        <a href="/">
          <img src={Logo} alt="logo" className="w-50 h-20 m-3 cursor-pointer" />
        </a>
        <div className="grid grid-flow-col gap-2">
          <button
            onClick={openModal}
            className="p-3 border-2 border-black rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-300 hover:to-slate-600"
          >
            <h3>Register Charity</h3>
          </button>
          <button className="p-3 border-2 border-black rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-300 hover:to-slate-600">
            <h3>// verification</h3>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal2 closeModal={closeModal}>
          {/* Your modal content goes here */}
          {/*WOOOOOOOOOOOOOOO*/}
          <p>This is a blank modal!</p>
        </Modal2>
      )}
    </nav>
  );
}

export default Navbar;
