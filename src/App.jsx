import { useEffect, useState } from "react";
import { Categories } from "./components/Categories/Categories";
import { Header } from "./components/Header/Header";
import { PizzaBlock } from "./components/PizzaBlock/PizzaBlock";
import { Sort } from "./components/Sort/Sort";
import "./scss/app.scss";

export const App = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://66a22dd1967c89168f1f1755.mockapi.io/items")
            .then((res) => res.json())
            .then((json) => setItems(json));
    }, []);

    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />

                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((pizza) => (
                            <PizzaBlock key={pizza.id} {...pizza} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
