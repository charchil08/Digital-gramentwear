import { API } from "../../backend";

export const addCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getAllCategories = () => {
    return fetch(`${API}/categories/all`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const updateCategory = (userId, token, categoryId, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const removeCategory = (userId, token, categoryId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const addProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getAllProducts = () => {
    return fetch(`${API}/products/all`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const updateProduct = (userId, token, product, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const removeProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}



/** 
 ***    Category APIs
 * addCategory
 * getAllCategories
 * getCategory
 * updateCategory
 * removeCategory
 * **/

/**
 *** Product APIs 
 *  addProduct
 * getAllProducts
 * getProduct
 * updateProduct
 * removeProduct
 */