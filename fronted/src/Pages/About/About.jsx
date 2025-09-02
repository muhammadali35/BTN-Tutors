// src/components/About.jsx
import React from "react";
import { BookOpen } from "lucide-react";

const About = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20 font-sans">
      {/* Book Container */}
      <div className="max-w-6xl mx-auto">
        {/* Book Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600">
            Welcome To <span className="text-yellow-400">BTN Network</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Pakistan’s preferred online tutor search portal.
          </p>
        </div>

        {/* Open Book Layout - Two Pages */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 lg:gap-8">
          
          {/* Left Page */}
          <div className="flex-1 bg-white p-8 md:p-10 rounded-r-none rounded-lg shadow-xl border border-gray-200 relative overflow-hidden">
            {/* Page Texture / Subtle Background */}
            <div 
              className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, #000000 24px, #000000 25px)`,
                pointerEvents: 'none'
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                Welcome to BTN Network, Pakistan’s preferred online tutor search portal. We provide you an online educational platform with the goal of pairing students and tutors together for home/online tuition lessons.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Our platform helps students connect with teachers that meet their requirements, covering a wide array of categories including School or College Tuition, Vocational Training, and Entrance Exam Coaching.
              </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-4 right-6 text-yellow-400">
              <BookOpen className="w-6 h-6 opacity-60" />
            </div>
          </div>

          {/* Right Page */}
          <div className="flex-1 bg-white p-8 md:p-10 rounded-l-none rounded-lg shadow-xl border border-gray-200 relative overflow-hidden">
            {/* Page Texture */}
            <div 
              className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, #000000 24px, #000000 25px)`,
                pointerEvents: 'none'
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">21st Century Learning</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                Education in the 21st century is ever-changing at a rapid pace. At BTN Network, we understand the importance of connecting with this "digital generation" of students.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Every student learns differently, so we individualize and develop the learning for each of our students to inspire them to achieve excellent results and self-confidence.
              </p>
            </div>

            {/* Staple 1 (Top Left) */}
            <div className="absolute top-6 left-6 w-1 h-1 bg-gray-600 rounded-full shadow-md"></div>
            <div className="absolute top-6 left-8 w-1 h-1 bg-gray-600 rounded-full shadow-md opacity-80"></div>
          </div>
        </div>

        {/* Bottom Center Highlight */}
        <div className="text-center mt-16 max-w-3xl mx-auto px-4">
          <BookOpen className="w-14 h-14 text-yellow-400 mx-auto mb-4 opacity-80" />
          <h4 className="text-2xl font-bold text-blue-600">
            Benefits Of <span className="text-yellow-500">Our Service</span>
          </h4>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Whether you want to achieve higher grades, prepare for competitive exams, or simply boost your confidence, BTN Network is here to help you succeed with personalized one-on-one tutoring.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;