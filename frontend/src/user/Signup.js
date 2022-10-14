import React, { useState } from 'react'
import { signup } from '../auth/helper';
import Base from "../core/Base"
import { Link } from 'react-router-dom'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    })

    const { name, email, password, error, success } = values;

    const handleChange = (name, event) => {
        setValues({ ...values, error: false, [name]: event.target.value, })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values, error: "", success: true, name: "",
                        email: "",
                        password: "",
                    })
                }
            })
            .catch(error => console.log(error))
    }

    const signupForm = () => {
        return (
            <div className="row">
                <form action="" className="col-md-4 offset-sm-4 text-left">
                    <div className="form-group mb-4">
                        <label htmlFor="" className="form-label">Name </label>
                        <input type="text" className="form-control" onChange={(event) => handleChange("name", event)} value={name} required autoFocus />
                    </div>
                    <div className="form-group  mb-4">
                        <label htmlFor="" className="form-label">Email </label>
                        <input type="email" className="form-control" onChange={(event) => handleChange("email", event)} value={email} required autoFocus />
                    </div>
                    <div className="form-group  mb-4">
                        <label htmlFor="" className="form-label">Password </label>
                        <input type="password" className="form-control" onChange={(event) => handleChange("password", event)} value={password} required autoFocus />
                    </div>
                    <button className="btn btn-primary btn-block col-md-12 my-3" onClick={handleSubmit} >Sign Up</button>
                </form >
            </div >)
    }

    const successAlert = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        Account created !
                        <Link to="/signin">Sign in</Link> from here.
                    </div>
                </div>
            </div>
        )
    }

    const errorAlert = () => {
        return (<div className="row">
            <div className="col-md-4 offset-sm-4 text-left">
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
            </div>
        </div>)
    }

    return (
        <Base title='Sign up' desc='Register & enjoy !' >
            {successAlert()}
            {errorAlert()}
            {signupForm()}
        </Base>
    )
}

export default Signup