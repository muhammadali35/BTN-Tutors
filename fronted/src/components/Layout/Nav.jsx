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
} from "lucide-react";
import logo from "./../../assets/tutorlogo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("student");

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
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-yellow-400"
          />
          <span className="text-2xl font-bold text-blue-600">
            Best Teacher's <span className="text-yellow-500">Network</span>
          </span>
        </Link>

        {/* Center - Nav Items */}
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
        </div>

        {/* Right - Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 border-2 border-yellow-400 text-yellow-500 rounded-lg hover:bg-yellow-400 hover:text-white transition font-semibold flex items-center gap-2"
          >
            <LogIn size={18} /> Login
          </button>

          <div className="relative group">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold flex items-center gap-1">
              Register <ChevronDown size={16} className="text-yellow-300" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/student-enroll"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                <GraduationCap size={16} className="text-yellow-500" /> As a Student
              </Link>
              <Link
                to="/tutor-register"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
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
          <Link
            to="/register"
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
