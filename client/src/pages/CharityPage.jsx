import { React, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import fetchData from "../utils/data";

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

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default CharityPage;
