import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext=createContext();

export function WishlistContextProvider({children}){
    let [wishlistId,setWishlistId]=useState([])
    function getWishId(productId){
        return wishlistId?.includes(productId);
    }
    function addToWishlist(productId){
        let headers={
            token:localStorage.getItem("userToken"),
        }
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId:productId},{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function getProductWishlist() {
        let headers={
            token:localStorage.getItem("userToken"),
        }
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function removeWishlist(productId){
        let headers={
            token:localStorage.getItem("userToken"),
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    return <WishlistContext.Provider value={{addToWishlist,getProductWishlist,removeWishlist,wishlistId,setWishlistId,getWishId}}>
        {children}
    </WishlistContext.Provider>
}