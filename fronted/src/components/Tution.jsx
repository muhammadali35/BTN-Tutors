// src/pages/TuitionModes.jsx
import { Home, Laptop } from "lucide-react";
import onlineTution from "../assets/onlineTution1.jpg";
import homeTution from "../assets/Hometution1.jpg";

function TuitionModes() {
  const modes = [
    {
      icon: <Home className="w-10 h-10 text-yellow-400" />,
      title: "Home Tuition",
      desc: "Get personalized face-to-face tutoring at your home for better focus and comfort.",
      img: homeTution,
      overlay: "bg-black/40",
    },
    {
      icon: <Laptop className="w-10 h-10 text-yellow-400" />,
      title: "Online Tuition",
      desc: "Learn from anywhere in Pakistan with our verified online tutors using digital tools.",
      img: onlineTution,
      overlay: "bg-black/40",
    },
  ];

  return (
    <section className="relative bg-white pb-14 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
            Tuition Modes <span className="text-yellow-400">We Offer</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We provide flexible options to match your learning style — choose between home tutoring or online sessions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {modes.map((mode, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group aspect-w-16 aspect-h-10 sm:aspect-h-12 h-64 sm:h-72 md:h-80"
            >
              {/* Background Image */}
              <img
                src={mode.img}
                alt={mode.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 ${mode.overlay}`}></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-6 text-center text-white">
                <div className="flex justify-center mb-3 sm:mb-4">{mode.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                  {mode.title}
                </h3>
                <p className="text-white leading-relaxed text-sm sm:text-base px-2">
                  {mode.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TuitionModes;