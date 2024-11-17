import CarList from "@/components/CarProduct/CarList";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/container";

import useFetchCars from "@/hooks/useFetchAllCars";

function CarProduct() {
  const limit = 20;
  const { cars, loading } = useFetchCars(limit, 0);

  return (
    <>
      <Navbar />
      <Container className={"mt-24"}>
        <CarList cars={cars} />
      </Container>
    </>
  );
}

export default CarProduct;
