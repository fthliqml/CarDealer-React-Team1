import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { storedCart } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/cart")}
      type="button"
      className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View Cart</span>
      <div className="flex">
        <ShoppingCartIcon aria-hidden="true" className="size-6" />
        <span>{storedCart.length}</span>
      </div>
    </button>
  );
};

export default ShoppingCart;
