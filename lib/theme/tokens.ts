/**
 * Design System Tokens
 * Central place for all colors, spacing, typography, shadows
 */

export const tokens = {
  // Colors - Light Mode
  colors: {
    // Primary
    primary: {
      50: '#f3e8ff',
      100: '#e9d5ff',
      200: '#d8b4fe',
      300: '#c084fc',
      400: '#a855f7',
      500: '#9333ea',
      600: '#7e22ce',
      700: '#6b21a8',
      800: '#581c87',
      900: '#3f0f5c',
    },
    // Secondary (Blue)
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Danger/Red
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    // Success/Green
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#145231',
    },
    // Warning/Orange
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    // Neutral/Gray
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  // Spacing (8px base unit)
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  // Typography
  typography: {
    // Headings
    h1: {
      fontSize: '2.5rem',  // 40px
      lineHeight: '1.2',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',    // 32px
      lineHeight: '1.3',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',  // 24px
      lineHeight: '1.4',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.4',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',    // 16px
      lineHeight: '1.5',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontWeight: 600,
    },
    // Body
    body: {
      lg: {
        fontSize: '1.125rem',  // 18px
        lineHeight: '1.6',
        fontWeight: 400,
      },
      base: {
        fontSize: '1rem',      // 16px
        lineHeight: '1.6',
        fontWeight: 400,
      },
      sm: {
        fontSize: '0.875rem',  // 14px
        lineHeight: '1.5',
        fontWeight: 400,
      },
      xs: {
        fontSize: '0.75rem',   // 12px
        lineHeight: '1.4',
        fontWeight: 400,
      },
    },
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },

  // Transitions
  transitions: {
    fast: 'all 150ms ease-in-out',
    base: 'all 300ms ease-in-out',
    slow: 'all 500ms ease-in-out',
  },
};

// Dark mode token overrides
export const darkTokens = {
  colors: {
    neutral: {
      50: '#0f1117',
      100: '#161b22',
      200: '#21262d',
      300: '#30363d',
      400: '#484f58',
      500: '#6e7681',
      600: '#79c0ff',
      700: '#c9d1d9',
      800: '#e6edf3',
      900: '#f0f6fc',
    },
  },
};

export type ThemeTokens = typeof tokens;
