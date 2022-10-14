import React from 'react'
import { API } from '../backend'

const LoadProductsImage = ({ productId, className, style = {} }) => {
    return (
        <div>
            <img src={`${API}/product/photo/${productId}`} alt="Tshirt" className={`rounded ${className}`} style={{
                maxHeight: "200px",
                maxWidth: "200px"
            }} />
        </div>
    )
}

export default LoadProductsImage