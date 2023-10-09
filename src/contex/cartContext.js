import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext();

export function CartContextProvider({children}){
    let [numcountProduct,setNumCountProduct]=useState(0);
    function addToCart(Id){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId:Id
        },{
            headers:headers,
        }).then((response)=>response).catch((error)=>error)
    }
    function displayProductFromCart(){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function removeProductCart(productId){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function updateProductCart(productId,count){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count},{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function clearProductCart(){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers}).then((response)=>response).catch((error)=>error);
    }
    function onlinePaymentCart(cartId,url,values){
        let headers={
            token:localStorage.getItem('userToken'),
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:values},{headers:headers}).then((response)=>response).catch((error)=>error);
    }
   
    let [cartId,setCartId]=useState(null)
    async function getCart(){
        let {data} = await displayProductFromCart();
        setCartId(data?.data._id)
    }
    useEffect(()=>{
        getCart()
    },[])
    return <CartContext.Provider value={{addToCart,displayProductFromCart,removeProductCart,updateProductCart,clearProductCart,setNumCountProduct,onlinePaymentCart,numcountProduct,cartId}}>
        {children}
    </CartContext.Provider>
}