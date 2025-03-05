import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/") // Flask API URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData("⚠️ Failed to fetch data from backend!");
      });
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary">{data || "Hello, Flask is Running!"}</h1>
      <button 
        onClick={() => window.location.reload()} 
        className="btn btn-primary mt-3"
      >
        Refresh Data
      </button>
    </div>
  );
}

export default App;
