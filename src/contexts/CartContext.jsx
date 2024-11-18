import useLocalStorageState from "@/hooks/useLocalStorageState";
import { createContext, useContext, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorageState([], "cart");
  const [cart, setCart] = useState(storedCart);

  function addToCart(item) {
    setCart((prevArr) => [...prevArr, item]);
    setStoredCart((prevArr) => [...prevArr, item]);
  }

  function deleteFromCart(item) {
    setCart((prevArr) =>
      prevArr.filter((storedItem) => storedItem.id !== item.id)
    );
    setStoredCart((prevArr) =>
      prevArr.filter((storedItem) => storedItem.id !== item.id)
    );
  }

  return (
    <cartContext.Provider
      value={{ cart, addToCart, deleteFromCart, storedCart }}
    >
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
