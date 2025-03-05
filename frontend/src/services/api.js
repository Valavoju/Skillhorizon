import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Your Flask backend URL

// Function to fetch data from Flask API
export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
