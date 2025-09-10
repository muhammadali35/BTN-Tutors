// src/components/BlogSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/blog`);
        setBlogs(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Categories
  const categories = ['Select Categories', ...new Set(blogs.map(blog => blog.category))];

  // Filter & Sort
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchTerm || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  });

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex items-center justify-between mt-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb page="Blog" />

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-500">
              Latest  Blog<span className="text-yellow-400"> Articles</span>
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-xs sm:max-w-xl mx-auto leading-relaxed">
              Stay updated with our latest tips, news, and educational resources for students and parents.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-16">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="🔍 Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white min-w-40"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-sm">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="col-span-full text-center py-10 bg-red-50 rounded-2xl border border-red-200">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : sortedBlogs.length === 0
              ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4 opacity-30">📰</div>
                  <p className="text-gray-500 text-lg font-medium">No blogs found.</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filter.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )
              : (
                sortedBlogs.map((blog) => (
                  <Link
                    to={`/blog/${blog._id}`}
                    key={blog._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-transparent hover:border-blue-100 transition-all duration-500 transform hover:-translate-y-1"
                  >
                    <div className="h-44 sm:h-48 md:h-52 overflow-hidden">
                      <img
                        src={blog.img || 'https://via.placeholder.com/400x250?text=No+Image'}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 2h6v1H6V4zm0 3h6v8H6V7z" clipRule="evenodd" />
                          </svg>
                          {blog.date}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all text-center min-w-20">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;