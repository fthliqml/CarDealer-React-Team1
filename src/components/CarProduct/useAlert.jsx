import { useState } from "react";

const useAlert = (initialState = { title: "", description: "", variant: "default" }) => {
  const [alert, setAlert] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = (newAlert, duration = 3000) => {
    setAlert(newAlert);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), duration);
  };

  return { alert, showAlert, triggerAlert };
};

export default useAlert;
