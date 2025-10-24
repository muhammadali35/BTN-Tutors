// src/components/BlogSection.jsx
import React, { useState, useEffect, useMemo } from 'react';
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/blog`);
        setBlogs(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs. Please try again later.');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getFirstText = (blocks) => {
    if (!Array.isArray(blocks)) return '';
    const textBlock = blocks.find((b) => b.type === 'text');
    return textBlock?.content || '';
  };

  const getFirstImage = (blocks) => {
    if (!Array.isArray(blocks)) return '';
    const imageBlock = blocks.find((b) => b.type === 'image');
    return imageBlock?.url || '';
  };

  const categories = useMemo(() => {
    const cats = blogs.map((blog) => blog.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [blogs]);

  const filteredAndSortedBlogs = useMemo(() => {
    let result = blogs.filter((blog) => {
      const matchesSearch =
        !searchTerm ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getFirstText(blog.blocks).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return result.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [blogs, searchTerm, selectedCategory, getFirstText]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="flex items-center justify-between mt-3">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb page="Blog" />

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500">
              Latest Blog <span className="text-yellow-400">Articles</span>
            </h2>
            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Stay updated with our latest tips, news, and educational resources for students and parents.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="🔍 Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3.5 pr-12 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-5 py-3.5 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm min-w-[150px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="col-span-full text-center py-8 bg-red-50 rounded-xl border border-red-200 mb-8">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredAndSortedBlogs.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4 opacity-30 text-yellow-400">📰</div>
                <p className="text-gray-700 text-xl font-semibold mb-2">No blogs found</p>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filter to discover more content.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-5 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredAndSortedBlogs.map((blog) => (
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        getFirstImage(blog.blocks) ||
                        'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=No+Image'
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250/e5e7eb/9ca3af?text=Image+Not+Found';
                      }}
                    />
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 bg-yellow-400 text-white text-xs font-semibold rounded-full">
                        {blog.category}
                      </span>
                      <span className="flex items-center px-3.5 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" />
                        </svg>
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'N/A'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>

                    <div className="pt-2">
                      <span className="inline-block px-4 py-2 border-2 border-yellow-400 text-yellow-600 font-medium text-sm rounded-full hover:bg-yellow-400 hover:text-white transition-colors">
                        Read More
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