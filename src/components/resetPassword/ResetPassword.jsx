import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
    let [loding,setLoding]=useState(false);
    let navigate=useNavigate()
    let validationSchema=Yup.object({
        email:Yup.string().email('Email is not valid ').required("Email is required"),
        newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}/,'Password start with capital character and length is 5 to 10 ').required('Password is required'),
      });
      async function resetPassword(value){
        setLoding(true)
        let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',value)
        console.log(data);
        setLoding(false)
        if(data.token){
            navigate('/login')
        }
      }
      let formik=useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema,
        onSubmit:resetPassword,
      })
  return (
    <>
        <div className="container">
            <div className="row mt-5">
                <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' className='form-control' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                    <label htmlFor="password">Reset Password</label>
                    <input type="password" id='password' className='form-control' name='newPassword' value={formik.values.newPassword}  onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.errors.newPassword&&formik.touched.newPassword?<p className='alert alert-danger mt-2'>{formik.errors.newPassword}</p>:''}
                    {
                    loding?
                    <button  type="button" className='btn bg-main mt-3 float-end text-white'><Circles  height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<><button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main mt-4 float-end text-white'>Rest Password</button></>}
                </form>
            </div>
        </div>
    </>
  )
}
