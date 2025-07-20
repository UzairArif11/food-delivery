import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, footer, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            
          </button>
        </div>
        <div className="mb-4">
          {children}
        </div>
        {footer && <div className="flex justify-end">{footer}</div>}
      </div>
      <button className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></button>
    </div>
  );
};

export default Dialog;
