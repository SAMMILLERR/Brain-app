import type { ReactElement } from 'react'

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({ 
  variant = "primary", 
  text, 
  startIcon, 
  onClick, 
  type = "button",
  className = "",
  disabled = false,
  size = "md"
}: ButtonProps) {
  
  const baseClasses = "flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  const variantClasses = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-secondary-100 hover:bg-secondary-200 text-secondary-800 border border-secondary-300"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      {text}
    </button>
  );
}