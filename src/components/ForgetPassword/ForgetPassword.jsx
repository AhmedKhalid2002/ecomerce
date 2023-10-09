import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function () {
    let [loding,setLoding]=useState(false);
    let navigate=useNavigate()
    let validationSchema=Yup.object({
        email:Yup.string().email('Email is not valid ').required("Email is required"),
    });
    async function sendEmail(value){
        setLoding(true)
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value);
        if(data.statusMsg === "success"){
            document.querySelector(".send-email").classList.add('d-none');
            document.querySelector(".verify-code").classList.remove('d-none')
        }
        setLoding(false)
    }
    let formik=useFormik({
        initialValues:{
            email:'',
        },
        validationSchema,
        onSubmit:sendEmail,
      })

    //   verify code
    let validationSchemaCode=Yup.object({
        resetCode:Yup.string().required("code is required"),
    });
    async function sendCode(value){
        setLoding(true)
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value);
        setLoding(false)
        if(data.status=== "Success"){
           navigate('/resetPassword')
        }

    }
    let formikVerify=useFormik({
        initialValues:{
            resetCode:'',
        },
        validationSchema:validationSchemaCode,
        onSubmit:sendCode,
      })

      
  return (
    <>
    <div className="container ">
        <div className="row mt-5 send-email">
            <h2>Forget password</h2>
            <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className='mt-3'>Email</label>
                <input className='form-control mt-2' type="email" placeholder='Email' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                {
                    loding?
                    <button  type="button" className='btn bg-main mt-3 float-end text-white'><Circles height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<><button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main mt-4 float-end text-white'>Send code</button></>}
            </form>
        </div>

        <div className="row mt-5 d-none verify-code">
            <h2>Forget password</h2>
            <form action="" onSubmit={formikVerify.handleSubmit}>
                <label htmlFor="verify" className='mt-3'>Verify Code</label>
                <input className='form-control mt-2' type="text" placeholder='Code' id='verify' name='resetCode' value={formikVerify.values.resetCode} onChange={formikVerify.handleChange} onBlur={formikVerify.handleBlur} />
                {formikVerify.errors.resetCode&&formikVerify.touched.resetCode?<p className='alert alert-danger mt-2'>{formikVerify.errors.resetCode}</p>:''}
                {
                    loding?
                    <button  type="button" className='btn bg-main mt-3 float-end text-white'><Circles height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<><button disabled={!(formikVerify.isValid&&formikVerify.dirty)} type="submit" className='btn bg-main mt-4 float-end text-white'>Send code</button></>}
            </form>
        </div>
    </div>
    </>
  )
}
