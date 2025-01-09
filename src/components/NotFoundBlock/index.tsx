import React, { FC } from "react";

import { Link } from "react-router-dom";
import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock: FC = () => {
    return (
        <div className={style.root}>
            <h1>
                <span>😢</span>
                <br />
                Ничего не найдено.
            </h1>
            <p>
                К сожалению, запрашиваемая страница на нашем сайте отсутствует.
                <br />
                Возможно, она была удалена или её адрес изменился.
            </p>
            <h3>
                Вернутся на <Link to={'/'}>главную</Link>.
            </h3>
        </div>
    );
};
