import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LabelProvider } from "./context/label.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LabelProvider>
      <App />
    </LabelProvider>
  </StrictMode>
);
