import axios from 'axios';

const charityData_URL = "http://localhost:3000/CharityData/charities";

export const createCharity = async (charity) => {
  return await axios.post(charityData_URL, charity)
};
