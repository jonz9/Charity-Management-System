import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DonationComponent from "../components/DonationComponent";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="h-fit max-w-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
