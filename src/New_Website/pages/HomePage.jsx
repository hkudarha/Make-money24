import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Eye, Heart, Truck, RefreshCw, Shield, Clock } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals } from '../data/products';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import CountdownTimer from '../components/CountdownTimer';
import { getAllProducts } from '../../api/user.api';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from '../../assets/slider/3.jpg'
import img2 from '../../assets/slider/4.jpg'
import img3 from '../../assets/slider/5.jpg'
import HomePageAnimation from '../../Website/HomePageAnimation';
import PopupBanner from '../components/PopupBanner';
import BrandSlider from '../../Website/BrandSlider';
import CategoryGrid from '../../Website/CategoryGrid';

const HomePage = () => {

  const images = [
    img1,
    img2,
    img3,
  ];

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const getAllProductsList = async () => {
    try {
      const response = await getAllProducts();
      if (response?.data) {
        setFeaturedProducts(response?.data?.data)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductsList();
  }, []);



  return (
    <div className="flex flex-col min-h-screen">

      {/* <PopupBanner /> */}

      <section className="relative xl:h-[85vh] lg:h-[50vh] md:h-[25vh] sm:h-[23vh] h-[22vh] xl:mt-20 mt-16  overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* <div className="container-custom h-full flex flex-col justify-center relative z-10 pt-20">
                  <div className="max-w-xl animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                      Elevate Your <span className="text-accent-500">Style</span> With Premium Quality
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      Discover our curated collection of luxury goods designed for those who appreciate the finer things in life.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/products" className="btn-primary">
                        Shop Now <ArrowRight size={18} className="ml-2" />
                      </Link>
                      <Link to="/collections/new-arrivals" className="btn-outline border-white text-white hover:bg-white/10">
                        New Arrivals
                      </Link>
                    </div>
                  </div>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center md:mb-12 mb-5">
            <h2 className="text-xl md:text-2xl font-semibold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {featuredProducts
              .slice()
              .sort(() => Math.random() - 0.5)
              .slice(0, 8)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

        </div>
      </section>

      <section className="bg-white">
        <div className='md:p-10 p-3 '>
          <HomePageAnimation />
        </div>
      </section>

      <section className="">
        <div className="md:px-10 p-3">
          <CategoryGrid />
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container-custom">
          <div className="text-center md:mb-12 mb-5">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest additions, carefully curated to stay ahead of trends.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {featuredProducts.slice().reverse().slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-5 bg-white">
        <div className="">
          <BrandSlider />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
