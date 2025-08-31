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
    <section ref={ref} className="relative bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-widest text-blue-600 text-sm font-medium">
            Our Programs
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
            Tutoring <span className="text-yellow-500">Services</span>
          </h2>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tailored tutoring designed for academic success—empowering learners
            to achieve confidence, mastery, and top performance.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="grid md:grid-cols-2 gap-10"
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              variants={variants}
              // whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group border-2 border-yellow-300"
            >
              {/* Image */}
              <motion.div className="w-full h-64 overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Content */}
              <div className="p-6 text-center">
                <motion.h3
                  whileHover={{ color: "#f59e0b" }}
                  className="text-2xl font-bold text-gray-800 mb-3 transition"
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mt-20"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/student-enroll"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold shadow-xl hover:from-blue-700 hover:to-indigo-700 transition"
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
