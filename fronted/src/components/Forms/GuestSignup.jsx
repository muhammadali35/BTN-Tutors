import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon (react-icons)

const GuestSignup = () => {
  const handleGoogleSignup = () => {
    // Yahan pe tum apna Google OAuth logic laga sakte ho
    alert("Redirecting to Google Signup...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Guest Signup</h2>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} /> 
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        {/* Extra Text */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default GuestSignup;
