"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActiveProduct, SliderImage } from "../types";
import { sliderImages } from "../data/slides";
import { HotspotPopover } from "./HotspotPopover";
import { useState } from "react";

export function Slider() {
  const router = useRouter();
  const [activeHotspotId, setActiveHotspotId] = useState<null | number>(null);

  const popoverContent = (productDetail: ActiveProduct) => {
    return (
      <div className="space-y-1">
        <p className="font-medium">{productDetail.name}</p>
        <p className="text-sm opacity-80">€ {productDetail.price} · In stock</p>
        <button className="mt-2 px-3 py-1.5 rounded-lg bg-white/10 ring-1 ring-white/20 hover:bg-white/15">
          View details
        </button>
      </div>
    );
  };

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
        onSlideChange={() => setActiveHotspotId(null)} // Reset active hotspot on slide change
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
                  <HotspotPopover
                    xPct={productDetails.x}
                    yPct={productDetails.y}
                    popoverContent={popoverContent({
                      ...productDetails,
                      slideId: slide.id,
                    })}
                    open={activeHotspotId === productDetails.id}
                    onOpenChange={(open:boolean) =>
                      setActiveHotspotId(open ? productDetails.id : null)
                    }
                  />
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
