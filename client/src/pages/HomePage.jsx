import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DonationComponent from "../components/DonationComponent";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <DonationComponent />
      <Footer />
    </div>
  );
};

export default HomePage;
