// src/pages/TutorRegistration.jsx
import React, { useState } from 'react';
import { User, Mail, Lock, Phone, GraduationCap, BookOpen, AlertCircle, Plus, X, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsModal from '../TermsModell';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios'

const TutorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    whatsapp: '',
    city: '',
    address: '',
    institution: '',
    experience: '',
    bio: '',
    subjects: [],
    otherSubjects: '',
    teachingMode: '',
    profilePic: null,
    idCardFront: null,
    idCardBack: null,
    Intermediate: null,
    bachelorDoc: null,
    mphilDoc: null,
    showOtherInput: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG)', { theme: 'colored' });
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const removeFile = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    const el = document.getElementById(field);
    if (el) el.value = '';
  };

  const validateForm = () => {
    const newErrors = {};

    // ✅ Validation Order: Critical uploads first
    if (!formData.profilePic) newErrors.profilePic = 'Profile picture is required';
    else if (!formData.idCardFront) newErrors.idCardFront = 'ID Card Front is required';
    else if (!formData.idCardBack) newErrors.idCardBack = 'ID Card Back is required';
    else if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    else if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    else if (!formData.city.trim()) newErrors.city = 'City is required';
    else if (!formData.address.trim()) newErrors.address = 'Home address is required';
    else if (formData.subjects.length === 0 && !formData.otherSubjects.trim())
      newErrors.subjects = 'Please select at least one subject or specify other';
    else if (!formData.teachingMode) newErrors.teachingMode = 'Please select teaching mode';
    else if (!formData.Intermediate && !formData.bachelorDoc && !formData.mphilDoc)
      newErrors.education = 'At least one document (Intermediate, Bachelor, or MPhil) is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.dismiss('form-error');
      toast.error(firstError, {
        toastId: 'form-error',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        style: { background: '#E23E32', color: 'white', top: '80px' },
      });
    }

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  if (!validateForm()) {
    console.log("Validation failed, check errors above");
    return;
  }

  setIsSubmitting(true);

  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => data.append(key, item));
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    console.log("FormData contents:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await axios.post("http://localhost:5000/api/tutorReg", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds timeout
    });

    console.log("Server response:", response.data);

    toast.dismiss();
    toast.success("✅ Application submitted! We will verify and contact you soon.", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
      style: { background: "#10b981", color: "white" },
    });

    // Reset states
    setFormData({
      name: "",
      email: "",
      password: "",
      mobile: "",
      whatsapp: "",
      city: "",
      address: "",
      institution: "",
      experience: "",
      bio: "",
      subjects: [],
      otherSubjects: "",
      teachingMode: "",
      profilePic: null,
      idCardFront: null,
      idCardBack: null,
      Intermediate: null,
      bachelorDoc: null,
      mphilDoc: null,
      showOtherInput: false,
    });

    // Reset file inputs
    ["profilePic", "idCardFront", "idCardBack", "Intermediate", "bachelorDoc", "mphilDoc"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    setIsSubmitting(false);
  } catch (error) {
    console.error("❌ Tutor Registration Error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to submit form. Please try again.";
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 4000,
      theme: "colored",
      style: { background: "#E23E32", color: "white", top: "80px" },
    });
    setErrors({ message: errorMessage });
    setIsSubmitting(false);
  }
};


  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Peshawar', 'Quetta', 'Gujranwala'];
  const subjects = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Urdu', 'Islamic Studies', 'Pakistan Studies', 'Accounting', 'Economics', 'Statistics',
    'Programming', 'IELTS', 'SAT', 'O-Level', 'A-Level'
  ];

  const tutorTerms = [
    'You must provide genuine academic credentials and identity proof.',
    'All uploaded documents will be verified before approval.',
    'Teaching experience must be accurately mentioned.',
    'Best-Teachers-Network reserves the right to reject any application without reason.',
    'You agree to conduct sessions professionally and ethically.',
    'We do not charge registration fees, but service fee may apply later.',
    'Your profile may be removed for false information or misconduct.'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Breadcrumb page={'Tutor Registration'} />

      {/* Main Form */}
      <main className="container mx-auto px-4 py-6 sm:py-10 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">🎓 Become a Tutor</h2>
            <p className="text-yellow-100 mt-1 text-xs sm:text-sm">
              Fill the form with your details and qualifications
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center text-sm sm:text-base">
                <User className="w-5 h-5 mr-2 text-yellow-500" />
                Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Profile Picture */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <label
                      htmlFor="profilePic"
                      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                        formData.profilePic
                          ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                          : 'bg-yellow-500 text-white hover:bg-yellow-400'
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.profilePic ? 'Photo Uploaded' : 'Upload Photo'}
                    </label>
                    <span className="text-xs text-gray-600 truncate max-w-xs">
                      {formData.profilePic ? formData.profilePic.name : 'No file chosen'}
                    </span>
                  </div>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'profilePic')}
                    className="hidden"
                  />
                  {formData.profilePic && (
                    <div className="flex items-center mt-3">
                      <img
                        src={URL.createObjectURL(formData.profilePic)}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('profilePic')}
                        className="ml-3 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {errors.profilePic && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.profilePic}
                    </p>
                  )}
                </div>

                {/* ID Card Front */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNIC / ID Card Front <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <label
                      htmlFor="idCardFront"
                      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                        formData.idCardFront
                          ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                          : 'bg-yellow-500 text-white hover:bg-yellow-400'
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.idCardFront ? 'Front Uploaded' : 'Upload Front'}
                    </label>
                    <span className="text-xs text-gray-600 truncate max-w-xs">
                      {formData.idCardFront ? formData.idCardFront.name : 'No file chosen'}
                    </span>
                  </div>
                  <input
                    id="idCardFront"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'idCardFront')}
                    className="hidden"
                  />
                  {formData.idCardFront && (
                    <div className="flex items-center mt-3">
                      <img
                        src={URL.createObjectURL(formData.idCardFront)}
                        alt="ID Front Preview"
                        className="w-24 h-16 object-cover border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('idCardFront')}
                        className="ml-3 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {errors.idCardFront && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.idCardFront}
                    </p>
                  )}
                </div>

                {/* ID Card Back */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNIC / ID Card Back <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <label
                      htmlFor="idCardBack"
                      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                        formData.idCardBack
                          ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                          : 'bg-yellow-500 text-white hover:bg-yellow-400'
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.idCardBack ? 'Back Uploaded' : 'Upload Back'}
                    </label>
                    <span className="text-xs text-gray-600 truncate max-w-xs">
                      {formData.idCardBack ? formData.idCardBack.name : 'No file chosen'}
                    </span>
                  </div>
                  <input
                    id="idCardBack"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'idCardBack')}
                    className="hidden"
                  />
                  {formData.idCardBack && (
                    <div className="flex items-center mt-3">
                      <img
                        src={URL.createObjectURL(formData.idCardBack)}
                        alt="ID Back Preview"
                        className="w-24 h-16 object-cover border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('idCardBack')}
                        className="ml-3 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {errors.idCardBack && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.idCardBack}
                    </p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="mobile" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.mobile}
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.whatsapp}
                    </p>
                  )}
                </div>

               

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.city}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House #, Street, Area"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Experience & Teaching */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center text-sm sm:text-base">
                <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
                Experience & Teaching
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="institution" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Current Institution / Workplace
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. Punjab University"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-0 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Teaching Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.experience}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bio" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Short Bio / Introduction
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your teaching style, qualifications..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-0 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Teaching Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Home', 'Online', 'Both'].map((mode) => (
                      <label key={mode} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="teachingMode"
                          value={mode.toLowerCase()}
                          checked={formData.teachingMode === mode.toLowerCase()}
                          onChange={handleChange}
                          className="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
                        />
                        <span className="ml-2 text-gray-700 text-xs sm:text-sm">{mode}</span>
                      </label>
                    ))}
                  </div>
                  {errors.teachingMode && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.teachingMode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center text-sm sm:text-base">
                <BookOpen className="w-5 h-5 mr-2 text-yellow-500" />
                Subjects You Can Teach
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {subjects.map((sub) => (
                  <label key={sub} className="flex items-center text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(sub)}
                      onChange={() => handleSubjectChange(sub)}
                      className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-gray-700">{sub}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center text-xs sm:text-sm mb-2">
                <input
                  type="checkbox"
                  checked={formData.showOtherInput}
                  onChange={() => setFormData((prev) => ({ ...prev, showOtherInput: !prev.showOtherInput }))}
                  className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-400"
                />
                <span className="ml-2 text-gray-700 flex items-center">
                  <Plus className="w-3 h-3 mr-1 text-yellow-600" />
                  Other Subject
                </span>
              </div>

              {formData.showOtherInput && (
                <div className="ml-6 mt-2">
                  <input
                    type="text"
                    value={formData.otherSubjects}
                    onChange={(e) => setFormData((prev) => ({ ...prev, otherSubjects: e.target.value }))}
                    placeholder="Enter subject name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-500 text-xs sm:text-sm"
                  />
                </div>
              )}

              {errors.subjects && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" /> {errors.subjects}
                </p>
              )}
            </div>

            {/* Education & Documents */}
            <div className="pt-6 border-t border-gray-200 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center text-sm sm:text-base">
                <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
                Education & Documents
              </h3>

              {/* Intermediate */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Intermediate (HSSC) Document <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label
                    htmlFor="Intermediate"
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                      formData.Intermediate
                        ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                        : 'bg-yellow-500 text-white hover:bg-yellow-400'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.Intermediate ? 'Uploaded' : 'Upload'}
                  </label>
                  <span className="text-xs text-gray-600 truncate max-w-xs">
                    {formData.Intermediate ? formData.Intermediate.name : 'No file'}
                  </span>
                </div>
                <input
                  id="Intermediate"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'Intermediate')}
                  className="hidden"
                />
                {formData.Intermediate && (
                  <button
                    type="button"
                    onClick={() => removeFile('Intermediate')}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Bachelor */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Bachelor's Degree Document <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label
                    htmlFor="bachelorDoc"
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                      formData.bachelorDoc
                        ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                        : 'bg-yellow-500 text-white hover:bg-yellow-400'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.bachelorDoc ? 'Uploaded' : 'Upload'}
                  </label>
                  <span className="text-xs text-gray-600 truncate max-w-xs">
                    {formData.bachelorDoc ? formData.bachelorDoc.name : 'No file'}
                  </span>
                </div>
                <input
                  id="bachelorDoc"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'bachelorDoc')}
                  className="hidden"
                />
                {formData.bachelorDoc && (
                  <button
                    type="button"
                    onClick={() => removeFile('bachelorDoc')}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* MPhil */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  M.Phil Document (Optional)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label
                    htmlFor="mphilDoc"
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                      formData.mphilDoc
                        ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                        : 'bg-yellow-500 text-white hover:bg-yellow-400'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.mphilDoc ? 'Uploaded' : 'Upload'}
                  </label>
                  <span className="text-xs text-gray-600 truncate max-w-xs">
                    {formData.mphilDoc ? formData.mphilDoc.name : 'No file'}
                  </span>
                </div>
                <input
                  id="mphilDoc"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'mphilDoc')}
                  className="hidden"
                />
                {formData.mphilDoc && (
                  <button
                    type="button"
                    onClick={() => removeFile('mphilDoc')}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                )}
              </div>

              {errors.education && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" /> {errors.education}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                By registering, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-medium text-yellow-600 hover:underline"
                >
                  Terms and Conditions
                </button>.
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow transition-all disabled:opacity-60 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Terms Modal */}
      <TermsModal
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Tutor Terms and Conditions"
        terms={tutorTerms}
        actionLabel="I Agree & Close"
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        style={{ top: '80px' }}
      />
    </div>
  );
};

export default TutorRegistration;