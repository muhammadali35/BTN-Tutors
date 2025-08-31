import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact <span className="text-yellow-500">Us</span>
          </h2>
          <p className="text-gray-600 mt-4">
            We’re glad to have you around. Reach out to us and we’ll connect
            with you as soon as possible.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Call */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <Phone className="w-10 h-10 text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
            <a
              href="tel:03361016020"
              className="text-gray-700 hover:text-yellow-500 mt-2 font-medium"
            >
              📞 0336 1016020
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <MessageCircle className="w-10 h-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
            <a
              href="https://wa.me/923361016020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-500 mt-2 font-medium"
            >
              💬 0336 1016020
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <Mail className="w-10 h-10 text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <a
              href="mailto:info@etutors.pk"
              className="text-gray-700 hover:text-yellow-500 mt-2 font-medium"
            >
              info@etutors.pk
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
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
