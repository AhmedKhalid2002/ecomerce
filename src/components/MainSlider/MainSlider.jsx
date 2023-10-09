import React from 'react';
import Slider from "react-slick";
import slider1 from  "../../images/slider-image-1.jpeg";
import slider2 from '../../images/slider-image-2.jpeg'
import slider3 from '../../images/slider-image-3.jpeg'
import blog1 from '../../images/blog-img-1.jpeg'
import blog2 from '../../images/blog-img-2.jpeg'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
      };
  return (
    <div className="container">
        <div className="row g-0 mt-4">
            <div className="col-md-8 ">
                <Slider {...settings}>
                    <div>
                        <img src={slider1} alt="slider1" className='w-100' style={{height:"400px",objectFit:"cover"}} />
                    </div>
                    <div>
                        <img src={slider2} alt="slider2" className='w-100' style={{height:"400px",objectFit:"cover"}} />
                    </div>
                    <div>
                        <img src={slider3} alt="slider3" className='w-100' style={{height:"400px",objectFit:"cover"}} />
                    </div>
                </Slider>
            </div>
            <div className="col-md-4">
                <img src={blog1} alt="blog1"  className='w-100'  style={{height:"200px",objectFit:"cover"}}/>
                <img src={blog2} alt="blog2" className='w-100'  style={{height:"200px",objectFit:"cover"}} />
            </div>
        </div>
    </div>
  )
}
