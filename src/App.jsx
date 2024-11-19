import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import CarProduct from "@/pages/CarProduct";
import CreateCarForm from "@/components/CarProduct/CreateCarForm";
import Login from "@/pages/Login";
import UpdateCar from "@/pages/UpdateCar";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cars",
    element: <CarProduct />,
  },
  {
    path: "/create-car",
    element: <CreateCarForm />,
  },
  {
    path: "/update",
    element: <UpdateCar />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
