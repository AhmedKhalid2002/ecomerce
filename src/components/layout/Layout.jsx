import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { UserToken } from '../../contex/userTokenContext'
import { CartContext } from '../../contex/cartContext'
import { WishlistContext } from '../../contex/wishlist'
export default function Layout() {
  let {setUserToken}=useContext(UserToken);
  let {displayProductFromCart,setNumCountProduct}=useContext(CartContext);
  let [cartProduct,setCartProduct]=useState([]);
  let {getProductWishlist,setWishlistId} =useContext(WishlistContext)
  let [wishlist,setWishlist]=useState([]);
  let wishId=[];

  async function displayCart(){
    let {data}=await displayProductFromCart();
    setCartProduct(data?.data)
    setNumCountProduct(data)
  }
  async function getWishlist(){
    let {data}=await getProductWishlist();
    setWishlist(data?.data);
    for(let i=0;i<data?.data.length;i++){
        wishId.push(data?.data[i].id)
        setWishlistId(wishId)
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      setUserToken(localStorage.getItem('userToken'))
    }
    displayCart()
    getWishlist()
  },[])
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
