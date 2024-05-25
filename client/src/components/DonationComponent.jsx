import React from "react";

function DonationComponent() {
  return (
    <a href="/CharityPage">
      <button type="submit" className="bg-blue-200 text-black border border-blue-500 py-4 px-8 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <h1>Donate Today</h1>
      </button>
    </a>
  );
}

export default DonationComponent;
