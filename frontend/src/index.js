import React from "react";
import ReactDOM from 'react-dom/client';
import RoutesApp from "./RoutesApp";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <BrowserRouter>
            <RoutesApp />
        </BrowserRouter>
    </CartProvider>
)