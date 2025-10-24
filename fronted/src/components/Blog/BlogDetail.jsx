// src/components/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/blog/${id}`);
        setBlog(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Blog not found or failed to load.');
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="animate-pulse space-y-6">
            <div className="h-64 sm:h-80 md:h-96 bg-gray-200 rounded-2xl"></div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-5">
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <div className="text-7xl mb-6 opacity-40 text-yellow-400">📰</div>
        <p className="text-red-600 font-bold text-2xl mb-3">Blog Not Found</p>
        <p className="text-gray-600 mb-8 max-w-md">
          {error || "The blog you're looking for doesn't exist or may have been removed."}
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const publishedDate = blog.date
    ? new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'text') {
        return (
          <p
            key={index}
            className="mb-6 text-gray-700 leading-relaxed text-base sm:text-lg"
          >
            {block.content}
          </p>
        );
      }
      if (block.type === 'subtitle') {
        return (
          <h3
            key={index}
            className="text-xl sm:text-2xl font-semibold text-gray-800 my-8 pl-4 border-l-4 border-yellow-400"
          >
            {block.content}
          </h3>
        );
      }
      if (block.type === 'image') {
        return (
          <div key={index} className="my-10">
            <img
              src={block.url}
              alt={`Blog illustration ${index + 1}`}
              className="w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-md border border-gray-200"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x600/e5e7eb/9ca3af?text=Image+Not+Available';
                e.target.alt = 'Image not available';
              }}
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-sm"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Blog Card */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Category & Date */}
          <div className="px-6 pt-6 flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 bg-yellow-400 text-white text-xs font-semibold rounded-full">
              {blog.category}
            </span>
            <span className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" />
              </svg>
              {publishedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="px-6 pt-5 pb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          {/* Content */}
          <div className="px-6 pb-10 prose prose-gray max-w-none">
            {renderBlocks(blog.blocks)}
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;