import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

export let CartContext = createContext(0)
export default function CartContextProvider(props) {

    const [cartId, setcartId] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [products, setproducts] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    let {UserToken, setUserToken} = useContext(TokenContext)

    function addToCart(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: prodId
        }, {
            headers: { token: localStorage.getItem("UserToken") }
        }).then((response) => {
            getUserCartItems()
            return response;
        }).catch((error) => {
            return error;
        })
    }

    function getUserCartItems() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: { token: UserToken }
        }).then((response) => {
            setcartId(response?.data?.cartId)
            settotalPrice(response?.data?.data?.totalCartPrice)
            setproducts(response?.data?.data?.products)
            setnumOfCartItems(response?.data?.numOfCartItems)
            return response;
        }).catch((error) => {
            return error;
        })
    }

    function updateCart(prodId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
            count: count
        }, {
            headers: { token: localStorage.getItem("UserToken") }
        }).then((response) => {
            setcartId(response?.data?.cartId)
            settotalPrice(response?.data?.data?.totalCartPrice)
            setproducts(response?.data?.data?.products)
            setnumOfCartItems(response?.data?.numOfCartItems)
            return response
        }).catch((error) => {
            console.log(error);
            return error
        })
    }

    function deleteCartItem(prodId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
            headers: { token: localStorage.getItem("UserToken") }
        }).then((response) => {
            setcartId(response?.data?.cartId)
            settotalPrice(response?.data?.data?.totalCartPrice)
            setproducts(response?.data?.data?.products)
            setnumOfCartItems(response?.data?.numOfCartItems)
            return response
        }).catch((error) => {
            console.log(error);
            return error
        })
    }

    function deleteAllCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers: { token: localStorage.getItem("UserToken") }
        }).then((response) => {
            setcartId(response?.data?.cartId)
            settotalPrice(response?.data?.data?.totalCartPrice)
            setproducts(response?.data?.data?.products)
            setnumOfCartItems(response?.data?.numOfCartItems)
            return response
        }).catch((error) => {
            console.log(error);
            return error
        })
    }

    function resetCartAfterPayment() {
        setcartId(0)
        setnumOfCartItems(0)
        settotalPrice(0)
        setproducts(null)
    }

    useEffect(() => {
        if (UserToken) {
            getUserCartItems()
            console.log(UserToken)
        }
    }, [UserToken])

    return <CartContext.Provider value={{ resetCartAfterPayment, addToCart, numOfCartItems, products, totalPrice, cartId, getUserCartItems, updateCart, deleteCartItem, deleteAllCart }}>
        {props.children}
    </CartContext.Provider>
}