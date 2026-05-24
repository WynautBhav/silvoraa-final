'use client';
import React from 'react';
 
 interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'white';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-sans uppercase tracking-[0.08em] text-sm font-semibold rounded-[2px]";
  
  const variants = {
    primary: "bg-silvoraa-gold text-white hover:bg-silvoraa-deepGold active:bg-[#9E7D18] px-8 py-4",
    secondary: "bg-transparent border-2 border-silvoraa-black text-silvoraa-black hover:bg-silvoraa-black hover:text-white px-[30px] py-[14px]",
    tertiary: "bg-transparent text-silvoraa-black hover:text-silvoraa-gold relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:bg-silvoraa-gold hover:after:w-full after:transition-all after:duration-200 px-0 py-2",
    icon: "bg-transparent hover:bg-black/5 rounded-full p-2 h-10 w-10 text-silvoraa-black",
    white: "bg-white text-silvoraa-black hover:bg-silvoraa-gold hover:text-white px-8 py-4 shadow-lg"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed bg-silvoraa-lightGray text-silvoraa-warmGray border-silvoraa-lightGray";

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${(disabled || isLoading) ? disabledStyles : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};