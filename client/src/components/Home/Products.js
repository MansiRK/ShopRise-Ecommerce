import React, {useState, useEffect, useRef} from 'react'
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiHeartLine, 
  RiEyeLine} from "react-icons/ri"      // Eye open } from "react-icons/fi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Products = () => {
     const [auth, setAuth] = useAuth();
    //   const [products, setProducts] = useState([]);
      const [categories, setCategories] = useState([]);
    
      const [loading, setLoading] = useState([]);
      const [cart, setCart] = useCart();
      const navigate = useNavigate();

      const prevRef = useRef(null);
const nextRef = useRef(null);
      
//      const getAllProducts = async (limit) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`products?limit=${limit}`);
//       setLoading(false);
//       setProducts(res.data.products);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const limit = 10;
//     getAllProducts(limit);
//   }, []);

  const [timeLeft, setTimeLeft] = useState({
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
});

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      let { days, hours, minutes, seconds } = prev;

      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;

        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;

          if (hours > 0) {
            hours--;
          } else {
            hours = 23;

            if (days > 0) {
              days--;
            }
          }
        }
      }

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

const products = [
  {
    product_id: 1,
    product_name: "Product 1",
    product_price: 100
  },
  {
    product_id: 2,
    product_name: "Product 2",
    product_price: 200
  },
  {
    product_id: 3,
    product_name: "Product 3",
    product_price: 300
  }
];

  return (
   
       <div className="products-section container">
        <div className="eyebrow-text-div">
            <div className='eyebrow-div'></div>
            <h6>Today's</h6>
        </div>

        <div className="flash-sale-div">
            <div className="sale-div">
<h2 className="section-title">Flash Sales</h2>
            <div className="sale-timer-div">
                <div className="time-div">
                    <p>Days</p>
                    <h4>{String(timeLeft.days).padStart(2, "0")}</h4>
                </div>
                <span>:</span>
                <div className="time-div">
                    <p>Hours</p>
                    <h4>{String(timeLeft.hours).padStart(2, "0")}</h4>
                </div>
                <span>:</span>
                <div className="time-div">
                    <p>Minutes</p>
                    <h4>{String(timeLeft.minutes).padStart(2, "0")}</h4>
                </div>
                <span>:</span>
                <div className="time-div">
                    <p>Seconds</p>
                    <h4>{String(timeLeft.seconds).padStart(2, "0")}</h4>
                </div>
            </div>

            </div>
            
             <div className="swiper-navigation">
      <button ref={prevRef} className="swiper-prev-btn">
        <FiArrowLeft />
      </button>

      <button ref={nextRef} className="swiper-next-btn">
        <FiArrowRight />
      </button>
   </div>
        </div>
        
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
             navigation={{
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }}
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
            loop={true}
        >
          {products.map((product) => {
  return (
    <SwiperSlide key={product.product_id}>
      <div className="row align-items-center justify-content-center product-slide mt-5">
        <div className="product-card">
          <div className="product-img-div">
            <button className="wishlist-div product-card-btn">
                <RiHeartLine/>
            </button>
             <a href={`/product/${product.product_slug}`} className="view-div product-card-btn">
                <RiEyeLine/>
            </a>
            <img
              src={`/product-image/${product.product_id}`}
              className="card-img-top"
              alt={product.product_name}
            />
            
          <button className='cart-btn'>
            Add to cart
          </button>
          </div>

          <div className="product-details-div">
            <h6>{product.product_name}</h6>
            <p>${product.product_price}</p>
          </div>

        </div>

      </div>
    </SwiperSlide>
  );
})}
            
        
        
        </Swiper>
        
        </div>
  )
}

export default Products
