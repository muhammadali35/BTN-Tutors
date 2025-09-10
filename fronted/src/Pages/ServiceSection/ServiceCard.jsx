// src/components/ServicesCard.jsx
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Alevel from "../../assets/Olevel1.jpg"; // Default image
import axios from "axios";

function ServicesCard() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [services, setServices] = useState([]);

   // ✅ Vite Environment Variable
  const API_URL = import.meta.env.VITE_API_URL;
  
  

  // ✅ Fetch services from API
  useEffect(() => {
    axios
      .get(`${API_URL}/api/service`)
      .then((res) => {
        const data = res.data;

        if (Array.isArray(data)) {
          setServices(data);
        } else if (Array.isArray(data.findService)) {
          setServices(data.findService);
        } else if (Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setServices([]); // Ensure empty array on error
      });
  }, []);

  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
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
    <section ref={ref} className="relative bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mb-10 md:mb-16"
        >
          <p className="uppercase tracking-widest text-yellow-400 text-lg md:text-xl font-semibold">
            Our Programs
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-500 mt-3">
            Tutoring <span className="text-yellow-400">Services</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
            Tailored tutoring designed for academic success—empowering learners
            to achieve confidence, mastery, and top performance.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service._id || service.title}
                variants={variants}
                className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-80 sm:h-96"
              >
                {/* Background Image */}
                <img
                  src={
                    service.image
                      ? `${API_URL}/uploads/${service.image}`
                      : Alevel
                  }
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-3 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm sm:text-base px-4">
                    {service.description || service.desc || "No description available"}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No services available at the moment.
            </p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mt-14 md:mt-20"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/student-enroll"
              className="inline-block px-8 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
            >
              📚 Enroll Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesCard;