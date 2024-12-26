/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roobert', 'system-ui', 'sans-serif'],
      },
      colors: {
        twitch: {
          purple: '#9146FF',
          darkPurple: '#772CE8',
          black: '#0E0E10',
          darkGray: '#18181B',
          gray: '#1F1F23',
          lightGray: '#EFEFF1',
        },
      },
    },
  },
  plugins: [],
};