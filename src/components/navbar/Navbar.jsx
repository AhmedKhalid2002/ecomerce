import React, { useContext, useEffect } from 'react'
import logo from "../../images/freshcart-logo.svg"
import { NavLink, useNavigate } from 'react-router-dom'
import { UserToken } from '../../contex/userTokenContext'
import { CartContext } from '../../contex/cartContext';
export default function Navbar() {
    let {userToken,setUserToken}=useContext(UserToken);
    let {numcountProduct}=useContext(CartContext)
    let navigate=useNavigate();
    function signOut(){
        localStorage.removeItem('userToken');
        setUserToken(null)
        navigate('/login')
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" /></NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " to="/" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="products">products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="categories">categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="brands">brands</NavLink>
                        </li>
                        {
                            userToken !==null?<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="cart">Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="allorders">Order</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="profile">Profile</NavLink>
                            </li>
                            </>:''
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
                        {
                            userToken==null?<>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="login">login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="register">register</NavLink>
                                </li>
                            </>:<>
                                    <li className="nav-item me-3">
                                        <NavLink className="nav-link" to="/cart"><i className="fa-solid fa-cart-shopping fs-4 text-warning position-relative"><span className='fs-6 position-absolute start-100 top-0 text-black'>{numcountProduct?.numOfCartItems}</span></i></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="wishlist"><i className="fa-solid fa-heart fs-4 text-danger"></i></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={()=>signOut()}>LogOut</a>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
