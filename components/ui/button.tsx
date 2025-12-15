import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", fullWidth, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "bg-[#0D47A1] text-white hover:bg-[#0a3d91] focus:ring-blue-700 shadow-md hover:shadow-lg",
      secondary: "bg-[#E53935] text-white hover:bg-[#C62828] focus:ring-red-600 shadow-md hover:shadow-lg",
      outline: "border-2 border-[#0D47A1] text-[#0D47A1] hover:bg-blue-50 focus:ring-blue-700",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      danger: "bg-[#E53935] text-white hover:bg-[#C62828] focus:ring-red-600 shadow-md hover:shadow-lg",
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    }
    
    const widthClass = fullWidth ? "w-full" : ""
    
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
