import React from "react";
import { BookOpen, } from "lucide-react";


const About = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 font-sans text-blue-500">
            Welcome To <span className="text-yellow-400">BTN Network</span>
          </h2>
       
        <p className="mt-6 text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Welcome to BTN Network, Pakistan’s preferred online tutor search portal.
          We provide you an online educational platform with the goal of pairing
          students and tutors together for home/online tuition lessons. Our
          platform helps students connect with teachers that meet their
          requirements, covering a wide array of categories including School or
          College Tuition, Vocational Training, and Entrance Exam Coaching.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Education in the 21st century is ever-changing at a rapid pace. At
          BTN Network, we understand the importance of connecting with this
          "digital generation" of students. Every student learns differently,
          so we individualize and develop the learning for each of our students
          to inspire them to achieve excellent results and self-confidence.
        </p>
      </div>

   

      {/* Extra Highlight */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <BookOpen className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
        <h4 className="text-2xl font-bold text-blue-500">
          Benefits Of <span className="text-yellow-400">Our Service</span>
        </h4>
        <p className="mt-4 text-gray-600">
          Whether you want to achieve higher grades, prepare for competitive
          exams, or simply boost your confidence, BTN Network is here to
          help you succeed with personalized one-on-one tutoring.
        </p>
      </div>
     
    </section>
  );
};

export default About;
