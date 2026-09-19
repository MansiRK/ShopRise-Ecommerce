import React, {useState, useEffect} from 'react'
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {FiArrowRight} from "react-icons/fi";

const Banner = () => {

     const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();


   const getAllCategories = async (limit) => {
    try {
      setLoading(true);
      const res = await axios.get(`categories?limit=${limit}`);
      setLoading(false);
      setCategories(res.data.category);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const limit = 10;
    getAllCategories(limit);
  }, []);

  return (
      <div className='banner-section container'>
        <div className='row align-items-center justify-content-between'>
            <div className='col-lg-2 categories-div'>
            {categories?.map((category) => (
                          <div className="category-div" key={category.category_id}>
            <a href={`/category/${category.category_slug}`} className="category-link">
            {category.category_name}
                            </a>
                            </div>
            ))}
            </div>

            <div className='col-lg-10'>
                 <div className="banner-div">
       
        <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    pagination={{ clickable: true }}
    autoplay={{
        delay: 3000,
        disableOnInteraction: false,
    }}
    loop={true}
>
    <SwiperSlide>
        <div className="row align-items-center justify-content-center banner-slide">
            <div className="col-lg-5 banner-text-div">
                <h1 className="text-white">
                    Up to 10% off Voucher
                </h1>

                <a href="/" className="banner-btn">
                    <h5>Shop Now</h5>
                    <FiArrowRight />
                </a>
            </div>

            <div className="col-lg-7 banner-img-div">
                <img
                    src="./images/banner/banner1.png"
                    className="img-fluid"
                    alt="banner"
                />
            </div>
        </div>
    </SwiperSlide>

    <SwiperSlide>
        <div className="row align-items-center justify-content-center banner-slide">
            <div className="col-lg-5 banner-text-div">
                <h2 className="text-white">
                    Up to 10% off Voucher
                </h2>

                <a href="/" className="banner-btn">
                    <h5>Shop Now</h5>
                    <FiArrowRight />
                </a>
            </div>

            <div className="col-lg-7 banner-img-div">
                <img
                    src="./images/banner/banner2.png"
                    className="img-fluid"
                    alt="banner"
                />
            </div>
        </div>
    </SwiperSlide>

    <SwiperSlide>
        <div className="row align-items-center justify-content-center banner-slide">
            <div className="col-lg-5 banner-text-div">
                <h2 className="text-white">
                    Up to 10% off Voucher
                </h2>

                <a href="/" className="banner-btn">
                    <h5>Shop Now</h5>
                    <FiArrowRight />
                </a>
            </div>

            <div className="col-lg-7 banner-img-div">
                <img
                    src="./images/banner/banner3.png"
                    className="img-fluid"
                    alt="banner"
                />
            </div>
        </div>
    </SwiperSlide>


</Swiper>

       
      </div>
            </div>

        </div>
      </div>

  )
}

export default Banner
