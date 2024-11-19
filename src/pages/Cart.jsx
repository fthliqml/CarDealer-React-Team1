import CartItem from "@/components/Cart/cartItem";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { authError } = useUser();
  const { storedCart } = useCart();
  const navigate = useNavigate();

  if (authError) navigate("/login");
  return (
    <>
      <Navbar />
      <Container className={"mt-24"}>
        {storedCart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <Button
          variant="destructive"
          className="px-6 ms-5 my-5"
          onClick={() => navigate("/cars")}
        >
          Back
        </Button>
      </Container>
    </>
  );
};

export default Cart;
