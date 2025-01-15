import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface CarouselProps {
  photos: string[];
}

const HotelCarousel: React.FC<CarouselProps> = ({ photos }) => {
  const imageBaseUrl = "https://media.travelartmedia.com/hotels/";

  return (
    <div>
      <Swiper
        loop
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} style={{ width: 310, height: "100%" }}>
            <img
              src={`${imageBaseUrl}${photo}`}
              alt={`Hotel Photo ${index + 1}`}
              style={{ width: "100%", height: 210, borderRadius: "10px 0px 0px 10px", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelCarousel;
