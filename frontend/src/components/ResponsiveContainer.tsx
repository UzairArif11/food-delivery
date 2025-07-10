import React, { useEffect } from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className = '' }) => {
  useEffect(() => {
    // Ensure viewport meta tag is properly set for mobile responsiveness
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const newMetaViewport = document.createElement('meta');
      newMetaViewport.name = 'viewport';
      newMetaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(newMetaViewport);
    }

    // Prevent zoom on iOS safari when focusing on input fields
    const preventZoom = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        target.style.fontSize = '16px';
      }
    };

    document.addEventListener('focusin', preventZoom);
    document.addEventListener('focusout', preventZoom);

    return () => {
      document.removeEventListener('focusin', preventZoom);
      document.removeEventListener('focusout', preventZoom);
    };
  }, []);

  return (
    <div className={`responsive-container ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
