import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loding from '../Loding/Loding';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { CartContext } from '../../contex/cartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
    let params=useParams();
    let {addToCart,setNumCountProduct}=useContext(CartContext);
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`)
    }
    async function addProduct(productId){
        let {data} =await addToCart(productId)
        getProductDetails()
        setNumCountProduct(data)
        if(data?.status === "success"&&localStorage.getItem('userToken')!==null){
            toast.success("Product added successfully to your cart");
        }else{
            toast.error("Invalid Token. please login again")
        }
    }
    let {data,isLoading}=useQuery('productDetails',getProductDetails);
    let productDetail=data?.data.data;
  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        {
            isLoading?<Loding/>:<div className="container mt-3">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4">
                    <img src={productDetail?.imageCover} alt={productDetail?.title} className='w-100'/>
                </div>
                <div className="col-md-8 ">
                    <p className='fw-bold fs-2'>{productDetail?.title}</p>
                    <p className='text-secondary'>{productDetail?.description}</p>
                    <p>{productDetail?.category.name}</p>
                    <div className='d-flex justify-content-between p-3 w-75'>
                        <h3>{productDetail?.price} EGP</h3>
                        <p><i className="fa-solid fa-star rating-color"></i> {productDetail?.ratingsAverage}</p>
                    </div>
                    <button className='btn btn-success w-100' onClick={()=>addProduct(productDetail.id)}>Add to cart</button>
                </div>
            </div>
        </div>
        }
    </>
)
}
