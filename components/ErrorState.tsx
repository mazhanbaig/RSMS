'use client';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export default function ErrorState({ message, onRetry, fullPage }: ErrorStateProps) {
  const containerClass = fullPage
    ? 'flex flex-col items-center justify-center min-h-screen p-8'
    : 'flex flex-col items-center justify-center min-h-[400px] p-8';

  return (
    <div className={containerClass}>
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Failed to load data
        </h3>
        <p className="text-sm text-red-600 mb-6">
          {message || 'An error occurred while loading data. Please try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
