import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import main pages
import App from "./App";
import ProductExperience from "./pages/ProductExperience";
import Writing from "./pages/Writing";
import Travels from "./pages/Travels";
import Work from "./pages/Work";

// Layout with header + smooth scroll
import Layout from "./components/Layout";

// Global styles
import "./index.css";

// ✅ Router setup
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/product-experience", element: <ProductExperience /> },
      { path: "/writing", element: <Writing /> },
      { path: "/travels", element: <Travels /> },
      // {
//   path: "/work",
//   element: <Work />,
// },
    ],
  },
]);

// ✅ Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);