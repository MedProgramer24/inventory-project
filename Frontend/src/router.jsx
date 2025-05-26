import { createBrowserRouter, Navigate } from "react-router-dom";

import DashBoardLayout from "./pages/dashboard/DashBoardLayout";
import LoginScreen from "./pages/login/LoginScreen";
import SignupScreen from "./pages/login/SignupScreen";
import DashBoardScreen from "./pages/dashboard/DashBoardScreen";

import AuthLayout from "./pages/login/AuthLayout";
import InventoryFormScreen from "./pages/InventoryFormScreen";
import ProductInfoScreen from "./pages/product/ProductInfoScreen";
import AddNewProductScreen from "./pages/product/AddNewProductScreen";
import ProductEditScreen from "./pages/product/ProductEditScreen";
import PrductsScreen from "./pages/product/ProductsScreen";
import LocationsScreen from "./pages/locations/LocationsScreen";
import NewLocationScreen from "./pages/locations/NewLocationScreen";
import EditLocationScreen from "./pages/locations/EditLocationScreen";

import BrandsScreen from "./pages/brands/BrandsScreen";
import NewBrandsScreen from "./pages/brands/NewBrandsScreen";
import EditBrandsScreen from "./pages/brands/EditBrandsScreen";
import UserManagementScreen from "./pages/users/UserManagementScreen";
import ProductHistoryScreen from "./pages/product/ProductHistoryScreen";

const router = createBrowserRouter([
  // Redirect from "/" to "/auth"
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },

  {
    path: "/DashBoard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardScreen />,
      },
      {
        path: "add-product",
        element: <InventoryFormScreen />,
      },
      {
        path: "products/:id",
        element: <ProductInfoScreen />,
      },
      {
        path: "products/:id/edit",
        element: <ProductEditScreen />,
      },

      // new routes under /DashBoard (relative paths)
      {
        path: "products",
        element: <PrductsScreen />,
      },
      {
        path: "products/new",
        element: <AddNewProductScreen />,
      },
      {
        path: "products/edit/:id",
        element: <ProductEditScreen />,
      },
      {
        path: "products/history/:id",
        element: <ProductHistoryScreen />,
      },

      // brands
      {
        path: "brands",
        element: <BrandsScreen />,
      },
      {
        path: "brands/new",
        element: <NewBrandsScreen />,
      },
      {
        path: "brands/edit/:id",
        element: <EditBrandsScreen />,
      },

      // locations
      {
        path: "locations",
        element: <LocationsScreen />,
      },
      {
        path: "locations/new",
        element: <NewLocationScreen />,
      },
      {
        path: "locations/edit/:id",
        element: <EditLocationScreen />,
      },

      // users
      {
        path: "users",
        element: <UserManagementScreen />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginScreen />,
      },
      {
        path: "signup",
        element: <SignupScreen />,
      },
    ],
  },
]);

export default router;

export const SERVER_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_LOCAL
    : import.meta.env.VITE_SERVER;
