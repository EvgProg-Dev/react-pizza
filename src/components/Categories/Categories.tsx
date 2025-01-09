import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";


export const Categories: FC = () => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    const dispatch = useDispatch();

    const activeCategory = useSelector(
        (state: RootState) => state.filter.activeCategory
    );

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        onClick={() => dispatch(changeCategory(i))}
                        className={activeCategory === i ? "active" : ""}
                        key={i}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};
