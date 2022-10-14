import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Base from '../core/Base'
import { getAllCategories, removeCategory } from './helper/adminApi';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
    const { user, token } = isAuthenticated();

    const preloadCat = async () => {
        const data = await getAllCategories();
        await setCategories([...data])
    }

    const handleDelete = (categoryId) => {
        removeCategory(user.id, token, categoryId)
            .then(data => {
                if (data.error) {
                    return toast.error(data.error);
                }
                preloadCat()
                toast.success(data.message);
            })
    }

    const handleGoBack = () => {
        navigate("/admin/dashboard")
    }

    useEffect(() => {
        preloadCat()
    }, [])

    return (
        <Base title='List your all Category' desc='Update or delete your collections!' className="row m-4">
            <ToastContainer />
            <h3 className='col-8 offset-2 text-primary'>Total Categories : <span style={{ borderBottom: "2px solid #FD3A73" }} >{categories.length}</span> </h3>
            <div className="col-10 offset-2 my-4">
                {
                    categories.map((cat, index) => (
                        <div className="col-10 my-2 row border border-top-0 border-start-0 border-end-0" key={index}  >
                            <h4 className="list-group-item py-2 col-4 offset-1">{cat.name}</h4>
                            <div className="col-3">
                                <Link className='btn btn-outline-warning' to={`/admin/category/update/${cat._id}`}>
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div className="col-3 offset-1">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(cat._id)} >
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="btn-dark btn col-2 offset-2" onClick={handleGoBack}>Go Back</button>

        </Base>
    )
}

export default ManageCategories