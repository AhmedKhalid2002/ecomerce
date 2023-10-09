import React, { useContext, useEffect, useState } from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import {Helmet} from "react-helmet";
import { UserToken } from '../../contex/userTokenContext'
import { CartContext } from '../../contex/cartContext'
import { WishlistContext } from '../../contex/wishlist';
export default function Home() {
  let {setUserToken}=useContext(UserToken);
  let {displayProductFromCart,setNumCountProduct}=useContext(CartContext);
  let {getProductWishlist,setWishlistId} =useContext(WishlistContext)
  let [cartProduct,setCartProduct]=useState([]);
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
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProduct/>
    </>
  )
}
