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
import { ProductHotspot } from "./ProductHotspot";
// import { ActiveHotspotPopover } from "./ActiveHotspotPopover";

export function Slider() {
  const router = useRouter();

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
              {slide.productHotspot.map((productDetails) => (
                <div key={productDetails.id}>
                   <ProductHotspot
                     productDetails={productDetails}
                  />

                  {/* <ProductHotspot
                    x={productDetail.x}
                    y={productDetail.y}
                    active={activeId === hotspot.id}
                    onClick={() =>
                      setActiveId(activeId === hotspot.id ? null : hotspot.id)
                    }
                  /> */}

                  {/* <HotspotWithPopover
                    key={hotspot.id}
                    hotspot={hotspot}
                    open={activeId === hotspot.id}
                    renderContent={(h) => (
                      <div>
                        <div className="font-semibold">{h.name}</div>
                        <div className="text-sm text-gray-500">{h.price}</div>
                      </div>
                    )}
                  /> */}
                  {/* {activeId === hotspot.id && (
                    <div
                      className="absolute"
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: "translate(-50%, -175%)",
                      }}
                    >
                      <ActiveHotspotPopover>
                        <span className="font-medium">{hotspot.name}</span>
                        <span className="text-gray-200">{hotspot.price}</span>
                      </ActiveHotspotPopover>

                    </div>
                  )} */}
                  {/* <div
                    className="absolute"
                     style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                       transform: "translate(-50%, -175%)",
                     }}
                  >
                    <ActiveHotspotPopover open={activeId === hotspot.id}>
                      <div>
                        <h4 className="font-semibold">{hotspot.name}</h4>
                        <p className="text-sm text-gray-400">{hotspot.price}</p>
                      </div>
                    </ActiveHotspotPopover>
                  </div> */}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Black gradient overlay (top) */}
      {/* <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-black/100 to-transparent z-40" /> */}
      {/* White gradient overlay (bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-white via-white/95 to-transparent z-20" />
    </div>
  );
}
