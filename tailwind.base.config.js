// tailwind.base.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,html}',
    './packages/**/*.{js,ts,jsx,tsx}',
    './{src,pages,components,apps}/**/*.{ts,tsx,html}',
  ],
  darkMode: ['class', "[class~='dark']", "[class~='dark-theme']"],
  theme: {
  },
};
