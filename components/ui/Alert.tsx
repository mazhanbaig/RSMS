import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', title, dismissible = false, onDismiss, className = '', children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const typeStyles = {
      success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      warning: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200',
      info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    };

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={`border-l-4 p-4 rounded-lg transition-all duration-300 ${typeStyles[type]} ${className}`}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && <h3 className="font-semibold mb-1">{title}</h3>}
            <p className="text-sm">{children}</p>
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="ml-4 text-lg font-bold opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
