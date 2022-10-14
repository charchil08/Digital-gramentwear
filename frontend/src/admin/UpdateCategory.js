import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper"
import { getCategory, updateCategory } from "./helper/adminApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const UpdateCategory = ({ match }) => {

    const [category, setCategory] = useState({
        name: "",
        loading: false,
        error: "",
    });

    const { name, } = category;

    const navigate = useNavigate();
    const { user, token } = isAuthenticated();
    const { categoryId } = useParams();

    const preloadCategory = (categoryId) => {
        getCategory(categoryId)
            .then(data => {
                if (data.error) {
                    setCategory({ ...category, error: data.error })
                    return toast.error(data.error)
                }
                setCategory({ ...category, name: data.name, error: "" })
            })
    }

    useEffect(() => {
        preloadCategory(categoryId)
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault()
        if (name.trim() === "") {
            setCategory({ ...category, name: "" })
            return toast.error("Category is blank")
        }
        setCategory({ ...category, error: "" });
        updateCategory(user.id, token, categoryId, { name })
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    toast.success(`${name} category updated`)
                }
            })
    }

    const discardCategory = () => {
        navigate("/admin/dashboard")
    }

    const createCategoryForm = () => {
        return (
            <div className='col-md-4 offset-md-4 col-sm-8 offset-sm-2 my-4'>
                <form>
                    <div className="form-group">
                        <label htmlFor="" className="form-label font-weight-bolder lead mb-4">Name of Category</label>
                        <input type="text"
                            value={name}
                            onChange={(event) => setCategory({ ...category, name: event.target.value })}
                            required
                            autoFocus
                            className="form-control py-2 font-weight-bolder" />
                    </div>
                </form>
                <div className="my-4">
                    <button className="btn btn-outline-primary px-4 mr-4" onClick={handleUpdate} >Update</button>
                    <button className="btn btn-outline-danger px-4 mx-4" onClick={discardCategory} >Discard</button>
                </div>
            </div>
        )
    }



    return (
        <Base title='List your new Category' desc='' className="row m-4">
            <ToastContainer />
            {createCategoryForm()}
        </Base>
    )
}

export default UpdateCategory