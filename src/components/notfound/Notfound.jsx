import React from 'react'
import { Helmet } from 'react-helmet'
import notFound from '../../images/error.svg'
export default function Notfound() {
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Not found</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <img src={notFound} alt="notfound" />
        </div>
    </>
  )
}
