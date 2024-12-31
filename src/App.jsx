import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import "./scss/app.scss";
import { Cart } from "./Pages/Cart";
import { createContext, useState } from "react";

export const SearchContext = createContext();

export const App = () => {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />

                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
};
