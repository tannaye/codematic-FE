/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // YouTube-inspired colors
        primary: '#FF0000', // YouTube's red color
        secondary: '#000', // Dark background (YouTube dark mode)
        background: '#F9F9F9', // Light background (YouTube light mode)
        textPrimary: '#0F0F0F', // Main text color (black)
        textSecondary: '#606060', // Secondary text color (gray)
        border: 'hsl(0,0%,18.82%)', // Light border color
        bgSecondary: 'hsla(0,0%,100%,0.08)',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Font similar to YouTube
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        xl: '12px', // Rounded corners similar to cards or buttons on YouTube
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards
        button: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for interactive buttons
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}

