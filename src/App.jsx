import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import "./scss/app.scss";
import { Cart } from "./Pages/Cart";
import { useState } from "react";

export const App = () => {
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />

            <div className="content">

                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

            </div>
        </div>
    );
};
