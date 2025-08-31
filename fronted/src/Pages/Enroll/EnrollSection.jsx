// src/pages/EnrollSection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import studentImg from "../../assets/EnrollStu1.jpg";
import tutorImg from "../../assets/tutorAp.jpg";

function EnrollSection() {
  return (
    <section className="relative bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        {/* Title */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 font-sans text-blue-800">
            Join Our <span className="text-yellow-400">Academy</span>
          </h2>
          <p className="mt-4 md:mt-5 text-gray-600 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-sans">
            Enroll today as a student or register as a tutor to start your journey with us.
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {/* Student Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group h-64 sm:h-72 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Background Image */}
            <img
              src={studentImg}
              alt="Student Enroll"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white font-sans">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400 font-sans">Enroll as Student</h3>
              <Link
                to="/student-enroll"
                className="px-6 sm:px-8 py-2 sm:py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-yellow-500 transition font-sans"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>

          {/* Tutor Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group h-64 sm:h-72 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Background Image */}
            <img
              src={tutorImg}
              alt="Tutor Register"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white font-sans">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400 font-sans">Register as Tutor</h3>
              <Link
                to="/tutor-register"
                className="px-6 sm:px-8 py-2 sm:py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-yellow-500 transition font-sans"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EnrollSection;
