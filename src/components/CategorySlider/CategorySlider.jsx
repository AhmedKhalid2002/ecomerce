import React from 'react'
import axios  from 'axios'
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
    async function getCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      }
      let {data}= useQuery("category",getCategory);
      let category=data?.data.data;
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
      };
  return (
    <>
        <div className="container mt-3">
                { category?<Slider {...settings}>
                    {category.map((categories)=><img height={300} key={categories._id}  src={categories.image} alt={categories.name} className='w-100'/>)}
                    </Slider>:''
                }
        </div>
    </>
  )
}
