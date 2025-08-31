import React, { useState } from 'react';
import { User, Mail, Lock, Phone, GraduationCap, MapPin, Building2, BookOpen, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    showOtherInput: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject) 
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Home address is required';
    if (!formData.school.trim()) newErrors.school = 'School name is required';
    if (formData.subjects.length === 0 && !formData.otherSubjects.trim()) {
      newErrors.subjects = 'Please select at least one subject';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        toast.success('Registration successful! We will contact you soon.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
          showOtherInput: false
        });
      }, 1500);
    }
  };

  const provinces = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'
  ];

  const cities = [
    'Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Peshawar', 'Quetta', 'Gujranwala'
  ];

  const subjects = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 
    'Urdu', 'Islamic Studies', 'Pakistan Studies', 'Accounting', 'Economics', 'Geography'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
   <header 
  className=" relative overflow-hidden"
  style={{
    backgroundImage: 'url("https://www.etutors.pk//images/businessman1.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  
  <div className="container mx-auto px-4 h-48 relative z-10 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Student Registration</h1>
      <nav className="hidden md:flex justify-center space-x-8 mt-4">
        <Link to="/home" className="text-white hover:text-yellow-300 transition-colors duration-300">Home</Link>
        <span className="text-white">/</span>
        <Link to="/student-registration" className="text-white hover:text-yellow-300 transition-colors duration-300">Student Registration</Link>
      </nav>
    </div>
  </div>
</header>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r  p-6 text-black">
              <h2 className="text-2xl font-bold">Student Registration Form</h2>
              <p className=" mt-2">
                Please complete the below form for registration. After registration, you will be able to find best suitable teacher, get homework support and much more.
              </p>
              {/* <p className=" text-sm mt-1">
                Fields marked with <span className="font-bold">*</span> are mandatory.
              </p> */}
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Create a strong password"
                      />
                    </div>
                    {errors.password && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    {errors.mobile && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.mobile}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.province ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.province}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Home Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className={`pl-10 w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your complete home address"
                      />
                    </div>
                    {errors.address && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Educational Information */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                      School / College  <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-3 border ${errors.school ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your school name"
                      />
                    </div>
                    {errors.school && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.school}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subjects to learn <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <label key={subject} className="flex items-center">
                          <input
                            type="checkbox"
                            name="subjects"
                            value={subject}
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Other Subjects Option */}
                    <div className="mt-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showOtherInput}
                          onChange={() => setFormData(prev => ({ ...prev, showOtherInput: !prev.showOtherInput }))}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                          <Plus className="w-4 h-4 mr-1" />
                          Other Subjects
                        </span>
                      </label>
                      
                      {formData.showOtherInput && (
                        <div className="mt-2 ml-6">
                          <input
                            type="text"
                            value={formData.otherSubjects}
                            onChange={(e) => setFormData(prev => ({ ...prev, otherSubjects: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Enter your subject"
                          />
                        </div>
                      )}
                    </div>
                    
                    {errors.subjects && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subjects}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            </form>
          </div>
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default StudentRegistration;
