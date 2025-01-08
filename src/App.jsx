import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import "./scss/app.scss";
import { Cart } from "./Pages/Cart";
import { PizzaInfo } from "./Pages/PizzaInfo";
import { MainLayout } from "./layouts/MainLayout";

export const App = () => {
    return (
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pizza/:id" element={<PizzaInfo />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
    );
};
