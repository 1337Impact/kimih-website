"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ImageSwiper({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#fff",
          } as any
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full rounded-lg aspect-[3/2] object-cover"
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {mounted && (
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
              <img
                className="rounded-lg aspect-[3/2] object-cover cursor-pointer"
                src={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
