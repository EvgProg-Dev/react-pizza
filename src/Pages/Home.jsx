import { useContext, useEffect, useState } from "react";

import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
    const { searchValue } = useContext(SearchContext);
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: "популярности ▼",
        sortProperty: "-rating",
        order: "desc",
    });
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.order;
    const search = searchValue ? `&search=${searchValue}` : "";

    console.log(searchValue);
    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://66a22dd1967c89168f1f1755.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
        // window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

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
                        ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                        : items.map((item) => (
                              <PizzaBlock key={item.id} {...item} />
                          ))}
                </div>
                <Pagination onChangePage={(page) => setCurrentPage(page)} />
            </div>
        </>
    );
};
