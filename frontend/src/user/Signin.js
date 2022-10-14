import React, { useState } from 'react'
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from "../core/Base"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from 'react-router-dom';

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = (name, event) => {
        setValues({ ...values, [name]: event.target.value, error: "" })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, didRedirect: false })
                }
                else {
                    authenticate(data, () => {
                        setValues({ ...values, loading: false, didRedirect: true })
                    })
                }
            })
            .catch(err => console.log("🚀   file: Signin.js   line 36   Signin   err", err))

    }

    const performRedirect = () => {
        if (didRedirect) {
            setValues({ ...values, didRedirect: false })
            if (user && user.role === 1) {
                return (<Navigate to="/admin/dashboard" />)
            }
            else {
                return (<Navigate to="/user/dashboard" />)
            }
        }
        if (isAuthenticated()) {
            return <Navigate to="/" />;
        }
    }

    const errorAlert = () => {
        return (
            error && (toast.error(error))
        )
    }

    const loadingAlert = () => {
        return (
            loading && (<div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
        )
    }

    const signinForm = () => {
        return (
            <div className="row">
                <form action="" className="col-md-4 offset-sm-4 text-left">
                    <div className="form-group  mb-4">
                        <label htmlFor="" className="form-label">Email  </label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(event) => handleChange("email", event)}
                            value={email} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="" className="form-label">Password  </label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(event) => handleChange("password", event)}
                            value={password} />
                    </div>
                    <button
                        className="btn btn-primary btn-block col-md-12 my-3"
                        onClick={handleSubmit}
                    >Sign in</button>
                </form >
            </div >)
    }

    return (
        <Base title='Sign in' desc='enjoy shopping... !' >
            <ToastContainer />
            {errorAlert()}
            {loadingAlert()}
            {signinForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin