import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  GraduationCap,
  Globe,
  LogIn,
  Mail,
} from "lucide-react";
import logo from "./../../assets/tutorlogo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [mobileDropdown, setMobileDropdown] = useState(false);

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLoginModal]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-yellow-400" />
          <span className="text-2xl font-bold text-blue-600">
            Best Teacher's <span className="text-yellow-500">Network</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative group transition"
            >
              <span className="hover:text-yellow-500 transition">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Login with Modal */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 border-2 border-yellow-400 text-yellow-500 rounded-lg hover:bg-yellow-400 hover:text-white transition font-semibold flex items-center gap-2"
          >
            <LogIn size={18} /> Login
          </button>

          {/* Register Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold flex items-center gap-1">
              Register <ChevronDown size={16} className="text-yellow-300" />
            </button>

            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/student-enroll"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                <GraduationCap size={16} className="text-yellow-500" /> As a Student
              </Link>
              <Link
                to="/register/tutor"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                <User size={16} className="text-yellow-500" /> As a Tutor
              </Link>
              <Link
                to="/guest-register"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                <Globe size={16} className="text-yellow-500" /> As a Guest
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-yellow-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 font-medium text-gray-700">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block hover:text-yellow-500 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => setShowLoginModal(true)}
            className="block w-full px-4 py-2 border-2 border-yellow-400 text-yellow-500 rounded-lg hover:bg-yellow-400 hover:text-white transition font-semibold"
          >
            Login
          </button>
        </div>
      )}

      {/* Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          {/* Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-[1100] animate-fadeIn">
            {/* Close Btn */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => setShowLoginModal(false)}
            >
              <X size={22} />
            </button>

            {/* Tabs */}
            <div className="flex justify-around mb-6 border-b pb-2">
              <button
                onClick={() => setActiveTab("student")}
                className={`flex items-center gap-2 px-3 py-1 ${
                  activeTab === "student"
                    ? "text-yellow-500 border-b-2 border-yellow-500 font-bold"
                    : "text-gray-600 hover:text-yellow-500"
                }`}
              >
                <GraduationCap size={18} /> Student
              </button>
              <button
                onClick={() => setActiveTab("tutor")}
                className={`flex items-center gap-2 px-3 py-1 ${
                  activeTab === "tutor"
                    ? "text-yellow-500 border-b-2 border-yellow-500 font-bold"
                    : "text-gray-600 hover:text-yellow-500"
                }`}
              >
                <User size={18} /> Tutor
              </button>
              <button
                onClick={() => setActiveTab("guest")}
                className={`flex items-center gap-2 px-3 py-1 ${
                  activeTab === "guest"
                    ? "text-yellow-500 border-b-2 border-yellow-500 font-bold"
                    : "text-gray-600 hover:text-yellow-500"
                }`}
              >
                <Globe size={18} /> Guest
              </button>
            </div>

            {/* Forms */}
            {activeTab === "student" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Student Login
                </h3>
                <input className="w-full border px-4 py-2 rounded-lg mb-3" placeholder="Email" />
                <input className="w-full border px-4 py-2 rounded-lg mb-4" type="password" placeholder="Password" />
                <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                  Login
                </button>
              </div>
            )}

            {activeTab === "tutor" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Tutor Login
                </h3>
                <input className="w-full border px-4 py-2 rounded-lg mb-3" placeholder="Email" />
                <input className="w-full border px-4 py-2 rounded-lg mb-4" type="password" placeholder="Password" />
                <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                  Login
                </button>
              </div>
            )}

            {activeTab === "guest" && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Guest Login
                </h3>
                <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-yellow-50">
                  <Mail size={18} className="text-yellow-500" /> Continue with Google
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
