import Car from "@/components/CarProduct/Car";

const CarList = ({ cars }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {cars.map((car) => (
        <Car key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
