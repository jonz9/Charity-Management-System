import React from "react";
import '../index.css';

function DonationComponent() {
  return (
    <a href="/CharityPage">
      <button 
        type="submit" 
        className="bg-blue-200 text-black border border-blue-500 py-8 px-28 rounded-full hover:bg-blue-700 hover:text-white hover:scale-105 font-playfair font-bold text-6xl"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        <h1>Donate Today</h1>
      </button>
    </a>
  );
}

export default DonationComponent;