import CarList from "@/components/CarProduct/CarList";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/container";

import useFetchCars from "@/hooks/useFetchAllCars";

function CarProduct() {
  const limit = 20;
  const { cars, loading, error } = useFetchCars(limit, 0);

  return (
    <>
      <Navbar />
      <Container
        className={error ? "flex justify-center items-center" : "mt-24"}
      >
        {error ? (
          <div
            className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          <CarList cars={cars} />
        )}
      </Container>
    </>
  );
}

export default CarProduct;
