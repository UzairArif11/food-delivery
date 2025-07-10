import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileResponsiveHeaderProps {
  title: string;
  backUrl?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const MobileResponsiveHeader: React.FC<MobileResponsiveHeaderProps> = ({
  title,
  backUrl = '/admin/dashboard',
  showBackButton = true,
  actions
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => navigate(backUrl)}
                className="text-gray-500 hover:text-gray-700 mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {title}
            </h1>
          </div>
          {actions && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileResponsiveHeader;
