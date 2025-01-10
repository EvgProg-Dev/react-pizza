import { CartItem } from "./../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) =>
    items.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
