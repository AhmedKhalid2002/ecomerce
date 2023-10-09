import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import { CartContext } from '../../contex/cartContext';
import { Circles } from 'react-loader-spinner';
import * as Yup from 'yup';
export default function Address() {
    let {onlinePaymentCart,cartId}=useContext(CartContext);
    let [loding,setLoding]=useState(false);
    let validationSchema=Yup.object({
        details:Yup.string().required("Details is required"),
        phone:Yup.string().matches(/(002)?01[0-25][0-9]{8}$/,"Phone not match").required('Phone is required'),
        city:Yup.string().required('city is required')
      });
    async function addressSubmit(value){
        setLoding(true)
        let response=await onlinePaymentCart(cartId,"http://localhost:3000",value)
        console.log(response);
        setLoding(false)
        window.location.href=response?.data.session.url
    } 
    let formik=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        onSubmit:addressSubmit,
        validationSchema,
    })
  return (
    <>
        <div className="container">
            <div className="row">
                <form action="" onSubmit={formik.handleSubmit} className='mt-5'>
                    <input className='form-control' type="text" placeholder='Details' name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.details&&formik.touched.details?<p className='alert alert-danger mt-2'>{formik.errors.details}</p>:''}
                    <input className='form-control mt-3' type="tel" placeholder='Phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.phone&&formik.touched.phone?<p className='alert alert-danger mt-2'>{formik.errors.phone}</p>:''}
                    <input className='form-control mt-3' type="text" placeholder='City' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.city&&formik.touched.city?<p className='alert alert-danger mt-2'>{formik.errors.city}</p>:''}
                    {loding?<button  type="button" className='btn btn-success mt-3 text-white'><Circles height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<button className='btn btn-success mt-3' type='submit'>Pay Now</button>}
                </form>

            </div>
        </div>
    </>
  )
}
