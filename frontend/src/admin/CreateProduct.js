import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import { addProduct, getAllCategories } from './helper/adminApi'

import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {

    const { user, token } = isAuthenticated();
    const navigate = useNavigate()
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
        createdProduct: "",
        getRedirect: false,
        formData: "",
    })

    const {
        name,
        desc,
        price,
        category,
        stock, photo, categories, loading, error, createdProduct, getRedirect, formData } = product;


    const [uploadPhoto, setUploadPhoto] = useState("");

    useEffect(() => {
        preloadCategories()
    }, [])

    function preloadCategories() {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setProduct({ ...product, error: data.error })
                }
                else {
                    setProduct({ ...product, categories: data, formData: new FormData() })
                }
            })
            .catch(err => console.log(err))
    }

    const handleGoBack = () => {
        navigate("/admin/products")
    }

    const handleChange = (event, name) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        if (name === "photo") {
            setUploadPhoto(URL.createObjectURL(event.target.files[0]))
        }
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        setProduct({ ...product, loading: true, error: "" })
        addProduct(user.id, token, formData)
            .then(data => {
                if (data.error) {
                    setProduct({ ...product, loading: false, error: data.error })
                    return toast.error("error in adding product!")
                }
                setProduct({
                    ...product,
                    loading: false,
                    error: "",
                    createdProduct: data.name,
                    photo: "",
                    name: "",
                    stock: "",
                    price: "",
                    desc: "",
                    category: ""
                })
                toast.success(`${data.name} added to your portal !`)
            })
            .catch(err => console.log(err))
    }

    const loadingAlert = () => {
        return (
            loading && (<div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
        )
    }

    const createProductForm = () => (
        <div className='col-md-6 offset-md-3 col-sm-10 offset-sm-1 my-4'>
            <div className="" style={{
                display: "flex",
                justifyContent: "center",
            }}>
                {
                    photo &&
                    <div> <h5 className='text-center'> Preview {" "}</h5>
                        <img src={`${uploadPhoto}`} alt='' className="border rounded border-info p-1" style={{
                            width: "12rem",
                            height: "12rem",
                        }} /> </div>
                }
            </div>
            <form action="">
                <div className="form-group mb-4">
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Photo </label>
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
                    <label htmlFor="" className="form-label font-weight-bolder lead mb-2">Category</label>
                    <select name="" id="" className="form-select" onChange={event => handleChange(event, "category")} >
                        {
                            categories &&
                            categories.map((category, index) => (
                                <option key={index} value={category._id} >{category.name}</option>
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
            </form>
            <div className="my-4">
                <button className="btn btn-outline-primary px-4 mr-4" onClick={handleSubmit} >Create</button>
                <button type='reset' className="btn btn-outline-secondary px-4 mx-4" onClick={handleGoBack}>Go Back</button>
            </div>
        </div >
    )


    return (
        <Base title='Add your own Products' desc='Create new products from here !' className="row m-4" >
            <ToastContainer />
            {loadingAlert()}
            {createProductForm()}
        </Base>
    )
}

export default CreateProduct