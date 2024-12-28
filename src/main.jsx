import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { NotFound } from "./Pages/NotFoundBlock";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
