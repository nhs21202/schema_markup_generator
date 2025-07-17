import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@shopify/polaris/build/esm/styles.css";

import { AppProvider } from "@shopify/polaris";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider i18n={{}}>
      <App />
    </AppProvider>
  </StrictMode>
);
