import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllCategories, getProduct, updateProduct } from './helper/adminApi';
import { API } from '../backend';
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const UpdateProduct = () => {

    const { user, token } = isAuthenticated();
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        desc: "",
        price: "",
        category: "",
        stock: "",
        photo: "",
        categories: [],
        loading: false,
        error: "",
        updatedProduct: "",
        getRedirect: false,
        formData: "",
    })

    const {
        name,
        desc,
        price,
        category,
        stock, photo, categories, loading, error, updatedProduct, getRedirect, formData } = product;



    useEffect(() => {
        Promise.all([getAllCategories(), getProduct(productId)])
            .then(data => {
                if (data[0].error || data[1].error) {
                    setProduct({ ...product, error: data.error })
                }
                else {
                    setProduct({
                        ...product,
                        loading: false,
                        error: "",
                        categories: data[0],
                        name: data[1].name,
                        desc: data[1].desc,
                        price: data[1].price,
                        stock: data[1].stock,
                        category: data[1].category,
                        formData: new FormData()
                    })
                }
            })
    }, [])

    const handleChange = (event, name) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setProduct({ ...product, [name]: value })
    }

    const handleGoBack = () => {
        navigate("/admin/products")
    }

    // TODO:
    const handleUpdate = event => {
        event.preventDefault()
        setProduct({ ...product, loading: true, error: "" })
        updateProduct(user.id, token, formData, productId)
            .then(data => {
                if (data.error) {
                    setProduct({ ...product, error: data.error, loading: false })
                    return toast.error(data.error)
                }
                setProduct({ ...product, error: "", loading: false })
                toast.success("Product Updated successfully!👍")
            })
    }

    const updateProductForm = () => (
        <div className='col-md-6 offset-md-3 col-sm-10 offset-sm-1 my-4'>
            <form action="">
                <div className="form-group mb-4" style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <img
                        src={`${API}/product/photo/${productId}`}
                        alt="img"
                        className='rounded mt-2
                         p-3 border border-primary'
                        style={{
                            width: "14rem",
                            height: "14rem",
                        }} />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">
                        Photo </label>
                    <input type="file"
                        accept='image'
                        onChange={event => handleChange(event, "photo")}
                        autoFocus
                        className="form-control py-2 font-weight-bolder" />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Name </label>
                    <input type="text"
                        value={name}
                        onChange={event => handleChange(event, "name")}
                        placeholder="For ex. tshirt"
                        required
                        autoFocus
                        className="form-control py-2 font-weight-bolder" />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Description</label>
                    <textarea
                        value={desc}
                        onChange={event => handleChange(event, "desc")}
                        placeholder={`Size : M \ncolor:blue`}
                        required
                        className="form-control py-2 font-weight-bolder"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Update Category</label>
                    <select className="form-select" onChange={event => handleChange(event, "category")} >
                        {
                            categories &&
                            categories.map((cate, index) => (
                                <option value={cate._id} key={index} selected={cate._id === category._id} >{cate.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Price </label>
                    <input type="number"
                        value={price}
                        onChange={event => handleChange(event, "price")}
                        placeholder="For ex. 1000"
                        required
                        className="form-control py-2 font-weight-bolder"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Quantity</label>
                    <input type="number"
                        value={stock}
                        onChange={event => handleChange(event, "stock")}
                        placeholder="For ex. 10"
                        required
                        className="form-control py-2 font-weight-bolder"
                    />
                </div>
            </form >
            <div className="my-4" style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <button className="btn btn-outline-primary px-4 mr-4" onClick={handleUpdate} >Update</button>
                <button type='reset' className="btn btn-outline-secondary px-4 mx-4" onClick={handleGoBack} >Go Back</button>
            </div>
        </div >
    )

    return (
        <Base title='Update your Product !' >
            {updateProductForm()}
        </Base>
    )
}

export default UpdateProduct