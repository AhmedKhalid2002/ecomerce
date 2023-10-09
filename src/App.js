import Login from './components/login/Login'
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Products from './components/products/Products'
import Categories from './components/categories/Categories'
import Brands from './components/brands/Brands'
import Cart from './components/Cart/Cart'
import Register from './components/register/Register'
import Notfound from './components/notfound/Notfound'
import Home from './components/home/Home'
import Protected from './components/protected/Protected'
import ProductDetails from './components/productDetails/ProductDetails'
import { Offline } from "react-detect-offline";
import  { Toaster } from 'react-hot-toast';
import Whislist from './components/whislist/Whislist'
import Address from './components/Address/Address'
import Orders from './components/Order/Orders'
import Profile from './components/profile/Profile'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetPassword from './components/resetPassword/ResetPassword'
let routes=createHashRouter([
    {path:"/",element:<Layout/>,children:[
    {path:"/",element:<Home/>},
    {path:"products",element:<Products/>},
    {path:"productDetails/:id",element:<ProductDetails/>},
    {path:"categories",element:<Categories/>},
    {path:"brands",element:<Brands/>},
    {path:"address",element:<Protected><Address/></Protected>},
    {path:"allorders",element:<Protected><Orders/></Protected>},
    {path:"wishlist",element:<Protected><Whislist/></Protected>},
    {path:"cart",element:<Protected><Cart/></Protected>},
    {path:"profile",element:<Protected><Profile/></Protected>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"forgetPassword",element:<ForgetPassword/>},
    {path:"resetPassword",element:<ResetPassword/>},
    {path:"*",element:<Notfound/>},
  ]}
])
export default function App() {
  
  return (
    <>
      <div className=' offline'>
        <Offline >Only shown offline (surprise!)</Offline>
      </div>
      <RouterProvider router={routes}>
      </RouterProvider>
      <Toaster/>
    </>
  )
}
