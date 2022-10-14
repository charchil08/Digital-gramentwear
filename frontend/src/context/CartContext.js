// import { createContext, useContext, useState } from "react";
// import { loadItemsFromCart } from "../core/helper/cartHelper";

import { createContext, useState } from "react";
import { loadItemsFromCart } from "../core/helper/cartHelper";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const loadCartProducts = () => {
        setCartProducts(loadItemsFromCart())
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, loadCartProducts }}>
            {children}
        </CartContext.Provider>
    )
}