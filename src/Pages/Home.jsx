import QueryString from "qs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { changeCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import { Categories } from "../components/Categories/Categories";
import { list, Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { activeCategory, activeSort, activeCurrentPage } = useSelector(
        (state) => state.filter
    );
    const searchValue = useSelector((state) => state.search.searchValue);
    const { items, status } = useSelector((state) => state.pizza);

    const onChangePage = (page) => {
        dispatch(changeCurrentPage(page));
    };

    const getPizzas = async () => {
        const category =
            activeCategory > 0 ? `&category=${activeCategory}` : "";
        const sortBy = activeSort.sortProperty.replace("-", "");
        const order = activeSort.order;
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(
            fetchPizzas({ category, sortBy, order, search, activeCurrentPage })
        );
    };

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(
                window.location.search.substring(1)
            );

            const sort = list.find((obj) => obj.sortProperty === params.sort);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [activeCategory, activeSort, searchValue, activeCurrentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = QueryString.stringify({
                sort: activeSort.sortProperty,
                category: activeCategory,
                page: activeCurrentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [activeCategory, activeSort, activeCurrentPage]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status === "error" ? (
                    <div className="cart cart--empty">
                        <h2>Произошла ошибка 😕</h2>
                        <p>
                            Вероятней всего, сайт временно не работает.
                            <br />
                            Повторите попытку позже.
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === "loading"
                            ? [...new Array(4)].map((_, i) => (
                                  <Skeleton key={i} />
                              ))
                            : items.map((item) => (
                                  <PizzaBlock key={item.id} {...item} />
                              ))}
                        <Pagination
                            activeCurrentPage={activeCurrentPage}
                            onChangePage={onChangePage}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
