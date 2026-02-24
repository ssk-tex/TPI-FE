// src/components/Modal.jsx
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, width = "auto", maxWidth = "90vw" }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-fit max-h-[90vh] overflow-auto p-6 transform transition-all duration-300 scale-100 animate-fade-in"
        role="dialog"
        aria-modal="true"
        style={{
          width,      // user-defined or default "auto"
          maxWidth,   // limit to prevent overflow on large content
        }}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
