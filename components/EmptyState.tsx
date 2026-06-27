'use client';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}

export default function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md w-full text-center">
        {icon ? (
          <div className="mb-4 flex justify-center">{icon}</div>
        ) : (
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {title || 'No data found'}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {message || 'There is nothing to display here yet.'}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
