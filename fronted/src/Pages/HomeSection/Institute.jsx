// src/components/Institute.jsx
import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// Import logos
import LACAS from "../../assets/lacas.png";
import Beaconhouse from "../../assets/beaconhouse.png";
import LahorGrammar from "../../assets/LahoreGrammar.png";
import CitySchool from "../../assets/CitySchool.png";
import KingColloege from "../../assets/King.png";
import MilestoneCollege from "../../assets/MilestoneCollege.png";
import aitchisonCollege from "../../assets/aitchisoncollege.png";

const Institute = () => {
  const institutions = [
    { name: "LACAS", alt: "Lahore American College", logo: LACAS },
    { name: "BCC", alt: "Beaconhouse College", logo: Beaconhouse },
    { name: "LGS", alt: "Lahore Grammar School", logo: LahorGrammar },
    { name: "City School", alt: "The City School", logo: CitySchool },
    { name: "KIMS", alt: "King's Institute of Modern Sciences", logo: KingColloege },
    { name: "Milestone", alt: "Milestone College", logo: MilestoneCollege },
    { name: "Aitchison", alt: "Aitchison College", logo: aitchisonCollege },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Attach navigation refs after mount
  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      // Swiper will use these buttons
    }
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="uppercase tracking-widest text-yellow-400 text-sm font-semibold">
            Our Educators
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mt-2 leading-tight">
            Expert Teachers from Pakistan's Premier{" "}
            <span className="text-yellow-400">Educational Institutions</span>
          </h2>
          <div className="w-20 h-0.5 bg-yellow-400 mx-auto my-4"></div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-4">
            Our teaching staff comprises highly qualified educators from Pakistan's most prestigious schools and colleges, bringing years of experience and expertise to deliver exceptional education.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 30,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            prevEl: prevRef.current ?? undefined,
            nextEl: nextRef.current ?? undefined,
          }}
          modules={[Autoplay, EffectCoverflow, Navigation]}
          className="max-w-6xl mx-auto relative"
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 2.3, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
        >
          {institutions.map((institution, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-yellow-100 h-48 flex items-center justify-center">
                <img
                  src={institution.logo}
                  alt={institution.alt}
                  className="w-36 sm:w-40 h-20 sm:h-24 object-contain opacity-90 hover:opacity-100 transition"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              ref={prevRef}
              className="bg-yellow-400 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-yellow-500 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} className="sm:size-6" />
            </button>
          </div>
          <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10">
            <button
              ref={nextRef}
              className="bg-yellow-400 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-yellow-500 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} className="sm:size-6" />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Institute;