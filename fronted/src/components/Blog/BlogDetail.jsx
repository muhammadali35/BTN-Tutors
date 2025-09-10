// src/components/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch blog from API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/blog/${id}`);
        setBlog(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Blog not found or failed to load.");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Loading Skeleton
  if (loading) {
    return (
      <section className="py-24 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-60 sm:h-72 md:h-96 bg-gray-200 rounded-2xl"></div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl space-y-5">
              <div className="h-7 bg-gray-200 rounded w-2/3"></div>
              <div className="flex gap-3 flex-wrap">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <div className="text-8xl mb-6 animate-bounce opacity-30">📰</div>
        <p className="text-red-500 font-bold text-2xl mb-4">Blog Not Found</p>
        <p className="text-gray-600 mb-8 max-w-md">
          {error || "The blog you're looking for doesn't exist or may have been removed."}
        </p>
        <Link
          to="/blog"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  // ✅ Use only the published date (from admin panel)
  const publishedDate = blog.date 
    ? new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

  const cleanDescription = DOMPurify.sanitize(blog.desc || '');

  return (
    <section className="py-12 lg:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ✅ Back Button - Top Left */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-full hover:bg-blue-50 transition-shadow duration-200 shadow-sm hover:shadow"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mb-10 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={blog.img || 'https://via.placeholder.com/1200x600/6B7280/FFFFFF?text=No+Image'}
            alt={blog.title}
            className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover object-center transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x600/6B7280/FFFFFF?text=Image+Not+Available";
            }}
          />
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">

          {/* Category & Published Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-full">
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 2h6v1H6V4zm0 3h6v8H6V7z" clipRule="evenodd" />
              </svg>
              {/* ✅ Only Published Date */}
              {publishedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-7 leading-tight">
            {blog.title}
          </h1>

          {/* Description */}
          <div
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        </article>

      </div>
    </section>
  );
};

export default BlogDetail;