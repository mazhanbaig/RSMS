import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'text' | 'circle' | 'rectangle' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ type = 'text', width = '100%', height = '1rem', count = 1, className = '', ...props }, ref) => {
    const typeClasses = {
      text: 'rounded',
      circle: 'rounded-full',
      rectangle: 'rounded-lg',
      card: 'rounded-lg h-32',
    };

    const skeletons = Array(count).fill(null).map((_, i) => (
      <div
        key={i}
        ref={i === 0 ? ref : undefined}
        className={`
          bg-gray-200 dark:bg-gray-700 animate-pulse
          ${typeClasses[type]}
          ${className}
        `}
        style={{
          width: type === 'card' ? '100%' : width,
          height: type === 'card' ? undefined : height,
          marginBottom: count > 1 && i < count - 1 ? '0.5rem' : '0',
        }}
        {...props}
      />
    ));

    return <>{skeletons}</>;
  }
);

Skeleton.displayName = 'Skeleton';
