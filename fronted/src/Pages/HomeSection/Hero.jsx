import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import hero1 from "../../assets/tutorbg2.webp";
import hero2 from "../../assets/learn.webp";
import hero3 from "../../assets/successStu.jpg";

const heroSlides = [
  {
    title: "Empowering Students",
    subTitle:"with Expert Tutors",
    desc: "Discover the best Home and Online Tutors for all Subjects and Classes near your area Today!",
    btn1: { text: "Find a Tutor", link: "/student-enroll" },
    btn2: { text: "Become a Tutor", link: "/tutor-register" },
    bg: hero1,
  },
  {
    title: "Learn Anytime, ",
     subTitle:"Anywhere",
    desc: "Join our network of tutors and students. Access quality education from the comfort of your home.",
    btn1: { text: "Join Now", link: "/student-enroll" },
    btn2: { text: "Teach with Us", link: "/tutor-register" },
    bg: hero2,
  },
  {
    title: "Your Success,",
     subTitle:" Our Mission",
    desc: "We provide demo classes and expert guidance to help you succeed in your academic journey.",
    btn1: { text: "Book Demo", link: "/student-enroll" },
    btn2: { text: "Apply as Tutor", link: "/tutor-register" },
    bg: hero3,
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Background Images stacked */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.img
            key={i}
            src={slide.bg}
            alt={`Slide ${i}`}
            className="absolute top-0 left-0 w-full h-full object-cover block max-w-none pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === i ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Slide Content */}
      <motion.div
        key={index}
        className="relative z-10 text-center max-w-4xl px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <h1 className="text-4xl md:text-4xl font-bold text-white drop-shadow-lg leading-tight  mt-8">
          {heroSlides[index].title} <span className="text-yellow-400">{heroSlides[index].subTitle}</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-100 drop-shadow">
          {heroSlides[index].desc} Give us a call{" "}
          <a
            href="tel:03361016020"
            className="text-yellow-400 font-semibold inline-flex items-center gap-2"
          >
            <FaPhoneAlt className="text-blue-400 text-xl" /> 0336 1016020
          </a>{" "}
          or WhatsApp us{" "}
          <a
            href="https://wa.me/923361016020"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 font-semibold inline-flex items-center gap-2"
          >
            <FaWhatsapp className="text-green-500 text-xl" /> 0336 1016020
          </a>{" "}
          to get a <span className="font-bold">Free Demo</span> class.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            to={heroSlides[index].btn1.link}
            className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-yellow-500 transition"
          >
            {heroSlides[index].btn1.text}
          </Link>
          <Link
            to={heroSlides[index].btn2.link}
            className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-yellow-500 transition"
          >
            {heroSlides[index].btn2.text}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
