import React from 'react'
import axios  from 'axios'
import { useQuery } from 'react-query';
import Loding from '../Loding/Loding';
import { Helmet } from 'react-helmet';
export default function Brands() {

  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let {data,isLoading}= useQuery("Brand",getBrands);
  let brands=data?.data.data;
  console.log(data?.data.data);
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="container">
        <div className="row g-4">
          {isLoading?<Loding/>:brands?.map((brand)=><div className='col-md-3' key={brand._id}>
            <div>
              <img src={brand.image} alt={brand.name} />
            </div>
          </div>)}
        </div>
      </div>
    </>
  )
}
