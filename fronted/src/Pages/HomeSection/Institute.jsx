// src/components/Institute.jsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import LACAS from "../../assets/lacas.png";
import Beaconhouse from "../../assets/beaconhouse.png";
import LahorGrammar from "../../assets/LahoreGrammar.png";
import CitySchool from "../../assets/CitySchool.png";
import KingColloege from "../../assets/King.png";
import MilestoneCollege from "../../assets/MilestoneCollege.png";
import aitchisonCollege from "../../assets/aitchisoncollege.png";

const Institute = () => {
  const institutions = [
    { name: "LACAS", alt: "LACAS - Lahore American College", logo: LACAS },
    { name: "BCC", alt: "Beaconhouse College", logo: Beaconhouse },
    { name: "LGS", alt: "Lahore Grammar School", logo: LahorGrammar },
    { name: "City School", alt: "City School", logo: CitySchool },
    { name: "KIMS", alt: "King's Institute of Modern Sciences", logo: KingColloege },
    { name: "Milestone", alt: "Milestone College", logo: MilestoneCollege },
    { name: "Aitchison College", alt: "Aitchison College", logo: aitchisonCollege },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-white py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h3 className="uppercase tracking-widest text-yellow-400 text-sm font-semibold">
            Our Educators
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mt-2 mb-3 leading-tight">
            Expert Teachers from Pakistan's Premier{" "}
            <span className="text-yellow-400">Educational Institutions</span>
          </h2>
          <div className="w-20 h-0.5 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed px-4">
            Our teaching staff comprises highly qualified educators from
            Pakistan's most prestigious schools and colleges, bringing years of
            experience and expertise to deliver exceptional education.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 20,
            stretch: 30,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            prevEl: prevRef.current ? prevRef.current : undefined,
            nextEl: nextRef.current ? nextRef.current : undefined,
          }}
          modules={[Autoplay, EffectCoverflow, Navigation]}
          className="max-w-6xl mx-auto relative"
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2.3 }, // Tablet
            768: { slidesPerView: 3 }, // Small laptop
            1024: { slidesPerView: 4 }, // Desktop
          }}
        >
          {institutions.map((institution, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-yellow-200 h-48 flex items-center justify-center">
                <img
                  src={institution.logo}
                  alt={institution.alt}
                  className="w-36 sm:w-40 h-20 sm:h-24 object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
            <button
              ref={prevRef}
              className="bg-yellow-400 text-white p-2 rounded-full shadow-lg hover:bg-yellow-500 transition hover:scale-110 focus:outline-none"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
            <button
              ref={nextRef}
              className="bg-yellow-400 text-white p-2 rounded-full shadow-lg hover:bg-yellow-500 transition hover:scale-110 focus:outline-none"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Institute;
