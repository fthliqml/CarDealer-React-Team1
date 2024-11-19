import { createContext, useContext, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [storedCart, setStoredCart] = useState([]);

  function addToCart(item) {
    setStoredCart((prevArr) => [...prevArr, item]);
  }

  function deleteFromCart(item) {
    setStoredCart((prevArr) =>
      prevArr.filter((storedItem) => storedItem.id !== item.id)
    );
  }

  return (
    <cartContext.Provider value={{ addToCart, deleteFromCart, storedCart }}>
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
