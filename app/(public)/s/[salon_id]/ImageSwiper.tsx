"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


export default function ImageSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images =  [
    "https://images.unsplash.com/photo-1620331314222-c1cf9a9dbba4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXR5JTIwc2Fsb258ZW58MHx8MHx8fDI%3D",
    "https://images.unsplash.com/photo-1620331313174-3c6cfd5e292a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0eSUyMHNhbG9ufGVufDB8fDB8fHwy",
    "https://images.unsplash.com/photo-1506003094589-53954a26283f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXR5fGVufDB8fDB8fHwy",
  ];

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#fff',
        } as any}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className='w-full rounded-lg aspect-[3/2] object-cover' src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className='rounded-lg aspect-[3/2] object-cover' src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
