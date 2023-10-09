import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Circles } from  'react-loader-spinner'
import { UserToken } from '../../contex/userTokenContext';
import { Helmet } from 'react-helmet';
export default function Login() {
  let [loding,setLoding]=useState(false);
  let [error,setError]=useState('');
  let navigate=useNavigate();
  let {setUserToken}=useContext(UserToken);
  let validationSchema=Yup.object({
    email:Yup.string().email('Email is not valid ').required("Email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}/,'Password start with capital character and length is 5 to 10 ').required('Password is required'),
  });
  async function loginSubmit(value){
    setLoding(true)
    let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value)
    .catch(
      (error)=>{
        setLoding(false)
        setError(error.response.data.message)
      }
    );
    if(data.message ==="success"){
      setLoding(false)
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token)
      navigate('/');
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
    onSubmit:loginSubmit,
  })
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="container p-5 ">
            <h2>Login now</h2>
            <div className="row ">
                {error?<p className='alert alert-danger'>{error}</p>:''}
                <form action="" onSubmit={formik.handleSubmit} >
                    <label htmlFor="email" className=' mt-2'>email:</label>
                    <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.email&&formik.touched.email?<p className='alert alert-danger mt-2'>{formik.errors.email}</p>:''}
                    <label htmlFor="password"className=' mt-2'>password:</label>
                    <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control  mt-2' />
                    {formik.errors.password&&formik.touched.password?<p className='alert alert-danger mt-2'>{formik.errors.password}</p>:''}
                    {
                    loding?
                    <button  type="button" className='btn bg-main mt-3 float-end text-white'><Circles height="30" width="30" color="#fff" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/></button>
                    :<><button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main mt-4 float-end text-white'>login</button> <div className='d-flex justify-content-between align-items-center'><small className='text-success mt-2'> don't have acount ? <Link to='/register'>Register</Link></small> 
                    <small className='text-success my-2'><Link to='/forgetPassword'>Forget Password?</Link></small> 
                    </div></>}
                </form>
                
            </div>
        </div>
    </>
  )
}
