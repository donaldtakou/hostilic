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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                  {item.title && (
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-white/90 text-lg max-w-2xl">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
