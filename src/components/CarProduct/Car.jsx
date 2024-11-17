import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cartContext";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useEffect, useRef, useState } from "react";
import MyAlert from "../ui/myAlert";
import apiInstance from "@/api/apiInstance";

const CarCard = ({ car }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    description: "",
    variant: "default",
  });
  const alertRef = useRef(null);
  const confirmRef = useRef(null);

  const date = car?.createdAt
    ? new Date(car.createdAt).toLocaleString("id-ID")
    : "Tanggal tidak tersedia";

  const handleCart = () => {
    isAddedToCart
      ? setCart((prevArr) => prevArr.filter((item) => item.id !== car.id))
      : setCart((prevArr) => [...prevArr, car]);

    setIsAddedToCart((prev) => !prev);
  };

  function showAlert() {
    alertRef.current.classList.remove("hidden", "animate-slide-out");
    alertRef.current.classList.add("animation-slide-in");

    setTimeout(hideAlert, 2000);
  }

  function hideAlert() {
    alertRef.current.classList.remove("animation-slide-in");
    alertRef.current.classList.add("animate-slide-out");

    setTimeout(() => {
      alertRef.current.classList.add("hidden");
    }, 650);
  }

  const deleteCar = async () => {
    setIsConfirming(true);
  };

  const confirmDelete = async () => {
    try {
      await apiInstance.delete(`/cars/${car.id}`, { withCredentials: true });
      setAlert({
        title: "Success",
        description: "Car deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      console.log("error");
      setAlert({
        title: "Error",
        description: "Failed to delete the car.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsConfirming(false);
      setTimeout(() => {
        showAlert();
      }, 100);
    }
  };

  const cancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <div className="w-[90%] md:w-96 lg:w-80 xl:w-96 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full h-72 object-cover" src={car.image} alt="car" />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{car.name}</h2>

        <p className="mt-2 text-gray-600 text-sm">{car.model}</p>

        <p className="mt-2 text-[#16423C] font-bold">
          {capitalizeFirstLetter(car.size)}
        </p>

        <p className="mt-1 text-gray-500 text-xs">Dibuat pada: {date}</p>

        <Button className={`mt-4 w-full bg-green-500`} onClick={handleCart}>
          Add
        </Button>
        <Button className={`mt-4 w-full bg-red-500`} onClick={deleteCar}>
          Delete
        </Button>
      </div>
      {isConfirming && (
        <MyAlert
          ref={confirmRef}
          title="Confirmation"
          description="Do you want to delete this car?"
          variant="default"
          className={`absolute top-96 left-1/2 transform -translate-x-1/2 w-1/3 animate-slide-in`}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={confirmDelete} className="bg-green-500">
              Yes, Delete
            </Button>
            <Button onClick={cancelDelete} className="bg-red-500">
              Cancel
            </Button>
          </div>
        </MyAlert>
      )}
      <MyAlert
        ref={alertRef}
        title={alert.title}
        description={alert.description}
        variant={alert.variant}
        className={`absolute top-96 left-1/2 transform -translate-x-1/2 w-1/3 animate-slide-in hidden`}
      />
    </div>
  );
};

export default CarCard;
