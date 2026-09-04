/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '470px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'custom': '1143px',
      'xl': '1352px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        'site': '1400px',
      },
      borderRadius: {
        'card': '2.5rem',
        'card-lg': '3.5rem',
        'pill': '9999px',
      },
      colors: {
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
