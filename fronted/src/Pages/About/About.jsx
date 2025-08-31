import React from "react";
import { BookOpen, Laptop, Home } from "lucide-react";

const About = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome To <span className="text-yellow-500">ETutors Academy</span>
        </h2>
        <p className="mt-6 text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Welcome to eTutors.pk, Pakistan’s preferred online tutor search portal.
          We provide you an online educational platform with the goal of pairing
          students and tutors together for home/online tuition lessons. Our
          platform helps students connect with teachers that meet their
          requirements, covering a wide array of categories including School or
          College Tuition, Vocational Training, and Entrance Exam Coaching.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Education in the 21st century is ever-changing at a rapid pace. At
          eTutors Academy, we understand the importance of connecting with this
          "digital generation" of students. Every student learns differently,
          so we individualize and develop the learning for each of our students
          to inspire them to achieve excellent results and self-confidence.
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Home Tuition */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-4 mb-4">
            <Home className="w-10 h-10 text-yellow-500" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Home Tuition
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Qualified, dedicated, and highly skilled professionals are providing
            services of home tuition all across Pakistan.
          </p>
        </div>

        {/* Online Tuition */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-4 mb-4">
            <Laptop className="w-10 h-10 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Online Tuition
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            With just a PC and fast internet, you can access quality education
            from the comfort of your home. Location is no longer a problem—we
            bring the best tutors to your study time online.
          </p>
        </div>
      </div>

      {/* Extra Highlight */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <BookOpen className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
        <h4 className="text-2xl font-bold text-gray-800">
          Benefits Of Our Service
        </h4>
        <p className="mt-4 text-gray-600">
          Whether you want to achieve higher grades, prepare for competitive
          exams, or simply boost your confidence, ETutors Academy is here to
          help you succeed with personalized one-on-one tutoring.
        </p>
      </div>
    </section>
  );
};

export default About;
