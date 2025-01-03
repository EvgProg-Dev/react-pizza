import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import "./scss/app.scss";
import { Cart } from "./Pages/Cart";

export const App = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};
