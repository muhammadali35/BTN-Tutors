// src/components/WhyChooseUs.jsx
import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, IdCard, BookOpen, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Best Tutors",
      description: "Learn from highly qualified teachers who are experts in their subjects.",
      link: "/student-enroll",
    },
    {
      icon: IdCard,
      title: "Confirmed Profiles",
      description: "Every tutor is thoroughly vetted to ensure they meet our high standards.",
      link: "/student-enroll",
    },
    {
      icon: BookOpen,
      title: "Personalized Learning",
      description: "1-on-1 private classes with customized lessons tailored to your learning pace and goals.",
      link: "/student-enroll",
    },
    {
      icon: CalendarCheck,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with classes that fit your busy schedule.",
      link: "/student-enroll",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const stats = [
    { label: "Tutors", value: 30},
    { label: "Learners", value:  40  },
    { label: "Materials", value: 30  },
    { label: " Global Connection", value: 2 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, i) => {
        let start = 0;
        const end = stat.value;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / end), 20);

        const timer = setInterval(() => {
          start += 1;
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] = start;
            return newCounts;
          });
          if (start >= end) {
            clearInterval(timer);
            setCounts((prev) => {
              const newCounts = [...prev];
              newCounts[i] = end;
              return newCounts;
            });
          }
        }, stepTime);
      });
    }
  }, [inView]);

  return (
    <section
      className="pt-20 pb-16 bg-white font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2
          className="font-bold text-blue-500 mb-4"
          style={{
            fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', // 30px → 36px
            lineHeight: '1.25',
          }}
        >
          Why Choose <span className="text-yellow-400">Best Teacher's Network?</span>
        </h2>
        <p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)', // 16px → 18px
            lineHeight: '1.65',
          }}
        >
          We offer well-organized, results-oriented home tutor and online tutoring, tailored specifically to you. Our staff offers safety, background-checked profiles, and scheduling convenience — making learning easy, effective, and individualized.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className={`flex flex-col items-center p-6 bg-blue-500 rounded-xl shadow-md transition-all duration-500 transform hover:scale-102 ${
                hoveredIndex === index ? "scale-105" : ""
              } hover:shadow-xl`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`p-4 bg-yellow-100 rounded-full mb-5 transition-all duration-500 ${
                  hoveredIndex === index ? "scale-110 rotate-12" : ""
                }`}
              >
                <feature.icon
                  className={`w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 transition-all duration-500 ${
                    hoveredIndex === index ? "rotate-12" : ""
                  }`}
                />
              </div>

              <h3
                className={`font-semibold text-white mb-3 transition-all duration-300 ${
                  hoveredIndex === index ? "text-yellow-300" : ""
                }`}
                style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.25rem)' }} // 18px → 20px
              >
                {feature.title}
              </h3>

              <p
                className={`text-yellow-50 mb-5 text-sm sm:text-base transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-90"
                }`}
                style={{ lineHeight: '1.5' }}
              >
                {feature.description}
              </p>

              <div
                className={`flex items-center text-sm font-medium text-yellow-300 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <span>Get Started</span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-300 border-t border-gray-300 mt-16 pt-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center py-4">
              <h3
                className="font-bold text-blue-500"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 2.5rem)', // 32px → 40px
                }}
              >
                {counts[index]}+
              </h3>
              <p
                className="text-gray-600 font-medium mt-2"
                style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }} // 14px → 16px
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;