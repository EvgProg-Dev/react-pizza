import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";

interface Pizza {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[];
}

export const PizzaInfo: FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<Pizza>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(
                    `https://66a22dd1967c89168f1f1755.mockapi.io/items/${id}`
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка получения данных!');
                navigate('/')
            }
        };

        fetchPizza();
    }, []);

    if (!pizza) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pizza-info__wrapper">
            <PizzaBlock {...pizza} />
        </div>
    );
};

