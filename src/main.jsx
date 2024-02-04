import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { inject } from "@vercel/analytics";

inject({
  mode: window.location.hostname === "localhost" ? "development" : "production",
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
