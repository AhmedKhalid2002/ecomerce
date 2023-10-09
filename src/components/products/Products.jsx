import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loding from '../Loding/Loding';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { CartContext } from '../../contex/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../contex/wishlist';

export default function Products() {
    let {addToCart,setNumCountProduct}=useContext(CartContext);
    let {addToWishlist,getProductWishlist,getWishId,removeWishlist,setWishlistId} =useContext(WishlistContext)
    let [pageProduct,setPageProduct]=useState(1);
    let [products,setProducts]=useState([]);
    let [numpageProduct,setNumPage]=useState([])
    let [isLoding,setIsLoding]=useState(false);
    let [wishlist,setWishlist]=useState([]);
    let wishId=[];

    async function getProduct(flag=true){
        setIsLoding(flag)
        let  product =await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageProduct}`);
        setProducts(product.data.data);
        setNumPage(product.data.metadata)
        setIsLoding(false);
}
 async function addProductWishlist(productId){
    let {data}=await addToWishlist(productId);
    console.log(data);
    setWishlistId(data?.data)
    if(data?.status==="success" && localStorage.getItem('userToken')!==null){
        toast.success("Product added successfully to your wishlist");
    }else{
        toast.error("Invalid Token. please login again")
    }
 }
  async function getWishlist(){
    let {data}=await getProductWishlist();
    setWishlist(data?.data);
    for(let i=0;i<data?.data.length;i++){
        wishId.push(data?.data[i].id)
        setWishlistId(wishId)
        console.log(wishId);
    }
}
 async function removeProduct(productId){
    let {data}=await removeWishlist(productId);
    setWishlist(data?.data);
    getWishlist()
}
async function addProduct(productId){
    let {data} = await addToCart(productId)
    getProduct(false)
    setNumCountProduct(data);
    if(data?.status === "success"&&localStorage.getItem('userToken')!==null){
        toast.success("Product added successfully to your cart");
    }else{
        toast.error("Invalid Token. please login again")
    }
}

useEffect(()=>{
    getProduct()
},[])
function nextPage(){
    if(pageProduct === 2){
        setPageProduct(2);
        getProduct()
        console.log(pageProduct);
    }else{
        setPageProduct(pageProduct+=1);
        getProduct()
        console.log(pageProduct);
    }
}
function PreviousPage(){
    if(pageProduct === 1){
        setPageProduct(1);
        getProduct()
        console.log(pageProduct);
    }else{
        setPageProduct(pageProduct-=1);
        getProduct()
        console.log(pageProduct);
    }
}
return (
<>
    <Helmet>
            <meta charSet="utf-8" />
            <title>Products</title>
            <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
<div className="container">
        
    <div className="row g-4">
        {isLoding?<Loding/>:products?.map((product)=><div className='col-md-3 product p-3' key={product._id}>
            {
                getWishId(product.id)?<i className="fa-solid fa-heart btn fs-3 text-danger" onClick={()=>removeProduct(product._id)}></i>:<i className="fa-regular fa-heart btn fs-3 " onClick={()=>addProductWishlist(product._id)}></i>
            }
            <Link to={`/productDetails/${product._id}`}>
                <img src={product.imageCover} className='w-100' alt={product.title} />
                <div className='text-center mt-2'>
                    <p>{product.category.name}</p>
                    <p>{product.title.split(" ").slice(0,2).join(" ")}</p>
                    <div className='d-flex justify-content-around '>
                        <p>{product.price} EGP</p>
                        <p><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</p>
                    </div>
                </div>
            </Link>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn bg-main text-white ' onClick={()=>addProduct(product._id)}>Add to cart</button>
            </div>        
        </div>)}
        <div className='text-center'>
        <i className="fa-solid fa-arrow-right m-2 bg-success p-3 text-white rounded-2" onClick={()=>nextPage()}></i>
        <span className='text-main'>{numpageProduct.currentPage}</span>
        <i className="fa-solid fa-arrow-left m-2 bg-success p-3 text-white rounded-2" onClick={()=>PreviousPage()}></i>
        </div>
    </div>
</div>
</>
)
}
