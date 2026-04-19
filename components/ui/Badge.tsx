import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const variantClasses = {
      primary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      warning: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center rounded-full font-semibold transition-colors duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
