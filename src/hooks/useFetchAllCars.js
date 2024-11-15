import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetchCars = (limit, offset) => {
  const [cars, setCars] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/cars?limit=${limit}&offset=${offset}`,
          { withCredentials: true }
        );
        const data = res.data;
        if (data.isSuccess) {
          const cars = data.data.cars;
          const totalData = data.data.totalData;
          setCars(cars);
          setTotalData(totalData);
        }
      } catch (err) {
        if (err.status === 401) {
          return navigate("/login");
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();

    // Auto scroll to top page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [limit, offset, navigate]);

  return { cars, totalData, loading };
};

export default useFetchCars;
