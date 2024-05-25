import React, { useState, useEffect } from "react";

const CharityDisplay = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await fetch("http://localhost:3000/CharityData/charities");
        const data = await response.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    fetchCharities();
  }, []);

  return (
    <div>
      <h2>Charities:</h2>
      <ul>
        {charities.map((charity, index) => (
          <li key={index}>            
            <img src={charity.logo} alt="Charity Logo" style={{ width: "100px", height: "auto" }} />
            <h3>{charity.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharityDisplay;

