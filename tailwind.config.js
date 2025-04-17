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
    themes: ["light", "dark", {
        nujin: {
          "primary": "#0EA5E9",
          "primary-focus": "#0284C7",
          "primary-content": "#ffffff",
          
          "secondary": "#A855F7",
          "secondary-focus": "#9333EA",
          "secondary-content": "#ffffff",
          
          "accent": "#06B6D4",
          "accent-focus": "#0891B2",
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
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
}
