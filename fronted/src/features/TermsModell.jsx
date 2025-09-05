// src/components/TermsModal.js
import React from 'react';
import { BookOpen, X } from 'lucide-react';

const TermsModal = ({ show, onClose, title, terms, actionLabel = "I Agree & Close" }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-96 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-yellow-50">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-yellow-400" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-700 space-y-3">
          <ul className="list-disc list-inside space-y-2">
            {terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;