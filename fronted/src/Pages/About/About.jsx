// src/components/About.jsx
import React from "react";
import { BookOpen } from "lucide-react";

const About = () => {
  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 font-sans relative overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-bold text-blue-500 mb-5"
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 2.5rem)', // 30px → 40px
              lineHeight: '1.25',
            }}
          >
            Welcome to <span className="text-yellow-400">BTN Network</span>
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)', // 16px → 18px
              lineHeight: '1.65',
            }}
          >
            BTN Network is changing the way students learn and instructors teach to impart knowledge. The vision here is to make quality education accessible through home tutoring and online tutoring services, tailored to your time and goals. So no matter whether they need to master skills, prepare for an exam, or acquire a new skill, we will match students with the tutor that suits them.
          </p>
        </div>

        {/* Open Book Layout */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 lg:gap-10">
          {/* Left Page - Our Mission */}
          <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative z-10">
              <h3
                className="font-bold text-gray-800 mb-4 flex items-center gap-3"
                style={{ fontSize: '1.25rem' }}
              >
                <span className="text-blue-500 bg-blue-100/60 p-2 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </span>
                Our Mission
              </h3>
              <p
                className="text-gray-700 mb-3"
                style={{
                  fontSize: 'clamp(0.9375rem, 2.8vw, 1rem)',
                  lineHeight: '1.6',
                }}
              >
                We are committed to enabling teachers and students. We remove the concern from students seeking hire online tutors, linking them with confirmed professionals who provide home tutoring sessions according to students' specific requirements.
              </p>
              <p
                className="text-gray-700"
                style={{
                  fontSize: 'clamp(0.9375rem, 2.8vw, 1rem)',
                  lineHeight: '1.6',
                }}
              >
                Despite being a click away, our personal tutoring and online tutoring service can produce actual clear results — for both students requiring schooling assistance and examination beginner students.
              </p>
            </div>
            <div className="absolute bottom-5 right-5 text-blue-100 group-hover:text-blue-200 transition-colors">
              <BookOpen className="w-7 h-7 opacity-40 group-hover:opacity-80 group-hover:rotate-12 transition-all duration-300" />
            </div>
          </div>

          {/* Right Page - 21st Century Learning */}
          <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tl from-yellow-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative z-10">
              <h3
                className="font-bold text-gray-800 mb-4 flex items-center gap-3"
                style={{ fontSize: '1.25rem' }}
              >
                <span className="text-yellow-500 bg-yellow-100/60 p-2 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-5 h-5" />
                </span>
                21st Century Learning
              </h3>
              <p
                className="text-gray-700 mb-3"
                style={{
                  fontSize: 'clamp(0.9375rem, 2.8vw, 1rem)',
                  lineHeight: '1.6',
                }}
              >
                Education has also been changed & so have we. As a network, we utilize the most current digital tools to offer exceptional online tutoring services, in addition to convenient home tutoring.
              </p>
              <p
                className="text-gray-700"
                style={{
                  fontSize: 'clamp(0.9375rem, 2.8vw, 1rem)',
                  lineHeight: '1.6',
                }}
              >
                Every session is always designed to make education very impactful for modern learners.
              </p>
            </div>
            <div className="absolute top-5 left-5 flex gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full border border-gray-300"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full border border-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/50">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">Join Our Network Section</span>
          </div>
          <div className="mt-10">
            <h2
              className="font-bold text-blue-500 mb-5"
              style={{
                fontSize: 'clamp(1.875rem, 5vw, 2.5rem)',
                lineHeight: '1.25',
              }}
            >
              Start Learning with <span className="text-yellow-400">BTN Network</span>
            </h2>
            <p
              className="text-gray-600 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                lineHeight: '1.65',
              }}
            >
              Become a part of thousands of other learners experiencing educational achievement through our hire online tutors or home online tutoring services. In case you are a student requiring assistance or an academic referral, BTN Network is all about learning & connecting with qualified online instructors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;