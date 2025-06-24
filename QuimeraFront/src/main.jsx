import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "antd/dist/reset.css";

import { ButtonProvider } from "./context/Autorization/Autorização.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import RoutesComponent from "./routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ButtonProvider>
      <BrowserRouter>
        <ConfigProvider>
          <ErrorBoundary>
            <RoutesComponent />
          </ErrorBoundary>
        </ConfigProvider>
      </BrowserRouter>
    </ButtonProvider>
  </React.StrictMode>
);
