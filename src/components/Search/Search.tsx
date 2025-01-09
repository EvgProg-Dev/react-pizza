import style from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { changeSearch } from "../../redux/slices/filterSlice";
import React, { ChangeEventHandler, FC, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

export const Search: FC = () => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearchValue = useCallback(
        debounce((value) => {
            dispatch(changeSearch(value));
        }, 1000),
        [dispatch]
    );

    const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    const onClickClear = () => {
        dispatch(changeSearch(""));
        setValue("");

        inputRef.current?.focus();
    };

    return (
        <div className={style.root}>
            <svg
                className={style.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="512"
                height="512"
            >
                <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </svg>

            <input
                ref={inputRef}
                className={style.input}
                value={value}
                onChange={onChangeInput}
                type="text"
                placeholder="Поиск..."
            />

            {value && (
                <svg
                    onClick={onClickClear}
                    className={style.clearIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                >
                    <path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z" />
                </svg>
            )}
        </div>
    );
};