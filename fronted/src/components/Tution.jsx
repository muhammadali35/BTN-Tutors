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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Tuition Modes We Offer
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide flexible options to match your learning style — choose between
            home tutoring or online sessions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {modes.map((mode, i) => (
            <div
              key={i}
              className="group bg-blue-50 hover:bg-blue-100 rounded-2xl p-10 shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="flex justify-center mb-6">{mode.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
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
