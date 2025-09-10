import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  GraduationCap,

} from "lucide-react";
import logo from "./../../assets/tutorlogo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-400"
          />
          <span className="text-xl md:text-2xl font-bold text-blue-500">
            Best Teacher's <span className="text-yellow-400">Network</span>
          </span>
        </Link>

        {/* Center - Nav Items */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium text-gray-700">
          {["Home", "About", "Services","Blog", "Contact" ].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative group transition"
            >
              <span className="hover:text-yellow-400 transition">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right - Buttons */}
        <div className="hidden md:flex items-center ml-6 md:ml-8 space-x-4">
          <div className="relative group">
            <button className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition font-semibold flex items-center gap-2">
              Register <ChevronDown size={16} className="text-yellow-400" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/student-enroll"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-400 transition"
              >
                <GraduationCap size={16} className="text-yellow-400" /> As a
                Student
              </Link>
              <Link
                to="/tutor-register"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-400 transition"
              >
                <User size={16} className="text-yellow-400" /> As a Tutor
              </Link>
            
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 font-medium text-gray-700">
          {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* Register Dropdown for Mobile */}
          <details className="w-full">
            <summary className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition font-semibold flex items-center gap-2 cursor-pointer">
              Register <ChevronDown size={16} className="text-yellow-400" />
            </summary>
            <div className="mt-2 w-full bg-white rounded-lg shadow-lg">
              <Link
                to="/student-enroll"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <GraduationCap size={16} className="text-yellow-400" /> As a Student
              </Link>
              <Link
                to="/tutor-register"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <User size={16} className="text-yellow-400" /> As a Tutor
              </Link>
            </div>
          </details>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
