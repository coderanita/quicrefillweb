/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial for React TypeScript projects
  ],
    safelist: [
    'text-white',
    'text-black',
    
  ],
  theme: {
    extend: {
        colors: {
        'my-yellow-light': '#FFC107', // Example yellow color
        'my-yellow-dark': '#FF9800',  // Example dark yellow
        'my-orange': '#FF5722',       // Example orange color
        'my-orange-dark': '#E64A19',  // Example dark orange
      },
    },
  },
  plugins: [],
};
