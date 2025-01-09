import QueryString from "qs";
import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { changeCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import { Categories } from "../components/Categories/Categories";
import { Sort, list } from "../components/Sort/Sort";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import { RootState, useAppDispatch } from "../redux/store";

export const Home: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { category, page, sort, searchValue } = useSelector(
        (state: RootState) => state.filter
    );

    const { items, status } = useSelector((state: RootState) => state.pizza);

    const onChangePage = (page: number) => {
        dispatch(changeCurrentPage(page));
    };

    const getPizzas = async () => {
        const categoryActive = category > 0 ? `&category=${category}` : "";
        const sortBy = sort.sortProperty.replace("-", "");
        const order = sort.order;
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(fetchPizzas({ categoryActive, sortBy, order, search, page }));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(
                window.location.search.substring(1)
            );

            const sort =
                list.find((obj) => obj.sortProperty === params.sort) || list[0];

            dispatch(
                setFilters({
                    category: params.category ? Number(params.category) : 0,
                    page: params.page ? Number(params.page) : 1,
                    sort,
                    searchValue:
                        typeof params.search === "string" ? params.search : "",
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
    }, [category, sort, searchValue, page]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = QueryString.stringify({
                sort: sort.sortProperty,
                category: category,
                page: page,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [category, sort, page]);

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
                    <>
                        <div className="content__items">
                            {status === "loading"
                                ? [...new Array(4)].map((_, i) => (
                                      <Skeleton key={i} />
                                  ))
                                : items.map((item: any) => (
                                      <PizzaBlock key={item.id} {...item} />
                                  ))}
                        </div>
                        <Pagination
                            activeCurrentPage={page}
                            onChangePage={onChangePage}
                        />
                    </>
                )}
            </div>
        </>
    );
};
