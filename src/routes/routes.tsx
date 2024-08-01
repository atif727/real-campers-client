import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { userRoutes } from "./user.routes";
import ErrorPage from "../pages/error.page";
import Signup from "../pages/authentication/Signup";
import Signin from "../pages/authentication/Signin";
import Product from "../pages/shop/Product";
import ProductEdit from "../pages/Dashboard/ProductEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: userRoutes,
    errorElement: <ErrorPage />,
  },
  { path: "/shop/:prodid", element: <Product />, errorElement: <ErrorPage /> },
  { path: "/dashboard/:prodid", element: <ProductEdit />, errorElement: <ErrorPage /> },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export default router;
