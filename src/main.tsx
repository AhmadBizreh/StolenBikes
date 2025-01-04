import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./services/Routing";
import QueryProvider from "./components/QueryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <Routing />
    </QueryProvider>
  </React.StrictMode>
);
