import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import matric from "../../assets/tutorStu2.webp";
import Alevel from "../../assets/Olevel1.jpg";

const services = [
  {
    title: "O & A Levels",
    desc: "Cambridge/Edexcel syllabi, exam strategies, and topic-wise masterclasses.",
    img: Alevel,
  },
  {
    title: "Matric (9th & 10th)",
    desc: "Board-focused prep, past papers, and timed mocks for top grades.",
    img: matric,
  },
];

function ServicesCard() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,  // ✅ run again whenever in view
    threshold: 0.3,      // ✅ 30% visible then trigger
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // ✅ reset animation when out of view
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative bg-white text-gray-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mb-10 md:mb-16"
        >
          <p className="uppercase tracking-widest text-yellow-400 text-lg md:text-xl font-semibold md:font-medium font-sans">
            Our Programs
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 font-sans text-blue-400">
            Tutoring <span className="text-yellow-400">Services</span>
          </h2>
          <p className="mt-4 md:mt-5 text-gray-600 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-sans">
            Tailored tutoring designed for academic success—empowering learners to achieve confidence, mastery, and top performance.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10"
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              variants={variants}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group border-2 border-yellow-300 flex flex-col"
            >
              {/* Image */}
              <motion.div className="w-full h-48 sm:h-64 overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Content */}
              <div className="p-4 sm:p-6 text-center flex-1 flex flex-col justify-center font-sans">
                <motion.h3
                  whileHover={{ color: "#f59e0b" }}
                  className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 transition font-sans"
                  style={{ color: '#f59e0b' }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mt-14 md:mt-20"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/student-enroll"
              className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-yellow-500 transition"
            >
              Enroll Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesCard;
