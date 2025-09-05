import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonial")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.log(err));
  }, []);

  const dummyImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // fallback avatar

  return (
    <section className="py-12 sm:py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-purple-700">
        Testimonials
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="max-w-6xl mx-auto px-4"
        breakpoints={{
          320: { slidesPerView: 1 }, // 📱 Mobile
          640: { slidesPerView: 1 }, // Small screens
          768: { slidesPerView: 2 }, // Tablets
          1024: { slidesPerView: 3 }, // Laptops
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            <div className="p-6 sm:p-10 md:p-16 h-auto min-h-[320px] flex flex-col justify-center rounded-2xl shadow-lg bg-blue-600 text-white transition-transform duration-500">
              {/* Image */}
              <div className="flex justify-center mb-4">
               <img
  src={item.Image ? item.Image : dummyImage}
  alt={item.name}
  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-md"
/>
              </div>

              {/* Name & Title */}
              <h3 className="text-base sm:text-lg font-bold text-center">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm italic text-center opacity-90">
                {item.title}
              </p>

              {/* Message */}
              <p className="mt-3 text-center text-sm sm:text-base leading-relaxed">
                “{item.message}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSection;
