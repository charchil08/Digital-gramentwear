import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import PrivateRoute from './auth/helper/PrivateRoute'
import AdminRoute from './auth/helper/AdminRoute'
import UserDashboard from "./user/UserDashboard"
import AdminDashboard from "./user/AdminDashboard"
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'
import { CartProvider } from './context/CartContext'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />

      <Route path='/user' element={<PrivateRoute />} >
        <Route path='dashboard' element={<UserDashboard />} />
        <Route path='cart' element={<Cart />} />
      </Route>


      <Route path='/admin' element={<AdminRoute />} >
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='category/create' element={<CreateCategory />} />
        <Route path='categories' element={<ManageCategories />} />
        <Route path='product/create' element={<CreateProduct />} />
        <Route path='products' element={<ManageProducts />} />
        <Route path='category/update/:categoryId' element={<UpdateCategory />} />
        <Route path='product/update/:productId' element={<UpdateProduct />} />
      </Route>

      {/* <Route path='*' element={<Home />} /> */}
    </Routes>
  )
}

export default RoutesApp