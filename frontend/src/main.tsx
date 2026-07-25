import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./il8n";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
