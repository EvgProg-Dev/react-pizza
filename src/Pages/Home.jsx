import { useEffect, useState } from "react";

import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";

export const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating",
        order: "asc",
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://66a22dd1967c89168f1f1755.mockapi.io/items?${
                categoryId > 0 ? `category=${categoryId}` : ""
            }&sortBy=${sortType.sortProperty.replace("-", "")}&order=${
                sortType.order
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        value={categoryId}
                        onChangeCategory={(id) => setCategoryId(id)}
                    />
                    <Sort
                        value={sortType}
                        onChangeSort={(id) => setSortType(id)}
                    />
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
