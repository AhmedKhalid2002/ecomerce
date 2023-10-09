import jwtDecode from 'jwt-decode';
import React from 'react'

export default function Profile() {
    const result=jwtDecode(localStorage.getItem('userToken'));
  return (
    <>
        <div className="container">
            <div className='mt-5 d-flex flex-column justify-content-center align-items-center '>
                <h1 className='shadow p-5 w-50 text-center '>Hello: <span className='text-success'>{result.name}</span></h1>
            </div>
        </div>
    </>
  )
}
