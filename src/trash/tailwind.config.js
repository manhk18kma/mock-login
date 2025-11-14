/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        /**
         * Custom font sizes based on Figma design system
         *
         * Figma Analysis:
         * - 13px (0.8125rem) - MOST COMMON - Buttons, Inputs, Dropdowns
         * - 12px (0.75rem) - Badges, Body text, Small headings
         * - 14px (0.875rem) - Main headings, Labels
         * - 10px (0.625rem) - Tiny notes
         *
         * Usage:
         * - text-xs3 → 10px (Tiny notes)
         * - text-xs → 12px (Badges, body text) - Tailwind default
         * - text-xs2 → 13px (Buttons, Inputs) - Figma standard
         * - text-xs4 → 11px (Helper text) - Optional
         * - text-sm → 14px (Headings, labels) - Tailwind default
         * - text-sm2 → 15px (Section headings, Card titles)
         */
        xs3: ['10px', { lineHeight: '1.5' }], // 0.625rem - Tiny notes (h1-note)
        xs4: ['11px', { lineHeight: '1.5' }], // 0.6875rem - Helper text, small notes
        xs2: ['13px', { lineHeight: '1.5' }], // 0.8125rem - ⭐ Figma standard (Buttons, Inputs, Dropdowns)
        sm2: ['15px', { lineHeight: '1.5' }], // 0.9375rem - Section headings, Card titles
        // Note: xs (12px), sm (14px), base (16px), etc. are Tailwind defaults
      },
      spacing: {
        /**
         * Component-specific spacing values
         * Used for consistent padding, gaps, and margins across SyncUI components
         */
        'component-sm': '0.75rem', // 12px - Small component padding
        'component-md': '1rem', // 16px - Medium component padding
        'component-lg': '1.5rem', // 24px - Large component padding
        /**
         * Form field spacing
         * Used for spacing between form fields (Label + Input groups)
         */
        'form-field-gap': '0.5rem', // 8px - Standard gap between form fields
        'form-field-gap-sm': '0.25rem', // 4px - Compact gap between form fields
        'form-field-gap-lg': '1rem', // 16px - Spacious gap between form fields
        /**
         * Dialog/Modal spacing
         * Used for spacing inside dialogs
         */
        'dialog-footer': '1rem', // 16px - Footer padding top
        'dialog-error': '2rem', // 32px - Error message padding
        'dialog-loading-offset': '1.25rem', // 20px - Loading spinner vertical offset
        /**
         * Form container spacing
         * Used for form wrapper padding
         */
        'form-container': '1rem', // 16px - Standard form container padding (py-4 equivalent)
      },
      minHeight: {
        /**
         * Textarea min heights
         * From Figma Input_Text specs
         */
        'textarea-sm': '4rem', // 64px - Small textarea
        'textarea-md': '5rem', // 80px - Medium textarea (standard)
        'textarea-lg': '6rem', // 96px - Large textarea
        /**
         * Dialog loading min height
         * Used for loading state in dialogs
         */
        'dialog-loading': '200px', // 200px - Minimum height for loading spinner
      },
      minWidth: {
        /**
         * Dropdown/Select min widths
         * Used for consistent dropdown sizing
         */
        'dropdown-sm': '8rem', // 128px - Small dropdown
        'dropdown-md': '10rem', // 160px - Medium dropdown
        'dropdown-lg': '14rem', // 224px - Large dropdown (default)
        'dropdown-xl': '18rem', // 288px - Extra large dropdown
      },
      width: {
        /**
         * Input widths
         * Used for consistent input sizing
         * Default: w-full (100%)
         */
        'input-xs': '8rem', // 128px - Extra small input
        'input-sm': '12rem', // 192px - Small input
        'input-md': '16rem', // 256px - Medium input
        'input-lg': '20rem', // 320px - Large input
        'input-xl': '24rem', // 384px - Extra large input
      },
      boxShadow: {
        /**
         * Custom shadows for interactive components
         * From Figma design system
         */
        'card-interactive': '0 8px 30px rgb(0, 0, 0, 0.12)',
        'card-interactive-hover': '0 12px 40px rgb(0, 0, 0, 0.18)',
        'input-focus': '0 0 0 3px rgba(23, 111, 238, 0.1)', // Blue focus shadow (viettel-blue: #176fee)
      },
      fontFamily: {
        /**
         * Font families from design system
         * Primary: Inter (from Figma and basecode)
         * Fallback: System fonts for better performance
         */
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      zIndex: {
        /**
         * Z-index layers for components
         * Used for proper stacking order
         * Usage: z-dialog-overlay, z-dialog-content, z-dropdown, z-toast, z-tooltip
         * Note: dropdown z-index must be higher than dialog-content to appear above modals
         */
        'dialog-overlay': '100',
        'dialog-content': '101',
        'dialog-loading': '200', // Loading overlay inside dialog (above content)
        toast: '50',
        dropdown: '200', // Higher than dialog-content to appear above modals
        tooltip: '50',
      },
      maxWidth: {
        /**
         * Dialog/Modal max widths
         * Used for consistent modal sizing
         */
        'dialog-xs': '320px',
        'dialog-sm': '400px',
        'dialog-md': '500px',
        'dialog-lg': '700px',
        'dialog-xl': '900px',
        'dialog-full': '95vw',
        /**
         * Tooltip max widths
         * Used for tooltip content sizing
         */
        'tooltip-sm': '200px', // 200px - Small tooltip
      },
      maxHeight: {
        /**
         * Dialog scrollable max height
         * Used for scrollable modal content
         */
        'dialog-scrollable': '85vh',
        /**
         * Dropdown/Select max heights
         * Used for dropdown content scrolling
         */
        'dropdown-content': '300px', // Standard dropdown max height
        'dropdown-content-sm': '200px', // Small dropdown
        'dropdown-content-lg': '400px', // Large dropdown
      },
      colors: {
        /**
         * Brand colors (from standard template)
         * Usage: bg-brand, text-brand-light, border-brand-dark, etc.
         */
        brand: {
          DEFAULT: '#ef0032',
          light: '#fef2f4',
          lighter: '#fdeaed',
          dark: '#c00028',
          darker: '#9a0020',
        },
        /**
         * Viettel brand colors
         * Single source of truth - all colors defined here
         * Usage: bg-viettel-red, text-viettel-navy, border-viettel-rose, etc.
         */
        // Primary Colors
        'viettel-red': '#ef0032',
        'viettel-navy': '#2b3353',
        'viettel-orange': '#f5451a',
        'viettel-teal': '#028599',
        'viettel-blue': '#176fee',
        'viettel-green': '#489242',
        // Pastel Colors
        'viettel-rose': '#ffe5eb',
        'viettel-purple-light': '#ebedf5',
        'viettel-peach': '#fee1da',
        'viettel-mint': '#daf9fe',
        'viettel-sky': '#dfebfd',
        'viettel-sage': '#e0f1df',
        'viettel-lavender': '#98a2cc', // Used in Table header
        // Hover Colors
        'viettel-red-hover': '#d1002a',
        'viettel-navy-hover': '#3d4a6e',
        'viettel-rose-hover': '#FDEAED',
        // Neutral Colors
        'neutral-50': '#fafafa',
        'neutral-100': '#f8f9fa',
        'neutral-200': '#e9ecef',
        'neutral-300': '#dee2e6',
        'neutral-400': '#ced4da',
        'neutral-500': '#adb5bd',
        'neutral-600': '#6c757d',
        'neutral-700': '#495057',
        'neutral-800': '#343a40',
        'neutral-900': '#212529',
      },
      borderRadius: {
        /**
         * Radius values (from standard template)
         * Based on --radius: 0.625rem (10px)
         * Usage: rounded-sm, rounded-md, rounded-lg, rounded-xl
         */
        sm: 'calc(var(--radius) - 4px)', // 6px
        md: 'calc(var(--radius) - 2px)', // 8px
        lg: 'var(--radius)', // 10px
        xl: 'calc(var(--radius) + 4px)', // 14px
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        rotation: 'rotation 1s linear infinite',
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
