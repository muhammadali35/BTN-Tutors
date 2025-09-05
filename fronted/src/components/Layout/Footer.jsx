import React, { useState } from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Mail, CheckCircle, XCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsValid(true);
      toast.success('Thank you! Your subscription was successful.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => setEmail(''), 1000);
    } else {
      setIsValid(false);
      toast.error('Please enter a valid email address.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(value === '' ? true : validateEmail(value));
  };

  // ✅ Quick Links Data
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'News & Articles', path: '/news' },
    { name: 'Private Policy', path: '/privacy' },
  ];

  // ✅ Services Data
  const services = [
    { name: 'Home Tuition', path: '/home-tuition' },
    { name: 'O/A Level', path: '/o-a-level' },
    { name: 'Home Tutor', path: '/home-tutor' },
    { name: 'Spoken English', path: '/spoken-english' },
    { name: 'Online Tutoring', path: '/online-tutoring' },
  ];

  // ✅ Social Icons Data
  const socials = [
    { icon: Twitter, color: 'bg-blue-400 hover:bg-yellow-400', path: '/twitter' },
    { icon: Facebook, color: 'bg-blue-400 hover:bg-yellow-400', path: '/facebook' },
    { icon: Instagram, color: 'bg-blue-400 hover:bg-yellow-400', path: '/instagram' },
    { icon: Linkedin, color: 'bg-blue-400 hover:bg-yellow-400', path: '/linkedin' },
  ];

  return (
    <footer className="bg-blue-500 text-white py-12 relative">
      <ToastContainer />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M50 20C40 20 30 28 30 38V60H70V38C70 28 60 20 50 20Z" fill="currentColor"/>
                  <path d="M30 60L50 80L70 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="50" cy="30" r="10" fill="currentColor"/>
                </svg>
              </div>
              <Link to="/" className="text-lg font-semibold mb-2 hover:text-yellow-400 transition-colors duration-300">
                Best Teachers Network
              </Link>
              <p className="text-white text-center md:text-left mb-6 max-w-xs hover:text-yellow-400 transition-colors duration-300">
                Best Teachers Network is the best Online Academy in Pakistan for home tuition.
              </p>

              {/* Social Icons using map */}
              <div className="flex space-x-4 justify-center md:justify-start">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    to={social.path}
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group `}
                  >
                    <social.icon className="w-5 h-5 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links using map */}
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Quick Links</span>
              <span className="w-12 h-1 bg-white ml-2"></span>
            </h3>
            <ul className="space-y-3 ">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-yellow-400 transition-all duration-300 block group "
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services using map */}
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Services</span>
              <span className="w-12 h-1 bg-white ml-2"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-white hover:text-yellow-400 transition-all duration-300 block group"
                  >
                    <span className="relative">
                      {service.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative py-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Newsletter</span>
              <span className="w-12 h-1 bg-white ml-2"></span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-white transition-all duration-300 ${
                    email && !isValid 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-blue-500 focus:ring-blue-500'
                  }`}
                  required
                />
                {email && !isValid && <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />}
                {email && isValid && <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400  hover:bg-yellow-400 hover:text-white text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-white text-sm mt-4 text-center hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
              Subscribe to our Newsletter and get the latest updates, News, and Offers.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-300 mt-8 pt-6 text-center text-sm">
          <p className="text-white transition-colors duration-300">
            Copyright © 2024{' '}
            <Link to="/" className="font-bold text-yellow-400 hover:text-white transition-colors duration-300">
              Pakistan Academy
            </Link>{' '}
            | All rights reserved | Designed by{' '}
            <Link to="/" className="font-bold text-yellow-400 hover:text-white transition-colors duration-300">IT Advice</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;