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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonial")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.log(err));
  }, []);

  const dummyImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // fallback avatar

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-purple-700">
        Testimonials
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}


        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            <div className="p-16 h-96 flex flex-col justify-center rounded-2xl shadow-lg bg-blue-600 text-white transition-transform duration-500">
              {/* Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={
                    item.Image
                      ? `http://localhost:5000/uploads/testimonials/${item.Image}`
                      : dummyImage
                  }
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>

              {/* Name & Title */}
              <h3 className="text-lg font-bold text-center">{item.name}</h3>
              <p className="text-sm italic text-center opacity-90">{item.title}</p>

              {/* Message */}
              <p className="mt-3 text-center text-sm leading-relaxed line-clamp-3">
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
