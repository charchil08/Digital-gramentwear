import React from 'react'
import Base from "../core/Base"
import { isAuthenticated } from '../auth/helper'
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {

    const { user: { name, email, } } = isAuthenticated();

    const adminNavigation = () => {
        return (
            <div className="card">
                <h4 className="card-header py-2">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink to="/admin/category/create" className="text-primary nav-link lead py-1">
                            Create Category
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/product/create" className="text-primary nav-link lead py-1">
                            Create Product
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/categories" className="text-primary nav-link lead py-1">
                            Manage Categories
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/products" className="text-primary nav-link lead py-1">
                            Manage Products
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/admin/orders" className="text-primary nav-link lead py-1">
                            Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card">
                <h4 className="card-header py-2">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge bg-primary mr-2 p-2 text-white" style={{
                            fontSize: "16px"
                        }} >
                            Name
                        </span>
                        <span className="px-4">
                            {name.toUpperCase()}
                        </span>
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-primary mr-2 p-2 text-white lead" style={{
                            fontSize: "16px"
                        }} >
                            Email
                        </span>
                        <span className="px-4">
                            {email}
                        </span>
                    </li>
                    <li className="list-group-item ">
                        <button className="btn bg-warning btn-block text-white mr-2">Update Account</button>
                        <button className="btn bg-danger  btn-block text-white mx-2">Delete Account</button>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title={`Welcome to Admin area, ${name}`} desc='Manage your portal from here' >
            <div className="row p-4">
                <div className="col-lg-3 col-sm-12 mb-sm-3 mb-3">
                    {adminNavigation()}
                </div>
                <div className="col-lg-9 col-sm-12">
                    {adminInfo()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashboard;