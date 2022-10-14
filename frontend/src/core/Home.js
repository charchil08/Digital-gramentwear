import React, { useState, useEffect } from 'react'
import Base from './Base'
import Card from './Card'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { getAllProducts } from '../admin/helper/adminApi';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState({
        loading: false,
        error: "",
    })

    const preloadProducts = () => {
        setStatus({ error: "", loading: true })
        getAllProducts()
            .then(data => {
                if (data.error) {
                    setStatus({ loading: false, error: data.error })
                    return toast.error("No products available")
                }
                setProducts([...data])
                setStatus({ loading: false, error: "" })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        preloadProducts()
    }, [])

    return (
        <Base title='Enjoy Shopping' desc='Free shipping across India 🚚' >
            <ToastContainer />
            <div className='card-group' style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem"
            }} >
                {
                    products &&
                    products.map((product, index) => {
                        return (
                            <Card key={index} product={product} index={index} showRemoveFromCart={false} showAddToCart={true}  />
                        )
                    })
                }
            </div>
        </Base>
    )
}

export default Home