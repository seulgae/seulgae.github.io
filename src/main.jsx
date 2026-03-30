import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/desktop.css";
import "./styles/appWeb.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
