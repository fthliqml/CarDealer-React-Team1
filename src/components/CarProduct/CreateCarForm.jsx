import { useState, useRef } from "react";
import apiInstance from "@/api/apiInstance";
import { Button } from "../ui/button";
import MyAlert from "../ui/myAlert";
import FormField from "../CarProduct/FormField";
import IconUser from "../CarProduct/IconUser";
import useAlert from "../CarProduct/useAlert";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 py-0 rounded-lg shadow-lg max-w-md mx-auto mt-24 mb-28">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 py-20">
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
          className="w-full py-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Car
        </Button>

        {showAlert && (
          <MyAlert
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1/3 animate-slide-in"
          />
        )}
      </form>
    </div>
  );
};

export default CreateCarForm;
