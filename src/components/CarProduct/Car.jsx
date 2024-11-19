import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useEffect, useRef, useState } from "react";
import MyAlert from "../ui/myAlert";
import apiInstance from "@/api/apiInstance";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/AuthContext";
import roleCheck from "@/utils/roleCheck";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addToCart, deleteFromCart, storedCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    description: "",
    variant: "default",
  });
  const alertRef = useRef(null);
  const confirmRef = useRef(null);
  const [carData, setCarData] = useLocalStorageState("", "car data");

  useEffect(() => {
    const isAddedToStoredCart = storedCart.some(
      (storedItem) => storedItem.id === car.id
    );
    if (isAddedToStoredCart) setIsAddedToCart(true);
  }, [car.id, storedCart]);

  const date = car?.createdAt
    ? new Date(car.createdAt).toLocaleString("id-ID")
    : "Tanggal tidak tersedia";

  const handleCart = () => {
    isAddedToCart ? deleteFromCart(car) : addToCart(car);
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

  const updateCar = async () => {
    await setCarData(car);
    navigate("/update");
  };

  const confirmDelete = async () => {
    try {
      await apiInstance.delete(`/cars/${car.id}`, { withCredentials: true });
      setAlert({
        title: "Success",
        description: "Car deleted successfully.",
        variant: "success",
      });
      navigate(0);
    } catch (error) {
      console.log(error);
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

        <Button
          className={`mt-4 w-full ${
            isAddedToCart
              ? "bg-yellow-500 hover:bg-yellow-700"
              : "bg-[#5e8979] hover:bg-[#16423C]"
          }`}
          onClick={handleCart}
        >
          {isAddedToCart ? "Delete from cart" : "Add to cart"}
        </Button>
        {roleCheck(user?.role, ["admin", "superadmin"]) && (
          <>
            <Button className={`mt-4 w-full bg-red-500`} onClick={deleteCar}>
              Delete car permanently
            </Button>
            <Button className={`mt-4 w-full bg-blue-500`} onClick={updateCar}>
              Update car
            </Button>
          </>
        )}
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
