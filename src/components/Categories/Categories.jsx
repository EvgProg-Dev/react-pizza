import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/slices/filterSlice";


export const Categories = () => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    const dispatch = useDispatch();

    const activeCategory = useSelector((state) => state.filter.activeCategory);


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
