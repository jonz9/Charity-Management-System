import React, { useState, useEffect } from "react";
const CharityDisplay = () => {
  const [charities, setCharities] = useState([]);

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

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-xl py-2 font-bold font-serif">Charities:</h1>
      <ul className="grid grid-cols-4 gap-10">
        {charities.map((charity, index) => (
          <li
            key={index}
            className="bg-gray-300 hover:bg-gray-500 hover:cursor-pointer transition duration-800 h-60 gap-5 border rounded-3xl p-5 flex flex-col justify-center items-center"
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
    </div>
  );
};

export default CharityDisplay;