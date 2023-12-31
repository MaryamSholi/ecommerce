import React, { useContext } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Categories.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import Loader from '../../loader/Loader';

export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
    return data;
  }

  const x = useContext(CartContext);
  console.log(x);

  const { data, isLoading } = useQuery('web_categories', getCategories);
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className='container'>
      <div className='categories'>
        <div className='swiper-custom-pagination'></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={50}
          slidesPerView={6.3}
          navigation
          loop={true}
          autoplay={{
            delay: 3000
          }}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'

          }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data?.categories.length ? data?.categories.map((category) =>

            <SwiperSlide key={category._id}>
              <Link to={`/products/category/${category._id}`}>
                <div className='category'>
                  <img src={category.image.secure_url} className='rounded-circle' />
                </div>
              </Link>

            </SwiperSlide>

          ) : '<h2>no category found</h2>'}
        </Swiper>
      </div>
    </div>
  )
}
