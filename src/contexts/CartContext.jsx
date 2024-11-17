import { createContext, useContext, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(cartContext);
  if (!context) throw new Error("Context used outside provider");

  return context;
};

export { CartProvider, useCart };
