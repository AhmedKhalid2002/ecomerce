import React, {  useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import Loding from '../Loding/Loding';
export default function Orders() {
    let [userOrder,setUserOrder]=useState([]);
    let [loding,setloading]=useState(false)
    async function getUserOrder(id){
        setloading(true)
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
        setUserOrder(data);
        setloading(false);
        console.log(data);
    }
    useEffect(()=>{
        const {id}=jwtDecode(localStorage.getItem('userToken'));
        getUserOrder(id)
    },[])
  return (
    <>
    <div className="container">
                {loding?<Loding/>:userOrder?.map((order,index)=><div className='row shadow p-4 mt-4' key={order._id}>  
                <h1>user: {order.user.name}</h1>
                <p>order sent to user with phone {order.shippingAddress.phone} and with details {order.shippingAddress.details} at {order.shippingAddress.city}</p>
                <h4>payment Type: {order.paymentMethodType}</h4>
                <h4>total price: {order.totalOrderPrice}</h4>
                <div className="row g-3">
                    {order.cartItems?.map((items,i)=><div className='col-md-4 mt-3'>
                        <img src={items.product.imageCover} alt={items.product.title} className='w-100' />
                        <div className='text-center'>
                            <h5>{items.product.title?.split(" ").slice(0,2).join(" ")}</h5>
                            <p>quantity: {items.count}</p>
                            <p>price :{items.price}</p>
                        </div>
                    </div>)}
                </div>
                </div>)}
    </div>
    </>
  )
}
