import React from "react";
import CWherobg from "../assets/CWherobg.png";
import DonationComponent from "./DonationComponent";

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${CWherobg})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white", // Adjust text color as needed
  };

  return (
    <div style={heroStyle}>
      <DonationComponent />
    </div>
  );
}

export default Hero;
