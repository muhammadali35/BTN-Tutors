import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "0336 1016020",
    link: "tel:03361016020",
    display: "📞 0336 1016020",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "0336 1016020",
    link: "https://wa.me/923361016020",
    display: "💬 0336 1016020",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@etutors.pk",
    link: "mailto:info@etutors.pk",
    display: "info@etutors.pk",
  },
];

const ContactPage = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
            Contact <span className="text-yellow-400">Us</span>
          </h2>
          <p className="text-gray-600 mt-4">
            We’re glad to have you around. Reach out to us and we’ll connect
            with you as soon as possible.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition border border-yellow-400 group"
            >
              <item.icon className="w-10 h-10 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-black group-hover:text-yellow-400">{item.title}</h3>
              <a
                href={item.link}
                target={item.title === "WhatsApp" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-400 mt-2 font-medium"
              >
                {item.display}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white  border border-yellow-400 shadow-md rounded-xl p-8">
          
          <h3 className="text-2xl font-bold text-blue-500 mb-6">
            Send Us <span className="text-yellow-400">a Message</span>
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
