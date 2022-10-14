import React, { Fragment } from 'react'
import Menu from './Menu'
import "./base.css"

const Base = ({
    title = "Title",
    desc = "Description",
    children,
    className = "children m-4 p-3",
}) => {
    return (
        <Fragment >
            <Menu />
            <div className='container-fluid text-center m-2 p-3 '>
                <h1 className='mb-2'>{title}</h1>
                <p className='pb-2'>{desc}</p>
            </div>
            <div>
                <div className={`${className} `}>
                    {children}
                </div>
            </div>
            <div className="footer m-4 bg-dark p-4  text-center" >
                <h4 className="text-white">
                    If you have any query, Feel free to reach out !
                </h4>
                <button className="btn text-white btn-warning rounded m-2">
                    Contact Us
                </button>
            </div>
        </Fragment>
    )
}

export default Base