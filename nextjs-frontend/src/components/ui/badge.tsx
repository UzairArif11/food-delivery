import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
      case 'destructive':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'outline':
        return 'border border-gray-200 text-gray-900 bg-transparent hover:bg-gray-100';
      default:
        return 'bg-primary-600 text-white hover:bg-primary-700';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${getVariantStyles()} ${className}`}>
      {children}
    </span>
  );
};
