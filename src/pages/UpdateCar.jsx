import FormBackground from "@/components/Register/FormBackground";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import UpdateHeader from "@/components/UpdateCar/UpdateHeader";
import UpdateNotification from "@/components/UpdateCar/UpdateNotification";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [size, setSize] = useState("");
  const [notification, setNotification] = useState(null);
  const [carData, setCarData] = useLocalStorageState("", "car data");

  if (carData === "") {
    navigate("/cars");
  }

  useEffect(() => {
    setName(carData.name);
    setModel(carData.model);
    setYear(carData.year);
    setSize(carData.size);
  }, []);

  const updateCars = async (name, model, year, size) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/cars/${carData.id}`,
        {
          name,
          model,
          year,
          size,
        },
        { withCredentials: true }
      );

      setNotification({
        type: "success",
        message: response.data.message || "Successfully update",
        description: "you are now redirect to homepage",
      });

      setTimeout(() => {
        setNotification(null);
        localStorage.removeItem("car data");
        navigate("/cars");
      }, 2000);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.response.data.message || "An error occured",
        description: "please try again",
      });
    }
    setTimeout(() => setNotification(null), 2000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCars(name, model, year, size);
  };

  return (
    <>
      <Container className={"flex justify-center items-center"}>
        <div className="absolute top-2 z-10">
          {notification && (
            <UpdateNotification
              type={notification.type}
              message={notification.message}
              description={notification.description}
              onClose={() => setNotification(null)}
            />
          )}
        </div>
        <Card className="w-1/2 backdrop-blur-sm bg-[#E9EFEC]/70">
          <UpdateHeader />
          <form
            className="flex justify-center items-start"
            onSubmit={handleUpdate}
          >
            <div className="w-2/3">
              <div className="mt-3 mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Car Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-3 mb-3">
                <label
                  htmlFor="model"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Model
                </label>
                <div className="mt-2">
                  <input
                    id="model"
                    name="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="px-4 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-3 mb-3">
                <label
                  htmlFor="year"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Year
                </label>
                <div className="mt-2">
                  <input
                    id="year"
                    name="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="px-4 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-3 mb-3">
                <label
                  htmlFor="size"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Size
                </label>
                <div className="mt-2">
                  <input
                    id="size"
                    name="size"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="px-4 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10 mb-14 ">
                <button
                  type="submit"
                  className="w-1/2 h-9 rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Card>
        <FormBackground />
      </Container>
    </>
  );
};

export default UpdateCar;
