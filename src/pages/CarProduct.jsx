import CarList from "@/components/CarProduct/CarList";

import useFetchCars from "@/hooks/useFetchAllCars";

function CarProduct() {
  const limit = 20;
  const { cars, loading } = useFetchCars(limit, 0);

  return (
    <div className="container mx-auto py-4">
      <CarList cars={cars} />
    </div>
  );
}

export default CarProduct;
