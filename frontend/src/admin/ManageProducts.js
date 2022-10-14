import React, { useEffect, useState } from 'react'
import Base from "../core/Base"
import { getAllProducts, removeProduct } from './helper/adminApi';

import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { API } from '../backend';


const ManageProducts = () => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState({
        loading: false,
        error: "",
    })

    const { user, token } = isAuthenticated()
    const imageUrl = `${API}/product/photo/`

    const preloadProducts = () => {
        setStatus({ error: "", loading: true })
        getAllProducts()
            .then(data => {
                if (data.error) {
                    setStatus({ loading: false, error: data.error })
                    return toast.error(data.error)
                }
                setProducts([...data])
                setStatus({ loading: false, error: "" })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        preloadProducts()
    }, [])

    const handleDelete = (productId) => {
        setStatus({ error: "", loading: true })
        removeProduct(user.id, token, productId)
            .then(data => {
                if (data.error) {
                    setStatus({ error: data.error, loading: false })
                    return toast.error(data.error)
                }
                setStatus({ error: "", loading: false })
                preloadProducts();
                return toast.success(data.message);
            })
    }

    const manageProductForm = () => (
        <div className="col-md-12 col-10 offset-1">
            <h4 className="text-primary col-4 offset-md-4 mb-3">
                You are having <span style={{ borderBottom: "2px solid #FD3A73" }} >{products.length}</span> Products.
            </h4>
            <div className="row row-cols-lg-4 row-cols-md-2 offset-md-1">
                {
                    products.map((product, index) => {
                        return (
                            <div className="card m-2" key={index} >
                                <img
                                    src={`${API}/product/photo/${product._id}`}
                                    alt="img"
                                    className='card-img-top text-center mx-auto mt-2 rounded-rectangle bg-transparent'
                                    style={{
                                        width: "12rem",
                                        height: "10rem"
                                    }} />
                                <div className="card-body mx-auto">
                                    <h5 className="card-title mt-2">{product.name}</h5>
                                    <div className="card-text mb-2">
                                        <p className='py-1 lead'>
                                            <span className="badge bg-primary me-4">Price </span>
                                            {product.price}
                                        </p>
                                    </div>
                                    <div className="card-text mb-2">
                                        <p className='py-1 lead'>
                                            <span className="badge bg-primary me-4">Stock </span>
                                            {product.stock}
                                        </p>
                                    </div>
                                    <div className="card-text mb-2">
                                        <p className='py-1 lead'>
                                            <span className="badge bg-primary me-4">Sold </span>
                                            {product.sold}
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer bg-white row">
                                    <Link className='btn btn-outline-warning offset-2 col-4' to={`/admin/product/update/${product._id}`}>
                                        <span className="">Update</span>
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger offset-1 col-4"
                                        onClick={() => handleDelete(product._id)} >
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

    const handleGoBack = () => {
        navigate("/admin/dashboard")
    }


    return (
        <Base title='List All Your Products' desc='Update or Delete Products from here !' className='row m-4' >
            <ToastContainer />
            {manageProductForm()}
            <button className="btn-dark btn col-2 offset-5 my-4 " onClick={handleGoBack}>Go Back</button>
        </Base>
    )
}

export default ManageProducts