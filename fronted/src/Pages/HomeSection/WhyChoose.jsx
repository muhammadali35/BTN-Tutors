import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, IdCard, BookOpen, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  // ✅ Features data
  const features = [
    {
      icon: GraduationCap,
      title: "Top-Rated Tutors",
      description:
        "Learn from highly qualified teachers who are experts in their subjects.",
      link: "/student-enroll",
    },
    {
      icon: IdCard,
      title: "Verified Profiles",
      description:
        "Every tutor is thoroughly vetted to ensure they meet our high standards.",
      link: "/student-enroll",
    },
    {
      icon: BookOpen,
      title: "Personalized Learning",
      description:
        "1-on-1 private classes with customized lessons tailored to your learning pace and goals.",
      link: "/student-enroll",
    },
    {
      icon: CalendarCheck,
      title: "Flexible Scheduling",
      description:
        "Learn at your own pace with classes that fit your busy schedule.",
      link: "/student-enroll",
    },
  ];

  // ✅ Hover state for animations
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ✅ Stats data
  const stats = [
    { label: "Tutors", value: 200 },
    { label: "Students", value: 100 },
    { label: "Resources", value: 200 },
    { label: "Global Connections", value: 4 },
  ];

  // ✅ Animated Counter State
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // ✅ Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Trigger counter animation when inView
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
          if (start === end) clearInterval(timer);
        }, stepTime);
      });
    } else {
      // Reset counts when section is out of view
      setCounts(stats.map(() => 0));
    }
  }, [inView]);

  return (
    <section className="pt-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
          Why Choose <span className="text-yellow-400">Us?</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg animate-fade-in-delay">
          We provide exceptional learning experiences with our carefully
          selected tutors and personalized approach.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className={`flex flex-col items-center p-6 bg-blue-500 rounded-xl shadow-md  transition-all duration-500 transform ${
                hoveredIndex === index ? "scale-105" : "hover:scale-102"
              } hover:shadow-xl`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div
                className={`p-4 bg-yellow-100 rounded-full mb-6 transition-all duration-500 ${
                  hoveredIndex === index ? "scale-110 rotate-12" : ""
                }`}
              >
                <feature.icon
                  className={`w-12 h-12 text-yellow-500 transition-all duration-500 ${
                    hoveredIndex === index ? "rotate-12" : ""
                  }`}
                />
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-semibold text-white mb-3 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "text-yellow-300 translate-y-0"
                    : "translate-y-1"
                }`}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className={`text-yellow-50 mb-6 text-sm ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-80 translate-y-1"
                }`}
              >
                {feature.description}
              </p>

              {/* Get Started */}
              <div
                className={`mt-4 flex items-center text-sm font-medium text-yellow-300 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <span>Get Started</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    hoveredIndex === index ? "translate-x-1" : ""
                  }`}
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

        {/* ✅ Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-300 border-t border-gray-300 my-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white py-8"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-blue-500">
                {counts[index]}+
              </h3>
              <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
