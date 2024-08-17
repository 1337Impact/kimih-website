"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Mousewheel, Navigation } from "swiper/modules";
import BusinessReviewCard from "./business-review-card";
export default function Index({ reviews }: { reviews: any }) {
  const [slidesPerView, setSlidesPerView] = useState(2);

  const handleResize = () => {
    if (window.innerWidth <= 1042) {
      setSlidesPerView(1);
    } else {
      setSlidesPerView(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={30}
      navigation={true}
      mousewheel={true}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination, Mousewheel, Navigation]}
      className="w-full !py-10"
    >
      {reviews.map((review: any) => (
        <SwiperSlide key={review.id}>
          <BusinessReviewCard
            title={review.title}
            description={review.description}
            client_name={review.client_name}
            client_address={review.client_address}
            client_image={review.client_image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
