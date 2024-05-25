const fetchData = async () => {
  try {
    const charityDataURL = "http://localhost:3000/CharityData/charities";
    const response = await fetch(charityDataURL
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to retrieve data:" + error);
    return null;
  }
};

export default fetchData;
