// src/components/Layout/Breadcrumb.jsx
import { Link } from "react-router-dom";

function Breadcrumb({ page }) {
  return (
    <section className="relative bg-blue-500 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://i.ibb.co/5n2zq5j/bg-pattern.png" 
          alt="pattern"
          className="w-full h-full object-cover"
        />
      </div>  

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-4xl font-bold">{page}</h1>
        <div className="flex justify-center items-center gap-4 mt-4 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <span className="text-yellow-400">🎓</span>
          <span className="text-yellow-400">{page}</span>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44C176.78,68,57.78,95.72,0,118.81V0H1200V27.35C1034.09,77,856,91,678.63,73.05,540.77,58.26,403.6,44.51,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Breadcrumb;
