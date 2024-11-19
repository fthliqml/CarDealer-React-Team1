import CartItem from "@/components/Cart/cartItem";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { authError } = useUser();
  const { storedCart, resetCart } = useCart();
  const navigate = useNavigate();

  if (authError) navigate("/login");
  return (
    <>
      <Navbar />
      <Container className={"mt-24"}>
        {storedCart.length === 0 ? (
          <h1 className="text-center my-80 text-2xl font-semibold">
            {" "}
            There is no items is added to cart...
          </h1>
        ) : (
          storedCart.map((item) => <CartItem key={item.id} item={item} />)
        )}

        <div className={"flex justify-between"}>
          <Button className="px-6 ms-5 my-5" onClick={() => navigate("/cars")}>
            Back
          </Button>
          {storedCart.length > 0 && (
            <Button
              variant="destructive"
              className="px-6 me-5 my-5"
              onClick={resetCart}
            >
              Reset Cart
            </Button>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cart;
