import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/login";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
