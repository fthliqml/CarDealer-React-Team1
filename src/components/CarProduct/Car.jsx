import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const CarCard = ({ car }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cart, setCart] = useState([]);

  const date = car?.createdAt
    ? new Date(car.createdAt).toLocaleString("id-ID")
    : "Tanggal tidak tersedia";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const isCarInCart = storedCart.some((item) => item.id === car.id);
    setIsAddedToCart(isCarInCart);
  }, [car.id]);

  const handleCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (isAddedToCart) {
      const updatedCart = storedCart.filter((item) => item.id !== car.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const updatedCart = [...storedCart, car];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }

    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={car.image} alt="car" />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{car.name}</h2>

        <p className="mt-2 text-gray-600 text-sm">{car.model}</p>

        <p className="mt-2 text-green-600 font-bold">{car.size}</p>

        <p className="mt-1 text-gray-500 text-xs">Dibuat pada: {date}</p>

        <Button
          className={`mt-4 w-full ${
            isAddedToCart ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={handleCart}
        >
          {isAddedToCart ? "Delete" : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
