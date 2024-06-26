import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";
import Survey from "./routes/survey";
// import Console from "./routes/console";

import { inject } from "@vercel/analytics";

inject({
  mode: window.location.hostname === "localhost" ? "development" : "production",
});

const routes = [
  { path: "/*", element: <Home /> },
  { path: "/experiment", element: <Survey /> },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
