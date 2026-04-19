'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, defaultTab, onChange, className = '', ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultTab || items[0]?.id || '');

    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      onChange?.(tabId);
    };

    return (
      <div ref={ref} className={className} {...props}>
        {/* Tab List */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              disabled={item.disabled}
              className={`
                flex items-center gap-2 px-4 py-3 font-semibold text-sm whitespace-nowrap
                border-b-2 transition-all duration-300
                ${
                  activeTab === item.id
                    ? 'border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
                ${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {items.map((item) => (
            activeTab === item.id && (
              <div key={item.id} className="animate-in fade-in-50 duration-300">
                {item.content}
              </div>
            )
          ))}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
