import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import CarProduct from "./pages/CarProduct";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
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
