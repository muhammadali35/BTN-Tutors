// src/components/About.jsx
import React from "react";
import { BookOpen } from "lucide-react";

const About = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 md:px-12 lg:px-20 font-sans relative overflow-hidden">
      {/* Optional: Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
            Welcome to  <span className="text-yellow-400"> BTN Network</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Pakistan’s most trusted online tutor search platform — connecting students and educators with ease.</p>
        </div>


        {/* Open Book Layout */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 lg:gap-10">

          {/* Left Page - Our Mission (Glassmorphism) */}
          <div
            className="flex-1 p-8 md:p-10 rounded-r-none md:rounded-r-2xl rounded-2xl 
                       bg-white/80 backdrop-blur-xl border border-white/30 
                       shadow-xl hover:shadow-2xl 
                       transform transition-all duration-300 hover:scale-103 hover:-translate-y-1
                       relative overflow-hidden group"
          >
            {/* Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="text-blue-500 bg-blue-100/60 p-2 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </span>
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                At BTN Network, we aim to bridge the gap between students and qualified tutors across Pakistan. Whether it's school, college, or competitive exam prep — we make learning simple, personal, and effective.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Our platform empowers both learners and educators with smart matching, flexible scheduling, and secure communication.
              </p>
            </div>

            {/* Decorative Icon */}
            <div className="absolute bottom-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
              <BookOpen className="w-8 h-8 opacity-40 group-hover:opacity-80 group-hover:rotate-12 transition-all duration-300" />
            </div>
          </div>

          {/* Right Page - 21st Century Learning (Glassmorphism) */}
          <div
            className="flex-1 p-8 md:p-10 rounded-l-none md:rounded-l-2xl rounded-2xl 
                       bg-white/80 backdrop-blur-xl border border-white/30 
                       shadow-xl hover:shadow-2xl 
                       transform transition-all duration-300 hover:scale-103 hover:-translate-y-1
                       relative overflow-hidden group"
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tl from-yellow-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="text-yellow-500 bg-yellow-100/60 p-2 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </span>
                21st Century Learning
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                Education is evolving — and so are we. BTN Network embraces digital learning to connect with today’s tech-savvy students and modern teaching methods.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                We believe in personalized, one-on-one tutoring that adapts to each student’s pace, style, and goals — helping them build confidence and achieve excellence.
              </p>
            </div>

            {/* Staples */}
            <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-inner border border-gray-300"></div>
            <div className="absolute top-6 left-9 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-inner border border-gray-300"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <span className="text-gray-700 font-medium">Ready to find your perfect tutor?</span>
          </div>
          <div className="text-center mt-10">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
              Start Learning with  <span className="text-yellow-400"> BTN Network</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Join hundreds of students who are already achieving their academic goals with personalized, flexible, and affordable tutoring.</p>
          </div>


        </div>
      </div>
    </section>
  );
};

export default About;