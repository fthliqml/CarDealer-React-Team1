import CarList from "@/components/CarProduct/CarList";
import Container from "@/components/ui/container";

import useFetchCars from "@/hooks/useFetchAllCars";

function CarProduct() {
  const limit = 20;
  const { cars, loading } = useFetchCars(limit, 0);

  return (
    <Container>
      <CarList cars={cars} />
    </Container>
  );
}

export default CarProduct;
