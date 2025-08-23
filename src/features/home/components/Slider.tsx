"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type SliderProps = {
  images: string[];
};

export function Slider({ images }: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      slidesPerView={1}
      loop
      effect="fade"
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
    //   className="w-full h-[80vh]"
      className="w-full h-screen"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`slide-${i}`}
            // className="w-full h-full object-contain"
              className="flex items-center justify-center w-full h-[80vh] bg-center bg-no-repeat bg-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
