import React, { Fragment } from 'react'
import LoadProductsImage from './LoadProductsImage';
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper"
import { isAuthenticated } from '../auth/helper';
import { useNavigate } from "react-router-dom"

const Card = ({ product,
    index,
    showAddToCart = true,
    showRemoveFromCart = false,
    className = "",
    reload = undefined,
    setReload = f => f
}) => {

    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;
    const navigate = useNavigate()


    const addToCart = async (userId, token, product) => {
        await addItemToCart(userId, token, product)
        await navigate("/user/cart");
    }

    const displayProductsCard = () => {
        const description = product.desc.split("\n")
        return (
            <div className={`card border rounded border-info p-2 ${className}`} >
                <LoadProductsImage productId={product._id} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="card-text">
                        <ul>
                            {
                                description.map((des, index) => (
                                    <li key={index}>{des}</li>
                                ))
                            }
                        </ul>
                        <h6 className="text-primary mx-4"><span className='badge bg-dark me-2'>Price</span> {product.price} <i className="fas fa-rupee-sign"></i> Only
                        </h6>

                    </div>
                </div>
                <div className="mb-2">
                    {
                        showAddToCart &&
                        (<button
                            className="btn btn-block col-10 offset-1 btn-primary" onClick={() => addToCart(userId, token, {
                                product: product._id,
                                user: userId,
                                name: product.name,
                                count: 1,
                                price: product.price
                            })}  > <i className="fa-solid fa-cart-shopping px-2" ></i> Add To Cart</button>)
                    }
                </div>
            </div >
        )
    }

    return (
        <Fragment>
            {displayProductsCard()}
        </Fragment>
    )
}

export default Card