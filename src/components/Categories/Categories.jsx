import { useState } from "react";

export const Categories = () => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    const [activeIndex, setActiveActive] = useState(0);

    const onClickCategory = (index) => {
        setActiveActive(index);
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => (
                    <li
                        onClick={() => onClickCategory(i)}
                        className={activeIndex === i ? "active" : ""}
                        key={i}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};
