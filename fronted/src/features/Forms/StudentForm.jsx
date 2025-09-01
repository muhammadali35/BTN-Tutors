import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, Building2, MapPin, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsModal from '../TermsModell'; // یقینی بنائیں کہ صحیح پاتھ ہو
import Breadcrumb from '../../components/Breadcrumb';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    province: '',
    city: '',
    address: '',
    school: '',
    subjects: [],
    otherSubjects: '',
    showOtherInput: false,
    tuitionMode: '', // 'home' or 'online'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showTermsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showTermsModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showTermsModal) {
        setShowTermsModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showTermsModal]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    else if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!formData.province.trim()) newErrors.province = 'Province is required';
    else if (!formData.city.trim()) newErrors.city = 'City is required';
    else if (!formData.address.trim()) newErrors.address = 'Home address is required';
    else if (!formData.school.trim()) newErrors.school = 'School name is required';
    else if (!formData.tuitionMode) newErrors.tuitionMode = 'Please select tuition mode (Home or Online)';
    else if (formData.subjects.length === 0 && !formData.otherSubjects.trim())
      newErrors.subjects = 'Please select at least one subject or specify other';

    setErrors(newErrors);

    // Only show toast if there is a new error and no toast is currently active
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.dismiss();
      toast.error(firstError, {
        toastId: 'form-error',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        style: { background: '#E23E32', color: 'white' },
      });

      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        element.focus();
      }
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
        toast.success('✅ Registration successful! We will contact you soon.', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'colored',
          style: { background: '#10b981', color: 'white' },
        });

        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          mobile: '',
          province: '',
          city: '',
          address: '',
          school: '',
          subjects: [],
          otherSubjects: '',
          showOtherInput: false,
          tuitionMode: '',
        });
      }, 1500);
    }
  };

  const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'];
  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Peshawar', 'Quetta', 'Gujranwala'];
  const subjects = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Urdu', 'Islamic Studies', 'Pakistan Studies', 'Accounting', 'Economics', 'Geography'
  ];

  const studentTerms = [
    'All of the above information should be correct and accurate.',
    'We do not charge any registration fees from students.',
    'Tuition fees are collected in the first week of every month.',
    'First month\'s fee will be collected by Best-Teachers-Network as per tutor agreement.',
    'You must provide genuine contact and academic details.',
    'Best-Teachers-Network.com reserves the right to modify services or policies at any time.',
    'Any false information may lead to termination of service.'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
       <Breadcrumb page='Student Registration'/>
      {/* Main Form */}
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-white p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">🎓 Student Registration Form</h2>
            <p className="text-white mt-1 text-sm sm:text-base opacity-90">
              Fill in your details to get started with the best teachers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-10">
            {/* Section 1: Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center">
                <User className="w-5 h-5 mr-2 text-yellow-500" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'name', label: 'Full Name', icon: User, type: 'text', required: true },
                  { id: 'email', label: 'Email', icon: Mail, type: 'email', required: true },
                  { id: 'password', label: 'Password', icon: Lock, type: 'password', required: true },
                  { id: 'mobile', label: 'Mobile', icon: Phone, type: 'tel', required: true },
                  { id: 'province', label: 'Province', icon: null, type: 'select', required: true },
                  { id: 'city', label: 'City', icon: null, type: 'select', required: true },
                  { id: 'address', label: 'Home Address', icon: MapPin, type: 'textarea', required: true },
                ].map((field) => (
                  <div key={field.id} className="transition-all">
                    <label htmlFor={field.id} className="block text-sm font-semibold text-gray-800 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      {field.icon && (
                        <field.icon className="absolute left-3 top-3.5 w-5 h-5 text-yellow-500" />
                      )}
                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          className={`pl-3 w-full px-4 py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 transition-all ${
                            errors[field.id] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select {field.id === 'province' ? 'Province' : 'City'}</option>
                          {(field.id === 'province' ? provinces : cities).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id="address"
                          name="address"
                          rows="3"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="House #, Street, Area"
                          className={`pl-10 w-full px-4 py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 transition-all ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      ) : (
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={handleChange}
                          placeholder={
                            field.id === 'name' ? 'Enter your full name' :
                            field.id === 'email' ? 'example@email.com' :
                            field.id === 'password' ? 'At least 8 characters' :
                            field.id === 'mobile' ? '+92 300 1234567' :
                            'Enter your address'
                          }
                          className={`pl-10 w-full px-4 py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 transition-all ${
                            errors[field.id] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      )}
                    </div>
                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Academic & Study Details */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-yellow-500" />
                Academic & Study Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* School */}
                <div className="sm:col-span-2">
                  <label htmlFor="school" className="block text-sm font-semibold text-gray-800 mb-2">
                    School / College <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-yellow-500" />
                    <input
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder="Your institution name"
                      className={`pl-10 w-full px-4 py-3 border rounded-lg focus:border-yellow-500 focus:ring-0 transition-all ${
                        errors.school ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.school && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.school}
                    </p>
                  )}
                </div>

                {/* Tuition Mode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Preferred Tuition Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Home Tuition', 'Online Tuition'].map((mode) => (
                      <label key={mode} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="tuitionMode"
                          value={mode.toLowerCase().includes('home') ? 'home' : 'online'}
                          checked={formData.tuitionMode === (mode.toLowerCase().includes('home') ? 'home' : 'online')}
                          onChange={handleChange}
                          className="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
                        />
                        <span className="ml-3 text-gray-700 text-sm">{mode}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tuitionMode && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.tuitionMode}
                    </p>
                  )}
                </div>

                {/* Subjects */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Subjects to Learn <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
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

                  {/* Other Subject Toggle */}
                  <div className="flex items-center text-sm mb-2">
                    <input
                      type="checkbox"
                      checked={formData.showOtherInput}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, showOtherInput: !prev.showOtherInput }))
                      }
                      className="w-4 h-4 rounded text-yellow-500 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-gray-700 flex items-center">
                      <Plus className="w-3 h-3 mr-1 text-yellow-600" />
                      Other Subject
                    </span>
                  </div>

                  {/* Show only if showOtherInput is true */}
                  {formData.showOtherInput && (
                    <div className="ml-6 animate-fadeIn">
                      <input
                        type="text"
                        value={formData.otherSubjects}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, otherSubjects: e.target.value }))
                        }
                        placeholder="Enter subject name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-0 text-sm"
                      />
                    </div>
                  )}

                  {errors.subjects && (
                    <p className="text-red-500 text-xs mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.subjects}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="pt-6 border-t border-gray-200 space-y-6">
              <p className="text-sm text-gray-600">
                By registering, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-medium text-yellow-600 hover:underline transition-colors"
                >
                  Terms and Conditions
                </button>.
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Reusable Terms Modal */}
      <TermsModal
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Student Terms and Conditions"
        terms={studentTerms}
        actionLabel="I Agree & Close"
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </div>
  );
};

export default StudentRegistration;