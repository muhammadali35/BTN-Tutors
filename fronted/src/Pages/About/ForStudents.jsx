// src/components/ForStudents.jsx
import React from "react";
import {
  Users,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import students from "../../assets/Studnet1.jpg";

const features = [
  {
    icon: Users,
    title: "Connect with Verified Tutors",
    desc: "With BTN Network, students hire a virtual tutoring to meet their learning goals and their schedule. Some of our tutors are from your local area, and every tutor is verified through a thorough screening process. Safety and quality are emphasized throughout the hiring process.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "We provide only trusted hire online tutors and private online tutoring services. Every tutor is verified to the highest educational standards that a tutor can be verified.",
  },
  {
    icon: MessageSquare,
    title: "Community Support & Tools",
    desc: "Today, students may also access our study groups, where tutors can answer questions, provide study materials, and/or offer scholarly advice on becoming a fast learner.",
  },
];

const ForStudents = () => {
  return (
    <section
      className="bg-white py-12 px-4 sm:px-6 md:px-8 lg:px-12 font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Content */}
        <div>
          <h2
            className="font-bold text-blue-500 mb-8"
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 2.5rem)', // 30px → 40px
              lineHeight: '1.2',
            }}
          >
            For <span className="text-yellow-400">Students</span>
          </h2>

          <div className="space-y-7">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 text-yellow-400">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-gray-900 mb-2"
                      style={{ fontSize: 'clamp(1.125rem, 3.5vw, 1.25rem)' }} // 18px → 20px
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{
                        fontSize: 'clamp(0.9375rem, 2.8vw, 1rem)', // 15px → 16px
                        lineHeight: '1.6',
                      }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={students}
            alt="For Students"
            className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ForStudents;