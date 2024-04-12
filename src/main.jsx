import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/themeprovider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";

import { inject } from "@vercel/analytics";

inject({
  mode: window.location.hostname === "localhost" ? "development" : "production",
});

const routes = [{ path: "/", element: <Home /> }];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
