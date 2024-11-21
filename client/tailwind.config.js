const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  darkMode: 'class',
  // content: ['./src/**/*.{html,ts}', './src/libs/**/*.{html,ts}'],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#09090b',
        'light-color': '#474747',
        'dark-theme-highlight': '#292320',
        'dark-theme-highlight-2': '#4f433e',
      },
    },
  },
  plugins: [],
};
