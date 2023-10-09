import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../contex/cartContext'
import Loding from '../Loding/Loding';
import { Link } from 'react-router-dom';
export default function Cart() {
  let {displayProductFromCart,removeProductCart,updateProductCart,clearProductCart,setNumCountProduct}=useContext(CartContext);
  let [cartProduct,setCartProduct]=useState([])
  let [isLoading,setIsLoading]=useState(false);

  async function displayCart(){
    setIsLoading(true)
    let {data}=await displayProductFromCart();
    setCartProduct(data?.data)
    setNumCountProduct(data)
    setIsLoading(false)
    console.log(data);
  }
  async function removeProduct(id){
    let{data}=await removeProductCart(id);
    setCartProduct(data?.data);
    setNumCountProduct(data)
  }
  async function clearProduct(){
    let{data}=await clearProductCart();
    setCartProduct(data?.data);
    setNumCountProduct(data)
  }
  async function updateProduct(id,count){
    let {data}=await updateProductCart(id,count);
    if(count<1){
      count=1;
    }else{
      setCartProduct(data?.data);
    }
  }
  useEffect(()=>{
    displayCart()
  },[])
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {
          isLoading?<Loding/>:<div className="container p-4">
          <h1>Shop Cart:</h1>
          <p>Total Cart Price:{cartProduct?.totalCartPrice}</p>
          {
            
            cartProduct?.products?.map((product)=><div className='row' key={product?.product.id}>
              <div className="col-md-1">
                <img src={product?.product.imageCover} alt={product?.product.title} className='w-100' />
              </div>
              <div className="col-md-11">
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <p>{product?.product.title.split(" ").slice(0,20).join(" ")}</p>
                  <p className='text-main'>price: {product?.price}</p>
                  <span className='text-danger cursor-pointer' onClick={()=>removeProduct(product.product.id)}><i className="fa-solid fa-trash me-2"></i>Remove</span>
                </div>
                <div className="count">
                <button className='btn btn-success me-2' onClick={()=>updateProduct(product.product.id,product?.count+1)}>+</button>
                <span>{product?.count}</span>
                <button className='btn btn-success ms-2' onClick={()=>updateProduct(product.product.id,product?.count-1)}>-</button>
              </div>
              </div>
              </div>
            </div>)
          }
            <button className='btn btn-danger mt-2' onClick={()=>clearProduct()}>clear</button>

            <div className='d-flex justify-content-around align-items-center mt-3'>
              <Link to='/address' className='btn bg-main text-white'>Online Payment</Link>
            </div>
        </div>
        }
    </>
  )
}
