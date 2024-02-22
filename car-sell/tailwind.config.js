/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      margin:{
        '40': '10rem',
        '48': '12rem'
      }
    }
  },
  plugins: []
};