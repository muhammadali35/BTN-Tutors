import React from 'react';
import LACAS from "../../assets/lacas.png"
import Beaconhouse from "../../assets/beaconhouse.png"
import LahorGrammar from "../../assets/LahoreGrammar.png"
import CitySchool from "../../assets/CitySchool.png"
import KingColloege from "../../assets/King.png"
import MilestoneCollege from "../../assets/MilestoneCollege.png"
import aitchisonCollege from "../../assets/aitchisoncollege.png"

const Institute = () => {
  const institutions = [
    { name: "LACAS", alt: "LACAS - Lahore American College", logo: LACAS },
    { name: "BCC", alt: "Beaconhouse College", logo: Beaconhouse },
    { name: "LGS", alt: "Lahore Grammar School", logo: LahorGrammar },
    { name: "City School", alt: "City School", logo: CitySchool },
    { name: "KIMS", alt: "King's Institute of Modern Sciences", logo: KingColloege },
    { name: "Milestone", alt: "Milestone College", logo: MilestoneCollege },
    { name: "Aitchison College", alt: "Aitchison College", logo: aitchisonCollege }
  ];

  return (
    <div className="bg-white py-12 sm:py-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 max-w-4xl mx-auto">
          <h3 className="uppercase tracking-widest text-yellow-400 text-base sm:text-lg md:text-xl font-semibold font-sans">
            Our Educators
          </h3>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
            Expert Teachers from Pakistan's Premier{" "}
            <span className="text-yellow-400">Educational Institutions</span>
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-yellow-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="mt-3 sm:mt-4 text-gray-600 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed font-sans text-sm sm:text-base">
            Our teaching staff comprises highly qualified educators from
            Pakistan's most prestigious schools and colleges, bringing years of
            experience and expertise to deliver exceptional education.
          </p>
        </div>

        {/* Logos Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {institutions.map((institution, index) => (
            <div
              key={index}
              className="group w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
              role="figure"
              aria-label={institution.alt}
            >
              <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-400">
                <img
                  src={institution.logo}
                  alt={institution.alt}
                  className="w-full h-16 sm:h-20 md:h-24 object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Institute;
