// src/pages/EnrollSection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import studentImg from "../../assets/EnrollStu1.jpg";
import tutorImg from "../../assets/tutorAp.jpg";

function EnrollSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Join Our <span className="text-blue-600">Academy</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Enroll today as a student or register as a tutor to start your journey with us.
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Student Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group h-72 flex items-center justify-center"
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
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl font-bold mb-6">Enroll as Student</h3>
              <Link
                to="/student-enroll"
                className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-300 transition"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>

          {/* Tutor Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group h-72 flex items-center justify-center"
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
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl font-bold mb-6">Register as Tutor</h3>
              <Link
                to="/tutor-register"
                className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-300 transition"
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
