import axios from 'axios'
import { useQuery } from 'react-query'
import Loding from '../Loding/Loding';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../contex/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../contex/wishlist';

export default function FeaturedProduct() {
    let {addToCart,setNumCountProduct}=useContext(CartContext);
    let {addToWishlist,getProductWishlist,getWishId,removeWishlist,setWishlistId} =useContext(WishlistContext)
    let {data,isLoading}=useQuery('FeaturedProduct',getProduct);
    let [wishlist,setWishlist]=useState([]);
    let products=data?.data.data;
    let wishId=[];
    async function getProduct(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    async function addProductWishlist(productId){
        let {data}=await addToWishlist(productId);
        setWishlistId(data?.data)
        if(data?.status==="success" && localStorage.getItem('userToken')!==null){
            toast.success("Product added successfully to your wishlist");
        }else{
            toast.error("Invalid Token. please login again")
        }
     }
     async function removeProduct(productId){
        let {data}=await removeWishlist(productId);
        setWishlist(data?.data);
        getWishlist()
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
    async function addProduct(productId){
        let {data} =await addToCart(productId)
        getProduct()
        setNumCountProduct(data);
        if(data?.status === "success"&&localStorage.getItem('userToken')!==null){
            toast.success("Product added successfully to your cart");
        }else{
            toast.error("Invalid Token. please login again")
        }
    }
  return (
    <>
    <div className="container">
        <div className="row g-4 mt-3">
            {isLoading?<Loding/>:products?.map((product)=><div className='col-lg-3 col-md-4 product p-3' key={product._id}>
            {
                getWishId(product._id)?<i className="fa-solid fa-heart btn fs-3 text-danger" onClick={()=>removeProduct(product._id)}></i>:<i className="fa-regular fa-heart btn fs-3 " onClick={()=>addProductWishlist(product._id)}></i>
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
            </div>
            )}
        </div>
        
    </div>
    </>
  )
}
