/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Light mode ────────────────────────────────────────────────
        // Neutrals (60%)
        'bg':           '#FAFAF8',
        'surface':      '#FFFFFF',
        'surface-alt':  '#F1F4F1',
        'border':       '#E1E6E1',

        // Primary Sage (30%)
        'primary':        '#A8C3B0',
        'primary-hover':  '#8FB79B',
        'primary-muted':  '#CDE2D6',

        // Accent Peach (10%)
        'accent':         '#F2B6A0',
        'accent-hover':   '#E89D85',

        // Text
        'text':           '#1F2937',
        'text-muted':     '#475467',
        'text-faint':     '#98A29A',

        // ── Dark mode ─────────────────────────────────────────────────
        // Neutrals
        'dark-bg':          '#111412',
        'dark-surface':     '#1A1F1C',
        'dark-surface-alt': '#232A26',
        'dark-border':      '#343E39',

        // Primary Sage
        'dark-primary':       '#8FB89B',
        'dark-primary-hover': '#537F61',
        'dark-primary-muted': '#6FA680',

        // Accent Peach (more saturated in dark)
        'dark-accent':        '#FFBA9C',
        'dark-accent-hover':  '#FF9472',

        // Text
        'dark-text':          '#E6ECE7',
        'dark-text-muted':    '#B5BEB8',
        'dark-text-faint':    '#88938D',
      },

      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
      },

      lineHeight: {
        relaxed: '1.6',
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
