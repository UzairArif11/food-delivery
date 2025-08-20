'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ContactManagementPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Contact Management
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Contact Messages
          </h2>
          
          <p className="text-gray-600 mb-4">
            This page will display all contact form submissions from customers.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">
              <strong>Note:</strong> Contact Management functionality needs to be implemented.
              This should include:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700">
              <li>Display all contact form submissions</li>
              <li>Filter by status (new, replied, resolved)</li>
              <li>Mark messages as read/unread</li>
              <li>Reply to customer messages</li>
              <li>Delete messages</li>
              <li>Export contact data</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagementPage;
