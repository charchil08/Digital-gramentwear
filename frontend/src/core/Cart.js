import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Base from './Base'
import { increaseCartProduct, loadItemsFromCart } from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';

import "react-toastify/dist/ReactToastify.css"
import Card from './Card';
import LoadProductsImage from './LoadProductsImage';
import CardOfCart from './CardOfCart';

const Cart = () => {

    const [cartProducts, setCartProducts] = useState([])
    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;


    useEffect(() => {
        loadItemsFromCart(userId, token).then(data => setCartProducts(data))
    }, [])



    const displayCartItems = () => {
        return (
            cartProducts.map((product) => {
                return (
                    <CardOfCart product={product} key={product._id} />
                )
            })
        )
    }


    return (
        <Base title='Cart Page' desc='Way to checkout... 👉' >
            <div className="row ">
                <div className="col-12 card-group">
                    {
                        displayCartItems()
                    }
                </div>
                <div className="buttons text-center my-2">
                    <button className="btn btn-primary me-2">Buy Now</button>
                    <button className="btn btn-light ms-2 border rounded">Empty cart</button>
                </div>
            </div>
        </Base >
    )
}

export default Cart