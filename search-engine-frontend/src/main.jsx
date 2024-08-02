import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Search from "./pages/Search.jsx";
import Clustering from "./pages/Clustering.jsx";
import ClusterNewDocuments from "./pages/ClusterNewDocuments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/cluster",
    element: <Clustering />,
  },
  {
    path: "/cluster/new",
    element: <ClusterNewDocuments />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
