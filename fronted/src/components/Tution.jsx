// src/pages/TuitionModes.jsx
import { Home, Laptop } from "lucide-react";
import onlineTution from "../assets/onlineTution1.jpg";
import homeTution from "../assets/Hometution1.jpg";

function TuitionModes() {
  const modes = [
    {
      icon: <Home className="w-10 h-10 text-yellow-400" />,
      title: "Home Tuition",
      desc: "Receive personalized tuition at your home.",
      img: homeTution,
      overlay: "bg-black/40",
    },
    {
      icon: <Laptop className="w-10 h-10 text-yellow-400" />,
      title: "Online Tuition",
      desc: "Any time, anywhere convenience of live online learning with expert teachers.",
      img: onlineTution,
      overlay: "bg-black/40",
    },
  ];

  return (
    <section
      className="relative bg-white pb-14 font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="font-bold text-blue-500 mb-4"
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', // 30px → 36px
              lineHeight: '1.25',
            }}
          >
            Tuition Modes <span className="text-yellow-400">We Offer</span>
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)', // 16px → 18px
              lineHeight: '1.65',
            }}
          >
            Choose the best learning methodology. Either in the comfort of your home by our expert home tutor, or through the web in a lively and engaging online tutoring experience. Both these channels shall ensure that you avail of proper learning and follow-up.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {modes.map((mode, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-64 sm:h-72 md:h-80"
            >
              <img
                src={mode.img}
                alt={mode.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className={`absolute inset-0 ${mode.overlay}`}></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-6 text-center text-white">
                <div className="flex justify-center mb-3 sm:mb-4">{mode.icon}</div>
                <h3
                  className="font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 mb-3 sm:mb-4"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }} // 20px → 24px
                >
                  {mode.title}
                </h3>
                <p
                  className="text-white px-2"
                  style={{
                    fontSize: 'clamp(0.875rem, 2.8vw, 1rem)', // 14px → 16px
                    lineHeight: '1.5',
                  }}
                >
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