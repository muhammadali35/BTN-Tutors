// src/components/ServicesCard.jsx
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Alevel from "../../assets/Olevel1.jpg";
import axios from "axios";

function ServicesCard() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [services, setServices] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
        setServices([]);
      });
  }, []);

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
    <section ref={ref} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mb-10 md:mb-16"
        >
          <p className="uppercase tracking-widest text-yellow-400 text-lg md:text-xl font-semibold font-sans">
            Our Programs
          </p>
          <h2
            className="font-sans font-extrabold text-blue-500 mt-3"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(1.875rem, 4vw, 3rem)', // 30px → 48px responsive
              lineHeight: '1.2',
            }}
          >
            Personalized <span className="text-yellow-400">Tutoring Services</span> Based on Individual Learning Styles
          </h2>
          <p
            className="mt-5 text-gray-600 max-w-2xl mx-auto font-sans "
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.0625rem', // ~17px
              lineHeight: '1.65', // better readability
            }}
          >
            Our home tutor and online tutoring programs are designed to meet students where they are, at their individual pace, and on whatever journey they hope to achieve academically. Our tutoring programs, from Primary, GCE O and A levels, to every institute we support, offer one-on-one tutoring programs that develop strong basic ideas, which builds confidence and helps academic excellence.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => {
              const serviceTitle = service.title || "Untitled Service";
              const serviceDesc = service.description || service.desc || "No description available";
              const imageUrl = service.image
                ? `${API_URL}/uploads/${service.image}`
                : Alevel;

              return (
                <motion.div
                  key={service._id || serviceTitle}
                  variants={variants}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-80 sm:h-96"
                >
                  <img
                    src={imageUrl}
                    alt={serviceTitle}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = Alevel;
                      e.target.alt = "Service image not available";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                      {serviceTitle}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base px-2 leading-relaxed">
                      {serviceDesc}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg py-10">
              No services available at the moment.
            </p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center mt-12 md:mt-20"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/student-enroll"
              className="inline-block px-7 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
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