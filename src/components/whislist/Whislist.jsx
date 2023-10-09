import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../contex/wishlist'
import Loding from '../Loding/Loding';
import { CartContext } from '../../contex/cartContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Whislist() {
    let {getProductWishlist,removeWishlist,setWishlistId}=useContext(WishlistContext);
    let {addToCart,setNumCountProduct}=useContext(CartContext);
    let [wishlist,setWishlist]=useState([]);
    let [isLoading,setIsLoading]=useState(false);
    let wishId=[];
    async function getProduct(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    async function getWishlist(){
        setIsLoading(true)
        let {data}=await getProductWishlist();
        setWishlist(data?.data);
        for(let i=0;i<data?.data.length;i++){
            wishId.push(data?.data[i].id)
            setWishlistId(wishId)
            console.log(wishId);
        }
        setIsLoading(false)
    }
    async function removeProduct(productId){
        let {data}=await removeWishlist(productId);
        setWishlist(data?.data);
        getWishlist()
    }

    async function addProduct(productId){
        let {data} = await addToCart(productId)
        setNumCountProduct(data)
        getProduct()
        if(data?.status === "success"&&localStorage.getItem('userToken')!==null){
            toast.success("Product added successfully to your cart");
        }else{
            toast.error("Invalid Token. please login again")
        }
    }
    useEffect(()=>{
        getWishlist()
    },[])
  return (
    <>
        <div className="container p-5">
            <div className="row g-4">
                {isLoading?<Loding/>:wishlist?.map((product)=><div className='col-lg-3 col-md-4'key={product.id}>
                    <div className='shadow-sm p-3'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <i title='love' className="fa-solid fa-heart btn fs-3 text-danger" onClick={()=>removeProduct(product.id)}></i>
                            <i title='add cart' className="fa-solid fa-cart-plus fs-2 text-warning" onClick={()=>addProduct(product.id)}></i>
                        </div>
                        <img src={product.imageCover} alt={product.title} className='w-100 mt-3' />
                        <p className='text-center fs-3 fw-bold mt-3'>{product?.title?.split(" ").slice(0,2).join(" ")}</p>
                        <div className='d-flex justify-content-between mt-2'>
                            <p>{product.price} EGP</p>
                            <p><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </>
  )
}
