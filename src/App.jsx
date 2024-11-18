import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import CarProduct from "./pages/CarProduct";
import Login from "./pages/Login";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
