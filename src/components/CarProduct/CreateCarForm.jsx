import { useState, useRef } from "react";
import apiInstance from "@/api/apiInstance";
import { Button } from "../ui/button";
import MyAlert from "../ui/myAlert";
import FormField from "../CarProduct/FormField";
import IconUser from "../CarProduct/IconUser";
import useAlert from "../CarProduct/useAlert";
import { useNavigate } from "react-router-dom";
import FormBackground from "../Register/FormBackground";

const CreateCarForm = ({ onCarCreated }) => {
  const { alert, showAlert, triggerAlert } = useAlert();

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    size: "",
    year: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      triggerAlert({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await apiInstance.post("/cars", formData, {
        withCredentials: true,
      });

      if (res.data.isSuccess) {
        triggerAlert({
          title: "Success",
          description: "Car created successfully",
          variant: "success",
        });

        setFormData({ name: "", model: "", size: "", year: "" }); // Reset form

        if (onCarCreated) {
          onCarCreated(res.data.data.car);
        }

        setTimeout(() => {
          navigate("/cars");
        }, 3000);
      } else {
        triggerAlert({
          title: "Error",
          description: "Failed to create car.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      triggerAlert({
        title: "Error",
        description: err.response?.data?.message || "Failed to create car.",
        variant: "destructive",
      });
    }
  };
const IconCar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#5f6368"
    className="w-14 h-14 text-gray-500 dark:text-gray-400"
  >
    <path d="M240-200q-50 0-85-35t-35-85H40v-360q0-33 23.5-56.5T120-760h560l240 240v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm360-360h160L640-680h-40v120Zm-240 0h160v-120H360v120Zm-240 0h160v-120H120v120Zm120 290q21 0 35.5-14.5T290-320q0-21-14.5-35.5T240-370q-21 0-35.5 14.5T190-320q0 21 14.5 35.5T240-270Zm480 0q21 0 35.5-14.5T770-320q0-21-14.5-35.5T720-370q-21 0-35.5 14.5T670-320q0 21 14.5 35.5T720-270ZM120-400h32q17-18 39-29t49-11q27 0 49 11t39 29h304q17-18 39-29t49-11q27 0 49 11t39 29h32v-80H120v80Zm720-80H120h720Z" />
  </svg>
);

return (
  <>
    <div className="relative min-h-screen flex flex-col overflow-y-auto">
      <FormBackground />
      <div className="bg-gray-100 relative dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24 mb-24">
        <div className="flex justify-center mb-4">
          <IconCar />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Create Your Car Entry
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Fill out the form below to add a new car to your collection.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
          {["name", "model", "size", "year"].map((field) => (
            <FormField
              key={field}
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              icon={<IconUser />}
            />
          ))}

          <Button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            Create Car
          </Button>

          {showAlert && (
            <MyAlert
              title={alert.title}
              description={alert.description}
              variant={alert.variant}
              className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-1/2 max-w-xl animate-slide-in"
            />
          )}
        </form>
      </div>
    </div>
  </>
);


};

export default CreateCarForm;
