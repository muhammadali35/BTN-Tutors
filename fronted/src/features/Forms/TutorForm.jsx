import React, { useState } from 'react';
import { User, Mail, Lock, Phone, GraduationCap, MapPin, BookOpen, AlertCircle, Plus, X, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsModal from '../TermsModell';

const TutorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    whatsapp: '',
    province: '',
    city: '',
    address: '',
    institution: '',
    experience: '',
    bio: '',
    subjects: [],
    otherSubjects: '',
    teachingMode: '',
    profilePic: null,
    bachelorDoc: null,
    mphilDoc: null,
    phdDoc: null,
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
    if (file && !file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Please upload an image or PDF file');
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

  if (!formData.name.trim()) newErrors.name = 'Name is required';
  else if (!formData.email.trim()) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
  else if (!formData.password.trim()) newErrors.password = 'Password is required';
  else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
  else if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
  else if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
  else if (!formData.province.trim()) newErrors.province = 'Province is required';
  else if (!formData.city.trim()) newErrors.city = 'City is required';
  else if (!formData.address.trim()) newErrors.address = 'Home address is required';
  else if (!formData.profilePic) newErrors.profilePic = 'Profile picture is required';
  else if (formData.subjects.length === 0 && !formData.otherSubjects.trim())
    newErrors.subjects = 'Please select at least one subject or specify other';
  else if (!formData.teachingMode) newErrors.teachingMode = 'Please select teaching mode';
  else if (!formData.bachelorDoc && !formData.mphilDoc && !formData.phdDoc)
    newErrors.education = 'At least one document (Bachelor, MPhil, or PhD) is required';

  setErrors(newErrors);

  // Only show one toast error
  if (Object.keys(newErrors).length > 0) {
    const firstError = Object.values(newErrors)[0];
    // Dismiss any existing toast with the same ID
    toast.dismiss('form-error');
    // Show only one toast
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        toast.dismiss();
        toast.success('✅ Application submitted! We will verify and contact you soon.', {
          position: 'top-right',
          autoClose: 6000,
          theme: 'colored',
          style: { background: '#10b981', color: 'white' },
        });

        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          mobile: '',
          whatsapp: '',
          province: '',
          city: '',
          address: '',
          institution: '',
          experience: '',
          bio: '',
          subjects: [],
          otherSubjects: '',
          teachingMode: '',
          profilePic: null,
          bachelorDoc: null,
          mphilDoc: null,
          phdDoc: null,
          showOtherInput: false,
        });
        ['profilePic', 'bachelorDoc', 'mphilDoc', 'phdDoc'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
      }, 2000);
    }
  };

  const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'];
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
      <header
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Tutor Registration
          </h1>
          <p className="text-white/90 mt-2 text-sm sm:text-base">Join our network of qualified teachers</p>
        </div>
      </header>

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

                {/* Province */}
                <div>
                  <label htmlFor="province" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 text-sm ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.province}
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
                <input id="bachelorDoc" type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'bachelorDoc')} className="hidden" />
                {formData.bachelorDoc && (
                  <button type="button" onClick={() => removeFile('bachelorDoc')} className="text-red-500 hover:text-red-700 text-xs">
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
                <input id="mphilDoc" type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'mphilDoc')} className="hidden" />
                {formData.mphilDoc && (
                  <button type="button" onClick={() => removeFile('mphilDoc')} className="text-red-500 hover:text-red-700 text-xs">
                    Remove
                  </button>
                )}
              </div>

              {/* PhD */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Ph.D Document (Optional)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label
                    htmlFor="phdDoc"
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer font-medium transition-all text-sm ${
                      formData.phdDoc
                        ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
                        : 'bg-yellow-500 text-white hover:bg-yellow-400'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.phdDoc ? 'Uploaded' : 'Upload'}
                  </label>
                  <span className="text-xs text-gray-600 truncate max-w-xs">
                    {formData.phdDoc ? formData.phdDoc.name : 'No file'}
                  </span>
                </div>
                <input id="phdDoc" type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'phdDoc')} className="hidden" />
                {formData.phdDoc && (
                  <button type="button" onClick={() => removeFile('phdDoc')} className="text-red-500 hover:text-red-700 text-xs">
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

      {/* Reusable Terms Modal */}
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
        style={{ top: '80px' }} // Header کے بعد
      />
    </div>
  );
};

export default TutorRegistration;