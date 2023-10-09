import React from 'react'
import axios  from 'axios'
import { useQuery } from 'react-query';
import Loding from '../Loding/Loding';
import { Helmet } from 'react-helmet';

export default function Categories() {
  
  async function getCategory(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let {data,isLoading}= useQuery("category",getCategory);
  let category=data?.data.data;
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="container mt-5">
        <div className="row g-4">
          {isLoading?<Loding/>:category?.map((category)=><div className='col-md-3 ' key={category._id}>
            <div className='shadow'>
              <img style={{height:"400px",objectFit:"cover"}} src={category.image} alt={category.name} className='w-100' />
              <p className='text-center p-4 text-main'>{category.name}</p>
            </div>
          </div>)}
        </div>
      </div>
    </>
  )
}
