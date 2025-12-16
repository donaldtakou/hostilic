"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

interface CarouselItem {
  id: string
  image: string
  title?: string
  description?: string
}

interface ImageCarouselProps {
  items: CarouselItem[]
  autoplay?: boolean
  effect?: "slide" | "fade"
  className?: string
}

export default function ImageCarousel({
  items,
  autoplay = true,
  effect = "slide",
  className = "",
}: ImageCarouselProps) {
  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
        effect={effect}
        loop={true}
        className="rounded-xl overflow-hidden shadow-2xl"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src={item.image}
                alt={item.title || "Slide"}
                className="w-full h-full object-cover"
              />
              {(item.title || item.description) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                  <div className="p-6 md:p-8 lg:p-12 w-full">
                    {item.title && (
                      <h3 className="text-white text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-3 drop-shadow-2xl">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-white/95 text-sm md:text-base lg:text-lg max-w-2xl drop-shadow-xl">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
