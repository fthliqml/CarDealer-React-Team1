import Car from "@/components/CarProduct/Car";

const CarList = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-7 gap-y-10 justify-items-center">
      {cars.map((car) => (
        <Car key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
