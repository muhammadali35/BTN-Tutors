import React from "react";
import {
  Users,
  ClipboardList,
  ShieldCheck,
  Wallet,
  MessageSquare,
} from "lucide-react";
import students from "../../assets/Studnet1.jpg";

const features = [
  {
    icon: Users,
    title: "Connect With Tutors",
    desc: "BTN Network, you will connect with verified home/online tutors that exactly match your learning and geographic requirements. Our portal helps you find the most suitable tutor quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Each tutor undergoes a rigorous screening process to earn a verified badge. We check all identity and educational documents before approval.",
  },

  {
    icon: MessageSquare,
    title: "Forum Access",
    desc: "BTN Network offers a dedicated Q&A forum where students can ask any educational questions. Tutors are always ready to guide you, plus access to a huge collection of resources.",
  },
];

const ForStudents = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
            For <span className="text-yellow-400">Students</span>
          </h2>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <feature.icon className="w-8 h-8 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={students}
            alt="For Students"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ForStudents;
