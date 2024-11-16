// import { StrictMode } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <App />
  // <StrictMode>
  // </StrictMode>
);
