// src/components/Institute.jsx
import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import LACAS from "../../assets/lacas.png";
import Beaconhouse from "../../assets/beaconhouse.png";
import LahorGrammar from "../../assets/LahoreGrammar.png";
import CitySchool from "../../assets/CitySchool.png";
import KingColloege from "../../assets/King.png";
import MilestoneCollege from "../../assets/MilestoneCollege.png";
import aitchisonCollege from "../../assets/aitchisoncollege.png";

const Institute = () => {
  const scrollRef = useRef(null);

  const institutions = [
    { name: "LACAS", alt: "LACAS - Lahore American College", logo: LACAS },
    { name: "BCC", alt: "Beaconhouse College", logo: Beaconhouse },
    { name: "LGS", alt: "Lahore Grammar School", logo: LahorGrammar },
    { name: "City School", alt: "City School", logo: CitySchool },
    { name: "KIMS", alt: "King's Institute of Modern Sciences", logo: KingColloege },
    { name: "Milestone", alt: "Milestone College", logo: MilestoneCollege },
    { name: "Aitchison College", alt: "Aitchison College", logo: aitchisonCollege },
  ];

  // 🔁 Duplicate for seamless loop
  const duplicatedInstitutions = [...institutions, ...institutions];

  // ✅ Get responsive scroll amount
  const getScrollAmount = () => {
    if (window.innerWidth >= 1024) return 320;
    if (window.innerWidth >= 768) return 280;
    return 240;
  };

  // 🔁 Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;
      const scrollAmount = getScrollAmount();

      if (scrollLeft >= maxScrollLeft - 5) {
        container.scrollTo({ left: 0, behavior: "auto" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Manual scroll
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = getScrollAmount();
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white py-10 sm:py-12 md:py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto">
          <h3 className="uppercase tracking-widest text-yellow-400 text-xs sm:text-sm md:text-base font-semibold">
            Our Educators
          </h3>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500 mt-2 mb-3 leading-tight">
            Expert Teachers from Pakistan's Premier{" "}
            <span className="text-yellow-400">Educational Institutions</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-4">
            Our teaching staff comprises highly qualified educators from Pakistan's most prestigious schools and colleges, bringing years of experience and expertise to deliver exceptional education.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-white p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-transform hover:scale-110 focus:outline-none sm:p-3"
            aria-label="Previous logos"
          >
            <ChevronLeft size={20} className="sm:size-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-4 lg:gap-4 overflow-x-auto px-8 sm:px-10 py-3 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {duplicatedInstitutions.map((institution, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 sm:w-32 md:w-36 lg:w-40 xl:w-48"
                role="figure"
                aria-label={institution.alt}
              >
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-300">
                  <img
                    src={institution.logo}
                    alt={institution.alt}
                    className="w-full h-16 sm:h-20 md:h-22 lg:h-24 object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 text-white p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-transform hover:scale-110 focus:outline-none sm:p-3"
            aria-label="Next logos"
          >
            <ChevronRight size={20} className="sm:size-6" />
          </button>
        </div>
      </div>

      {/* 👇 Inline Tailwind scrollbar hide */}
      {/* No extra CSS file needed */}
    </div>
  );
};

export default Institute;