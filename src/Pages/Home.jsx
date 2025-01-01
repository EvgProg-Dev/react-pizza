import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeCurrentPage } from "../redux/slices/filterSlice";

import { Categories } from "../components/Categories/Categories";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";



export const Home = () => {
    const dispatch = useDispatch()
    const { activeCategory, activeSort, activeCurrentPage } = useSelector((state) => state.filter);
    const searchValue = useSelector((state) => state.search.searchValue);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangePage = (page) => {
        dispatch(changeCurrentPage(page))
    }

    const category = activeCategory > 0 ? `&category=${activeCategory}` : "";
    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.order;
    const search = searchValue ? `&search=${searchValue}` : "";

    useEffect(() => {
        setIsLoading(true);
        axios.get(
            `https://66a22dd1967c89168f1f1755.mockapi.io/items?page=${activeCurrentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then(res => {
            setItems(res.data);
            setIsLoading(false);
        })
        // window.scrollTo(0, 0);
    }, [activeCategory, activeSort, searchValue, activeCurrentPage]);

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
                        ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                        : items.map((item) => (
                              <PizzaBlock key={item.id} {...item} />
                          ))}
                </div>
                <Pagination activeCurrentPage={activeCurrentPage} onChangePage={onChangePage} />
            </div>
        </>
    );
};
