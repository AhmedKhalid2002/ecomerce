import React from 'react'
import payment from "../../images/pyment.png"
export default function Footer() {
  return (
    <>
    <div className="contain">
    <div className="footer bg-main-light p-5 ">
        <div className="container ">
            <div className="text">
                <h1>Get The Fresh Cart App</h1>
                <p>We will send you a link, open it on your phone to download the app</p>
            </div>
            <div className="share ">
                <div className="row g-3 ">
                    <div className="col-md-10">
                        <input type="email" className='form-control'/>
                    </div>
                    <div className="col-md-2">
                        <button className='btn bg-main text-white '>Share App Link</button>
                    </div>
                </div>
            </div>
            <div className="payment mt-5">
                    Payment Parteners<img src={payment} alt="payment" className='ms-3' />
            </div>
        </div>
    </div>
    </div>
    
    </>
  )
}
