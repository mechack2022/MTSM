/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Material Design 3 Color System - Using Blue Theme to match app
        'primary': '#2563eb', // blue-600
        'on-primary': '#FFFFFF',
        'primary-container': '#dbeafe', // blue-100
        'on-primary-container': '#1e3a8a', // blue-900

        'secondary': '#3b82f6', // blue-500
        'on-secondary': '#FFFFFF',
        'secondary-container': '#bfdbfe', // blue-200
        'on-secondary-container': '#1e3a8a', // blue-900
        'secondary-fixed': '#93c5fd', // blue-300

        'tertiary': '#06b6d4', // cyan-500
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#cffafe', // cyan-100
        'on-tertiary-container': '#164e63', // cyan-900

        'error': '#B3261E',
        'on-error': '#FFFFFF',
        'error-container': '#F9DEDC',
        'on-error-container': '#410E0B',

        'surface': '#FFFFFF',
        'on-surface': '#1C1B1F',
        'on-surface-variant': '#44474F',
        'surface-variant': '#E3E2E6',

        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F8F9FA',
        'surface-container': '#F1F3F4',
        'surface-container-high': '#E8EAED',
        'surface-container-highest': '#E1E3E6',

        'surface-tint': '#2563eb', // blue-600
        'surface-bright': '#FFFFFF',
        'surface-dim': '#DFE1E5',

        'inverse-surface': '#2D3748',
        'inverse-on-surface': '#F7FAFC',
        'inverse-primary': '#60A5FA', // blue-400

        'outline': '#6B7280', // gray-500
        'outline-variant': '#D1D5DB', // gray-300
        'shadow': '#000000',
        'scrim': '#000000',
      },
      fontSize: {
        'display-lg': ['57px', { lineHeight: '64px', fontWeight: '400' }],
        'display-md': ['45px', { lineHeight: '52px', fontWeight: '400' }],
        'display-sm': ['36px', { lineHeight: '44px', fontWeight: '400' }],

        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '400' }],
        'headline-md': ['28px', { lineHeight: '36px', fontWeight: '400' }],
        'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '400' }],

        'title-lg': ['22px', { lineHeight: '28px', fontWeight: '500' }],
        'title-md': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'title-sm': ['14px', { lineHeight: '20px', fontWeight: '500' }],

        'label-lg': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'label-sm': ['11px', { lineHeight: '16px', fontWeight: '500' }],
        'label-pill': ['10px', { lineHeight: '14px', fontWeight: '600' }],

        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
