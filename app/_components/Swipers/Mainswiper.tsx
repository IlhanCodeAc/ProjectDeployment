"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Added Autoplay
import 'swiper/css';
import 'swiper/css/autoplay'; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import Image from 'next/image';
import summer from '../../maxresdefault.jpg';
import autumn from '../../maxresdefault (1).jpg';
import winter from '../../maxresdefault (2).jpg';
import React from 'react'

const Mainswiper = () => {
  return (
    <>
    <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, Navigation, Pagination]}
        >
          <SwiperSlide >
            <Image
              src={summer}
              alt="Summer"
              layout="responsive" 
              width={800}         
              height={600}       
            />
          </SwiperSlide>
          <SwiperSlide >
            <Image
              src={autumn}
              alt="Autumn"
              layout="responsive" 
              width={800}         
              height={600}        
            />
          </SwiperSlide>
          <SwiperSlide >
            <Image
              src={winter}
              alt="Winter"
              layout="responsive" 
              width={800}         
              height={600}        
            />
          </SwiperSlide>
        </Swiper>
    </>
  )
}

export default Mainswiper
