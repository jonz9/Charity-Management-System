import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const CharityDisplay = () => {
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/CharityData/charities"
        );
        const data = await response.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    fetchCharities();
  }, []);

  const handleCharityClick = (charity) => {
    setSelectedCharity(charity);
  };

  const handleCloseModal = () => {
    setSelectedCharity(null);
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-xl py-2 font-bold font-serif">Charities:</h1>
      <ul className="grid grid-cols-4 gap-10">
        {charities.map((charity, index) => (
          <li
            key={index}
            onClick={() => handleCharityClick(charity)}
            className="bg-gray-300 hover:bg-gray-500 hover:cursor-pointer transition duration-800 h-60 gap-5 border-2 border-black shadow-4xl rounded-3xl p-5 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col border rounded-xl justify-center items-center bg-white p-5 w-40 h-40">
              <img
                src={charity.logo}
                alt="Charity Logo"
                className="w-40 h-auto"
              />
            </div>
            <h3 className="text-center text-lg font-semibold font-serif">{charity.name}</h3>
          </li>
        ))}
      </ul>
      {selectedCharity && (
        <Modal
          charity={selectedCharity}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CharityDisplay;
