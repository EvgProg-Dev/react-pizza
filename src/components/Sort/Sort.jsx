import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSort } from "../../redux/slices/filterSlice";

export const list = [
    { name: "популярности ▼", sortProperty: "-rating", order: "desc" },
    { name: "популярности ▲", sortProperty: "rating", order: "asc" },

    { name: "цене ▼", sortProperty: "-price", order: "desc" },
    { name: "цене ▲", sortProperty: "price", order: "asc" },

    { name: "алфавиту ▼", sortProperty: "-title", order: "desc" },
    { name: "алфавиту ▲", sortProperty: "title", order: "asc" },
];

export const Sort = () => {
    const [open, setOpen] = useState(false);
    const sortRef = useRef();

    const dispatch = useDispatch();
    const activeSort = useSelector((state) => state.filter.activeSort);

    const onClickChangeSort = (sortProperty) => {
        dispatch(changeSort(sortProperty));
        setOpen(false);
    };

    useEffect(() => {
        const handleClick = (e) => {
            const path = e.composedPath();
            if (!path.includes(sortRef.current)) {
                setOpen(false);
            }
        };

        document.body.addEventListener("click", handleClick);

        return () => document.body.removeEventListener("click", handleClick);
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width={10}
                    height={6}
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{activeSort.name}</span>
            </div>

            {open && (
                <div className="sort__popup">
                    <ul>
                        {list.map((obj, i) => (
                            <li
                                onClick={() => onClickChangeSort(obj)}
                                className={
                                    activeSort.sortProperty === obj.sortProperty
                                        ? "active"
                                        : ""
                                }
                                key={i}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
