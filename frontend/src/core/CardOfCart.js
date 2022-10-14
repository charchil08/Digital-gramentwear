import React from 'react'
import { useState } from 'react'
import LoadProductsImage from './LoadProductsImage'

const CardOfCart = ({ product }) => {

  const [count, setCount] = useState(product.count)
  const [total, setTotal] = useState(product.price)

  const displayCart = () => {

    console.log(product)
    return (
      <ul className="list-group list-group-horizontal" >
        <li className="list-group-item">
          <LoadProductsImage productId={product.product._id} className="img-thumbnail img-fluid" />
        </li>
        <li className="list-group-item">
          <p className="text-dark lead">{product.name}</p>
          <p className="my-4"><u>Remove</u></p>
        </li>
        <li className="list-group-item ">
          <p className="text-dark">{product.price} <i className="fas fa-rupee-sign"></i></p>
        </li>
        <li className="list-group-item">
          <p className="border p-2 rounded my-auto">
            <span className='px-2' >+</span>
            <span className="lead px-2">{count}</span>
            <span className='px-2'>-</span>
          </p>
        </li>
        <li className="list-group-item">
          <h6 className="text-dark">{total} <i className="fas fa-rupee-sign"></i></h6>
        </li>
      </ul>)
  }

  return (
    <div className=''>
      {displayCart()}
    </div>
  )
}

export default CardOfCart