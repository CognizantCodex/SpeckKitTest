import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppProviders } from "./providers";
import "../styles/app.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found.");
}

createRoot(root).render(
  <AppProviders>
    <App />
  </AppProviders>
);
