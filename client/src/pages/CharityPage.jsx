import { React, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import fetchData from "../utils/data";
import CharityDisplay from "../components/CharityDisplay";
const CharityPage = () => {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const loadCharities = async () => {
      const data = await fetchData();
      if (data) {
        setDataSet(data);
      }
    };
    loadCharities();
  }, []);

  console.log(dataSet);

  // console.log(dataSet[0].address);

  return (
    <div>
      <Navbar />
      <CharityDisplay />
    </div>
  );
  
};

export default CharityPage;
