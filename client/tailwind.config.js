/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'light-color': '#474747',
        'dark-theme-highlight': '#292320',
        'dark-theme-highlight-2': '#4f433e',
      },
    },
  },
  plugins: [],
};
