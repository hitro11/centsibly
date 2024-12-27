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
                customPrimary: '#87c3f7',
                customSecondary: '#032542',
            },
        },
    },
    plugins: [],
};
