import React, { Fragment } from 'react'
import { useNavigate, NavLink } from "react-router-dom"
import { isAuthenticated, signout } from '../auth/helper'

const navLinkStyles = ({ isActive }) => {
    return {
        textDecoration: "none",
        padding: "5px 20px",
        fontSize: "18px",
        color: isActive ? "wheat" : "white",
        fontWeight: isActive ? "400" : "300",
    }
}

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-dark text-white mb-2 p-4 container-fluid position-relative'>
            <ul className="nav nav-tabs card-header-tabs position-absolute end-0  translate-middle-y">
                <li className="nav-items">
                    <NavLink to="/" style={navLinkStyles} >
                        Home
                    </NavLink>
                </li>
                <li className="nav-items">
                    <NavLink to="/user/cart" style={navLinkStyles} >
                        Cart
                    </NavLink>
                </li>
                {
                    isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-items">
                            <NavLink to="/user/dashboard" style={navLinkStyles} >
                                Dashboard
                            </NavLink>
                        </li>)
                }
                {
                    isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-items">
                            <NavLink to="/admin/dashboard" style={navLinkStyles} >
                                A. Dashboard
                            </NavLink>
                        </li>
                    )
                }
                {
                    isAuthenticated() ? (
                        <li className="nav-items">
                            <span className="mx-3"
                                style={{
                                    fontSize: "18px",
                                    color: "white",
                                    cursor: "pointer",
                                    borderBottom: "2px solid yellow"
                                }}
                                onClick={() => {
                                    signout((data) => {
                                        navigate("/signin")
                                    })
                                }} >
                                Sign out
                            </span>
                        </li>
                    ) : (
                        <Fragment>
                            <li className="nav-items">
                                <NavLink to="/signup" style={navLinkStyles} >
                                    Sign Up
                                </NavLink>
                            </li>

                            <li className="nav-items">
                                <NavLink to="/signin" style={navLinkStyles} >
                                    Sign In
                                </NavLink>
                            </li>
                        </Fragment>

                    )
                }

            </ul>
        </div>
    )
}

export default Menu