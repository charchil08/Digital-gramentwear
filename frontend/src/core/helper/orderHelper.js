import { API } from "../../backend";

export const createOrderApi = (userId, token, orderData) => {
    return fetch(`${API}/order/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: orderData })
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}