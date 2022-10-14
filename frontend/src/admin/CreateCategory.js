import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper"
import { addCategory } from "./helper/adminApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const obj = isAuthenticated();
        setUser(obj.user)
        setToken(obj.token)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (name.trim() === "") {
            setName("")
            return toast.error("Category is blank")
        }
        setError(false);
        addCategory(user.id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                    setSuccess(false)
                    toast.error(data.error);
                    console.log(data.error)
                }
                else {
                    setSuccess(true)
                    setError(false)
                    console.log(data)
                    toast.success(`${name} category created`)
                    setName("")
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
                            onChange={(event) => setName(event.target.value)}
                            placeholder="For ex. Summer"
                            required
                            autoFocus
                            className="form-control py-2 font-weight-bolder" />
                    </div>
                </form>
                <div className="my-4">
                    <button className="btn btn-outline-primary px-4 mr-4" onClick={handleSubmit} >Create</button>
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

export default CreateCategory