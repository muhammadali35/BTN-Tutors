import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    link: "https://wa.me/923361016020", // Fixed extra spaces
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
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false); // Optional: for UX

  const API_URL = import.meta.env.VITE_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("❌ All fields are required!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        style: { background: "#E23E32", color: "white" },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/contact`, {
        name,
        email,
        subject,
        message,
      });

      toast.success("✅ Message sent successfully! We will contact you soon.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        style: { background: "#10b981", color: "white" },
      });

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "❌ Message not sent. Please try again!",
        {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
          style: { background: "#E23E32", color: "white" },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20 font-sans">
      <ToastContainer />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
            Contact <span className="text-yellow-400">Us</span>
          </h2>
          <p className="text-gray-600 mt-4">
            We’re glad to have you around. Reach out to us and we’ll connect with you as soon as possible.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 cursor-pointer">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition border border-yellow-400 group"
            >
              <item.icon className="w-10 h-10 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-black">{item.title}</h3>
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
        <div className="bg-gray-50 border border-yellow-400 shadow-md rounded-xl p-8"> {/* Fixed typo: bg-gay-50 → bg-gray-50 */}
          <h3 className="text-2xl font-bold text-blue-500 mb-6">
            Send Us <span className="text-yellow-400">a Message</span>
          </h3>
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 font-semibold rounded-lg shadow transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;