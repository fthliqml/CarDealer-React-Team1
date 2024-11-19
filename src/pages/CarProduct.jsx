import CarList from "@/components/CarProduct/CarList";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/container";
import Pagination from "@/components/CarProduct/Pagination";

import useFetchCars from "@/hooks/useFetchAllCars";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CarProduct() {
  const limit = 12;
  const [page, SetPage] = useState(1);
  const offset = (page - 1) * limit;

  const { cars, loading, error, totalData } = useFetchCars(limit, offset);

  const totalPages = Math.ceil(totalData / limit);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-car");
  };

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
          <>
            <button
              onClick={handleNavigate}
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4 ms-5"
            >
              Go to Create Car Form
            </button>
            <CarList cars={cars} />
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onSetPage={SetPage}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default CarProduct;
