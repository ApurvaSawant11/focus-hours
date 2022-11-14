import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import App from "./App";
import { TaskDataProvider, TaskModalToggle } from "context";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskDataProvider>
        <TaskModalToggle>
          <App />
        </TaskModalToggle>
      </TaskDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
