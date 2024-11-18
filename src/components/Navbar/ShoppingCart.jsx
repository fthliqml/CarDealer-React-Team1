import { useCart } from "@/contexts/cartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ShoppingCart = () => {
  const { cart } = useCart();

  return (
    <button
      type="button"
      className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View Cart</span>
      <div className="flex">
        <ShoppingCartIcon aria-hidden="true" className="size-6" />
        <span>{cart.length}</span>
      </div>
    </button>
  );
};

export default ShoppingCart;
