// src/pages/EnrollSection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import studentImg from "../../assets/EnrollStu1.jpg";
import tutorImg from "../../assets/tutorAp.jpg";

function EnrollSection() {
  const cards = [
    {
      title: "Enroll as Student",
      description: "Start your learning journey with expert tutors and structured programs.",
      img: studentImg,
      link: "/student-enroll",
      overlayOpacity: "bg-black/30",
    },
    {
      title: "Register as Tutor",
      description: "Share your knowledge and grow with Pakistan's leading tutoring network.",
      img: tutorImg,
      link: "/tutor-register",
      overlayOpacity: "bg-black/50",
    },
  ];

  return (
    <section
      className="relative bg-white font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="font-extrabold text-blue-500"
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 3rem)', // 30px → 48px responsive
              lineHeight: '1.2',
            }}
          >
            Join Your <span className="text-yellow-400">Academy Today</span>
          </h2>
          <p
            className="mt-4 md:mt-5 text-gray-600 max-w-xl md:max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(0.875rem, 2.8vw, 1rem)', // 14px → 16px
              lineHeight: '1.65',
            }}
          >
            If you are a student and need a home tutor, or you are an outstanding teacher with a passion for teaching online, please join us at Best Teacher's Network. Begin your education or teaching journey with Pakistan’s reliable tutoring platform.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform group h-64 sm:h-72 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className={`absolute inset-0 ${card.overlayOpacity}`}></div>
              <div className="relative z-10 text-center text-white px-6">
                <h3
                  className="font-bold text-yellow-400 mb-4 sm:mb-6"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }} // 20px → 24px
                >
                  {card.title}
                </h3>
                <Link
                  to={card.link}
                  className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:bg-yellow-500 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  {card.title.includes("Student") ? "Become a Student Enroller" : "Register as a Tutor"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnrollSection;