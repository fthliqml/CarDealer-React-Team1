import CarList from "@/components/CarProduct/CarList";
import CreateCarForm from "@/components/CarProduct/CreateCarForm";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/container";
import { useNavigate } from "react-router-dom"; 
import useFetchCars from "@/hooks/useFetchAllCars";

function CarProduct() {
  const limit = 20;
  const { cars, loading } = useFetchCars(limit, 0);


  const navigate = useNavigate(); 
 const handleNavigate = () => {
  navigate("/create-car");
};

  return (
    <>
      <Navbar />
      <Container className={"mt-24"}>
      <button
          onClick={handleNavigate}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 ml-2"
        >
          Go to Create Car
        </button>
        <CarList cars={cars} />
      </Container>
    </>
  );
}

export default CarProduct;
