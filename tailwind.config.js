/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./modules/**/*.{js,vue,ts}",
    "./assets/css/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#6366F1",
          "primary-focus": "#4F46E5",
          "primary-content": "#ffffff",
          
          "secondary": "#EC4899",
          "secondary-focus": "#DB2777",
          "secondary-content": "#ffffff",
          
          "accent": "#8B5CF6",
          "accent-focus": "#7C3AED",
          "accent-content": "#ffffff",
          
          "neutral": "#1F2937",
          "neutral-focus": "#111827",
          "neutral-content": "#ffffff",
          
          "base-100": "#ffffff",
          "base-200": "#F9FAFB",
          "base-300": "#F3F4F6",
          "base-content": "#1F2937",
          
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem"
        }
      },
      {
        dark: {
          "primary": "#6366F1",
          "primary-focus": "#4F46E5",
          "primary-content": "#ffffff",
          
          "secondary": "#EC4899",
          "secondary-focus": "#DB2777",
          "secondary-content": "#ffffff",
          
          "accent": "#8B5CF6",
          "accent-focus": "#7C3AED",
          "accent-content": "#ffffff",
          
          "neutral": "#1F2937",
          "neutral-focus": "#111827",
          "neutral-content": "#ffffff",
          
          "base-100": "#1E1E2E",
          "base-200": "#181825",
          "base-300": "#11111B",
          "base-content": "#CDD6F4",
          
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem"
        }
      }
    ]
  },
}
