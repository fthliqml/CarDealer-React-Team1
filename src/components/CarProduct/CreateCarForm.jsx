import { useState, useRef } from "react";
import apiInstance from "@/api/apiInstance";
import { Button } from "../ui/button";
import MyAlert from "../ui/myAlert";

const CreateCarForm = ({onCarCreated}) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    size: "",
    year: "",
  });

  const [alert, setAlert] = useState({
    title: "",
    description: "",
    variant: "default",
  });

  const [showAlert, setShowAlert] = useState(false);

  const alertRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!formData.name || !formData.model || !formData.size || !formData.year) {
      setAlert({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setShowAlert(true);
      return;
    }

    try {
      const res = await apiInstance.post("/cars", formData, {
        withCredentials: true,
      });

      if (res.data.isSuccess) {
        setAlert({
          title: "Success",
          description: "Car created successfully",
          variant: "success",
        });
  
        setFormData({
          name: "",
          model: "",
          size: "",
          year: "",
        }); // Reset form
        // Notify parent component about the new car
        if (onCarCreated) {
            onCarCreated(res.data.data.car);
          }
      } else {
        setAlert({
          title: "Error",
          description: "Failed to create car.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        title: "Error",
        description: err.response?.data?.message || "Failed to create car.",
        variant: "destructive",
      });
    } finally {
      setShowAlert(true); // Show the alert
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full mt-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium">
          Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="block w-full mt-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="size" className="block text-sm font-medium">
          Size
        </label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="block w-full mt-1 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium">
          Year
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="block w-full mt-1 border rounded"
        />
      </div>
      <Button type="submit" className="bg-green-500 w-full">
        Create Car
      </Button>

      {/* Alert Message */}
      {showAlert && (
        <MyAlert
          ref={alertRef}
          title={alert.title}
          description={alert.description}
          variant={alert.variant}
          className="absolute top-96 left-1/2 transform -translate-x-1/2 w-1/3 animate-slide-in"
        />
      )}
    </form>
  );
};

export default CreateCarForm;
