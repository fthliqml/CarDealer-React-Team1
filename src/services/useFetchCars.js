import apiInstance from "@/api/apiInstance";
import { useUser } from "@/contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetchCars = (limit, offset) => {
  const [cars, setCars] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setIsAuthenticated } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await apiInstance.get(
          `/cars?limit=${limit}&offset=${offset}`,
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
          setIsAuthenticated(false);
        }
        console.log(err);
        setError(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
  }, [limit, offset, setIsAuthenticated, navigate]);

  return { cars, totalData, loading, error };
};

export default useFetchCars;
