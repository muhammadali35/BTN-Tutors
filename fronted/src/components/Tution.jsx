// src/pages/TuitionModes.jsx
import { Home, Laptop } from "lucide-react";

function TuitionModes() {
  const modes = [
    {
      icon: <Home className="w-10 h-10 text-yellow-500" />,
      title: "Home Tuition",
      desc: "Get personalized face-to-face tutoring at your home for better focus and comfort.",
    },
    {
      icon: <Laptop className="w-10 h-10 text-yellow-500" />,
      title: "Online Tuition",
      desc: "Learn from anywhere in Pakistan with our verified online tutors using digital tools.",
    },
  ];

  return (
    <section className="relative bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
          Tuition Modes <span className="text-yellow-400">We Offer</span>
        </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg animate-fade-in-delay">
            We provide flexible options to match your learning style — choose between
            home tutoring or online sessions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10  ">
          {modes.map((mode, i) => (
            <div
              key={i}
              className="group   rounded-2xl p-10 shadow-md hover:shadow-xl transition duration-300 text-center border border-yellow-400"
            >
              <div className="flex justify-center mb-6">{mode.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                {mode.title}
              </h3>
              <p className="text-gray-600">{mode.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TuitionModes;
