// src/components/Footer.jsx
import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'News & Articles', path: '/blog' },
  ];

  const services = [
    { name: 'Home Tuition', path: '/services' },
    { name: 'O/A Level', path: '/services' },
    { name: 'Home Tutor', path: '/services' },
    { name: 'Spoken English', path: '/services' },
    { name: 'Online Tutoring', path: '/services' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+92 300 1234567",
      href: "https://wa.me/923001234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Admin Office, Lahore, Pakistan",
      href: "https://maps.google.com/?q=Admin+Office,+Islamabad",
    },
    {
      icon: Mail,
      label: "Email",
      value: "admin@nonly.com",
      href: "mailto:admin@nonly.com",
    },
  ];

  const socials = [
    { icon: Twitter, path: "https://twitter.com" },
    { icon: Facebook, path: "https://facebook.com" },
    { icon: Instagram, path: "https://instagram.com" },
    { icon: Linkedin, path: "https://linkedin.com" },
  ];

  return (
    <footer
      className="bg-blue-500 text-white py-12 relative font-sans"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="container mx-auto px-4">
        {/* Grid: Responsive 1 → 2 → 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Logo + Description */}
          <div className="lg:pr-4">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors">
                Best Teachers Network
              </Link>
              <p
                className="text-white/90 text-center md:text-left mb-6"
                style={{
                  fontSize: 'clamp(0.875rem, 2.8vw, 1rem)',
                  lineHeight: '1.55',
                }}
              >
                Making quality education accessible across Pakistan with expert home & online tutors.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-3">
                {socials.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label={`${item.icon.name} link`}
                  >
                    <item.icon className="w-5 h-5 text-white group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center">
              Quick Links
              <span className="w-8 h-0.5 bg-yellow-400 ml-2"></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white/90 hover:text-yellow-400 transition-colors block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center">
              Our Services
              <span className="w-8 h-0.5 bg-yellow-400 ml-2"></span>
            </h3>
            <ul className="space-y-2.5">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-white/90 hover:text-yellow-400 transition-colors block text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center">
              Contact Us
              <span className="w-8 h-0.5 bg-yellow-400 ml-2"></span>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start">
                    <div className="mt-0.5 mr-3 text-yellow-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold uppercase tracking-wider">{item.label}</p>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : "_self"}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                        className="text-white hover:text-yellow-400 transition-colors font-medium block"
                        style={{ fontSize: '0.9375rem' }}
                      >
                        {item.value}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-400/40 mt-12 pt-6 text-center">
          <p className="text-white/80 text-sm">
            Copyright © 2025{' '}
            <Link to="/" className="font-semibold text-yellow-400 hover:text-white transition-colors">
              Pakistan Academy
            </Link>
            {' '}| All rights reserved | Designed by{' '}
            <Link to="/" className="font-semibold text-yellow-400 hover:text-white transition-colors">
              Wali Haider Jalali
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;