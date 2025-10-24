// src/components/TestimonialSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios
      .get(`${API_URL}/api/testimonial`)
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.log(err));
  }, []);

  const dummyImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"; 

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-14 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
          Student  <span className="text-yellow-400"> & Parent Response Sentence</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Our learners & parents trust us because we provide outcomes. Read actual reviews from students who enhanced their grades & built confidence through our <span className="text-yellow-400 font-bold">home tutor & online tutoring</span>  degree programs.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={false}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="max-w-6xl mx-auto px-4"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            {/* ✅ Premium Card Design */}
            <div
              className="relative p-6 md:p-8 h-auto md:h-96 flex flex-col justify-center rounded-2xl shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-300 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

              {/* Profile Image */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 relative">
                  <img
                    src={
                      item.Image
                        ? `${API_URL}/uploads/testimonials/${item.Image.trim()}`
                        : dummyImage
                    }
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-sm animate-pulse"></div>
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="text-lg md:text-xl font-bold text-center mb-2">{item.name}</h3>
              <p className="text-sm md:text-base italic text-center opacity-90 mb-4">
                {item.title}
              </p>

              {/* Message */}
              <p className="text-center text-sm md:text-base leading-relaxed line-clamp-4">
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