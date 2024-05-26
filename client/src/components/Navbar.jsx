import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import RegisterModal from "./RegisterModal"; // Import your modal component
import { createCharity } from "../utils/services";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charityName, setCharityName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [causes, setCauses] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitCharity = async (event) => {
    // constant: too lazy to change db schema
    const address = "0xEB3a7e581630B535D51DF6e64fb7eD0eb7dFbE78";
    event.preventDefault();

    const causeArray = causes ? causes.split(", ") : [];

    // const newCharity = {
    //   name: name,
    //   description: description,
    //   logo: logo,
    //   causes: causeArray,
    //   address: address,
    // };
    const newCharity = {
      name: charityName,
      description: description,
      logo: logo,
      causes: causeArray,
      address: address,
    };

    try {
      await createCharity(newCharity);

      setCharityName("");
      setDescription("");
      setCauses("");
      setLogo("");

      
    } catch (error) {
      alert("Error creating charity: " + error);
    }
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
            <h3>Verification</h3>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <RegisterModal closeModal={closeModal}>
          <h1 className="text-3xl font-serif">Register Your Charity Here!</h1>
          <p className="text-md py-4">
            A reputable way for donors to ensure their money is going towards
            the intended cause and recipients.
          </p>

          {/* Form handling information pushing */}
          <form onSubmit={submitCharity}>
            {/* Charity Name */}
            <div className="flex flex-col gap-1 pb-2">
              <label htmlFor="charityName" className="font-semibold">
                Charity Name
              </label>
              <input
                type="text"
                id="charityName"
                name="charityName"
                required
                minLength="4"
                placeholder="Charity Name"
                className="border-2 rounded-xl border-gray-600 hover:border-gray-800 h-7 px-3"
                value={charityName}
                onChange={(e) => setCharityName(e.target.value)}
              ></input>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 pb-2">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                minLength="4"
                placeholder="Description"
                className="border-2 rounded-xl border-gray-600 hover:border-gray-800 h-7 px-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            {/* Charity Logo */}
            <div className="flex flex-col gap-1">
              <label htmlFor="logo" className="font-semibold">
                Logo
              </label>
              <input
                type="text"
                id="logo"
                name="logo"
                minLength="4"
                placeholder="Logo"
                className="border-2 rounded-xl border-gray-600 hover:border-gray-800 h-7 px-3"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              ></input>
              <p className="text-sm pb-2">
                *Please enter google link for image
              </p>
            </div>

            {/* Donation Causes */}
            <div className="flex flex-col gap-1">
              <label htmlFor="causes" className="font-semibold">
                Causes
              </label>
              <input
                type="text"
                id="causes"
                name="causes"
                minLength="4"
                placeholder="Causes"
                className="border-2 rounded-xl border-gray-600 hover:border-gray-800 h-7 px-3"
                value={causes}
                onChange={(e) => setCauses(e.target.value)}
              ></input>
              <p className="text-sm">
                *Please separate each cause with a comma and space e.g. Cancer,
                Homelessness
              </p>
            </div>

            <button
              type="submit"
              className="p-2 my-10 border-2 rounded-xl w-full text-xl bg-[#4542E2] text-white font-bold hover:bg-[#32317d] transition duration-400"
            >
              Submit
            </button>
          </form>
        </RegisterModal>
      )}
    </nav>
  );
}

export default Navbar;
