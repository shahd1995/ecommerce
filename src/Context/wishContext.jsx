import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishContext = createContext(0)

export default function WishContextProvider(props) {

    let headers = { token: localStorage.getItem("UserToken") }
    let token = localStorage.getItem("UserToken")

    const [products, setproducts] = useState(null)
    const [numOfItems, setnumOfItems] = useState(0)
    const [favoriteIds, setfavoriteIds] = useState(null)


    function addToWishList(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: prodId
        }, {
            headers
        }).then((response) => {
           getUserWishListItems()
            return response;
        }).catch((error) => {
            return error;
        })
    }

    function getUserWishListItems() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        }).then((response) => {
            setproducts(response?.data?.data)
            setnumOfItems(response?.data?.count)
            let wishLisrProducts = response?.data?.data
            let wishLisrProductsIds =  wishLisrProducts?.map((wishListProduct)=>{ return wishListProduct._id })
            setfavoriteIds(wishLisrProductsIds)
            console.log(favoriteIds)
            console.log(response?.data?.data)
            return response;
        }).catch((error) => {
            return error;
        })
    }

    function removeFromWishList(prodId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
            headers
        }).then((response) => {
            getUserWishListItems()
            return response
        }).catch((error) => {
            console.log(error);
            return error
        })
    }

    useEffect(() => {
        console.log(favoriteIds)
        if (token) {
            getUserWishListItems()
        }
    }, [token])

    useEffect(() => {
    console.log("Updated favoriteIds:", favoriteIds);
    }, [favoriteIds]);

    return <WishContext.Provider value={{ addToWishList, getUserWishListItems, setnumOfItems, numOfItems, setproducts, products, removeFromWishList, favoriteIds, setfavoriteIds }}>
        {props.children}
    </WishContext.Provider>
}