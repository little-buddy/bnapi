/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
