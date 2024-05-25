import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div className="h-fit max-w-screen flex flex-col bg-white ">
      <Navbar />
      <Hero />
    </div>
  );
};

export default HomePage;
