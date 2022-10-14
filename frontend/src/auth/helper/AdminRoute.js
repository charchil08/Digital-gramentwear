import React from "react";
import { isAuthenticated } from "./index";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet /> : <Navigate to="/signin" />
}

export default AdminRoute;