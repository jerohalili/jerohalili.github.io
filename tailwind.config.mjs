/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
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
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
