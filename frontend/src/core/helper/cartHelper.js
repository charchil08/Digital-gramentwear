import { API } from "../../backend"

// export const addItemToCart = (product, next) => {
//     let cart = [];
//     if (typeof window !== "undefined") {
//         if (localStorage.getItem("cart")) {
//             cart = JSON.parse(localStorage.getItem("cart"));
//         }

//         const found = cart.find(prd => prd._id === product._id)
//         if (found !== undefined) {
//             const indexOfProduct = cart.indexOf(found);
//             cart[indexOfProduct]["count"] += 1;
//             const duplicate = [...cart]
//             localStorage.removeItem("cart")
//             localStorage.setItem("cart", JSON.stringify(duplicate));
//             return next()
//         }
//         cart.push({ ...product, count: 1 });
//         localStorage.setItem("cart", JSON.stringify(cart));
//         next()
//     }
// }

// export const loadItemsFromCart = () => {
//     if (typeof window !== "undefined") {
//         if (localStorage.getItem("cart")) {
//             return JSON.parse(localStorage.getItem("cart"));
//         }
//     }
// }

// export const removeItemFromCart = (productId) => {
//     let cart = [];
//     if (typeof window !== "undefined") {
//         if (localStorage.getItem("cart")) {
//             cart = JSON.parse(localStorage.getItem("cart"));
//         }
//         cart.forEach((product, index) => {
//             if (product._id === productId) {
//                 cart.splice(index, 1)
//             }
//         })
//         localStorage.setItem("cart", JSON.stringify(cart));
//         return cart;
//     }
// }

// export const emptyCart = (next) => {
//     if (typeof window !== "undefined") {
//         if (localStorage.getItem("cart")) {
//             localStorage.removeItem("cart");
//             return next();
//         }
//     }
// }

export const addItemToCart = (userId, token, cartProduct) => {
    return fetch(`${API}/cart/${userId}/add-item`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cartProduct)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const loadItemsFromCart = (userId, token) => {
    return fetch(`${API}/cart/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const removeItemFromCart = (userId, token, cartProductId) => {
    return fetch(`${API}/cart/${userId}/remove-item/${cartProductId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const emptyCart = (userId, token, next) => {
    return fetch(`${API}/cart/${userId}/empty-cart`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => next())
        .catch(err => console.log(err))
}

export const increaseCartProduct = (userId, token, productId) => {
    return fetch(`${API}/cart/${userId}/inc-one/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const decreaseCartProduct = (userId, token, productId, next) => {
    return fetch(`${API}/cart/${userId}/dec-one/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => next())
        .catch(err => console.log(err))
}