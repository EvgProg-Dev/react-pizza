import { useEffect, useState } from "react";

import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";

export const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://66a22dd1967c89168f1f1755.mockapi.io/items")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
            window.scrollTo(0, 0)
    }, []);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
                        : items.map((item) => (
                              <PizzaBlock key={item.id} {...item} />
                          ))}
                </div>
            </div>
        </>
    );
};
