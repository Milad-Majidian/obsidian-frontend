"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActiveProduct, SliderImage } from "../types";
import { sliderImages } from "../data/slides";


export function Slider() {
  const router = useRouter();
  const [activeSpot, setActiveSpot] = useState<ActiveProduct | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {/* {images.map((src, i) => ( */}
        {sliderImages.map((slide: SliderImage, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.imageSrc}
                alt={`slide-${index}`}
                fill
                priority
                className="object-cover"
                sizes="100vw"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay with text and search box */}
              <div className="absolute inset-0 bg-black/30 flex items-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
                    Make Your Interior More
                    <span className="block font-semibold">
                      Minimalistic & Modern
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Turn your room with plants into a lot more minimalist and
                    modern with ease and speed
                  </p>

                  {/* Search box */}
                  <div className="relative max-w-xl mx-auto">
                    <input
                      type="text"
                      placeholder="Search furniture"
                      className="w-full py-4 px-6 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg"
                    />
                    <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors">
                      Search
                    </button>
                  </div>
                </div>
              </div>
              {/* Product hotspots */}
              {slide.productHotspot.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute"
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                >
                  <button
                    onClick={() =>
                      setActiveSpot({ ...hotspot, slideId: hotspot.id })
                    }
                    className="w-6 h-6 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center shadow-md transition-all hover:scale-110"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </button>
                </div>
              ))}
              {activeSpot && (
                <div
                  style={{ top: `${activeSpot.y}%`, left: `${activeSpot.x}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-full mt-2"
                >
                  <div className="bg-white rounded-xl shadow-xl p-4 w-64">
                    <h3 className="font-semibold text-lg">
                      {activeSpot.name}
                    </h3>
                    <p className="text-gray-600">{activeSpot.price}</p>
                    <button
                      onClick={() => router.push(activeSpot.link || "#")}
                      className="mt-3 w-full rounded-lg bg-blue-600 text-white py-2 
                   hover:bg-blue-700 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Black gradient overlay (top) */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-black/100 to-transparent z-40" />
      {/* White gradient overlay (bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-white via-white/95 to-transparent z-20" />
    </div>
  );
}
