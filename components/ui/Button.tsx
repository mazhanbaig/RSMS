import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Size styles
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    // Variant styles
    const variants = {
      primary:
        'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 dark:bg-purple-500 dark:hover:bg-purple-600',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600',
      success:
        'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600',
      outline:
        'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950',
      ghost:
        'text-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-950',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
