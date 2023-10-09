import React, { useState } from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Circles } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';
export default function Register() {

    let navigate=useNavigate();
    let [error,setError]=useState('');
    let [loding,setLoding]=useState(false);
    let validationSchema=Yup.object({
        name:Yup.string().min(3,"Min length 3 character").max(10,'Max length 10 character').required("Name is required"),
        email:Yup.string().email('Email is not valid ').required("Email is required"),
        phone:Yup.string().matches(/(002)?01[0-25][0-9]{8}$/,"Phone not match").required('Phone is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}/,'Password start with capital character and length is 5 to 10 ').required('Password is required'),
        rePassword:Yup.string().oneOf([Yup.ref("password")],'confirm password not match password').required('confirm password is required')
    })

    async function registerSubmit(values){
        setLoding(true)
        let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
        .catch((errors)=>{
            setLoding(false)
            setError(errors.response.data.message)
        }
        )
        if(data.message=='success'){
            setLoding(false)
            navigate('/login')
        }
    }
    let formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'', 
            password:'',
            rePassword:'',
        },
        validationSchema,
        onSubmit:registerSubmit,
    })
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Register</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="container p-3">
            <h2>Register now</h2>
            <div className="row ">
                {error?<p className='alert alert-danger'>{error}</p>:''}
                <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input  type="text" id='name' value={formik.values.name} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mt-2' />
                    {formik.errors.name&&formik.touched.name?<p className='alert alert-danger mt-2'>{formik.errors.name}</p>:''}
                    <label htmlFor="email" className=' mt-2'>email:</label>
                    <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                    <label htmlFor="phone" className=' mt-2'>phone:</label>
                    <input type="tel" id='phone' value={formik.values.phone} name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.phone&&formik.touched.phone?<p className='alert alert-danger mt-2'>{formik.errors.phone}</p>:''}
                    <label htmlFor="password"className=' mt-2'>password:</label>
                    <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.password&&formik.touched.password?<p className='alert alert-danger mt-2'>{formik.errors.password}</p>:''}
                    <label htmlFor="repassword"className=' mt-2'>Confirm password:</label>
                    <input type="password" id='repassword' value={formik.values.rePassword} name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.rePassword&&formik.touched.rePassword?<p className='alert alert-danger mt-2'>{formik.errors.rePassword}</p>:''}
                    {
                    loding?
                    <button  type="button" className='btn bg-main mt-3 float-end text-white'><Circles height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<><button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main mt-3 float-end text-white'>Register</button> <small className='text-success mt-2'>  have you acount ? <Link to='/login'>Login</Link></small></>}
                </form>
                
            </div>
        </div>
    </>
  )
}
