import React from "react";
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
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          coverflowEffect={{
             rotate: 30,
            stretch: 50,
           depth: 300,
          modifier: 2,
         slideShadows: true,
          }}
          navigation={true}
          modules={[Autoplay, EffectCoverflow, Navigation]}
          className="max-w-6xl mx-auto"
        >
          {institutions.map((institution, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border  h-56 flex items-center justify-center">
                <img
                  src={institution.logo}
                  alt={institution.alt}
                  className="w-40 h-28 object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Institute;
