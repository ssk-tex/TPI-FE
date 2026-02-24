import React from "react";

export default function Btn({
  label = "Click Me",      // default button text
  onClick = () => {},      // default empty click handler
  type = "button",         // button type
  variant = "primary",     // style variant: primary | secondary | danger
  size = "md",             // size: sm | md | lg
  disabled = false,
}) {
  // Dynamic classes based on props
  const baseClasses = "rounded-lg font-semibold transition-all duration-200 focus:outline-none";
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    xxl: "px-30 py-4 text-lg",

  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
}
