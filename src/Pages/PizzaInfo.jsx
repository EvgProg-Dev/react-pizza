import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";

export const PizzaInfo = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(
                    `https://66a22dd1967c89168f1f1755.mockapi.io/items/${id}`
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка получения данных!', error);
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


// 37 24