import React from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, alt, size = 'md', fallback, className = '', ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
    };

    if (!src || hasError) {
      return (
        <div
          className={`rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${className}`}
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        onError={() => setHasError(true)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
