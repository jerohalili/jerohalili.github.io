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
        // Accent and zinc are driven by CSS variables (see src/styles/themes.css)
        // so the Control Panel can swap colors and themes at runtime.
        accent: {
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)',
          dark: 'rgb(var(--accent-600) / <alpha-value>)',
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
        },
        zinc: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => [
            n,
            `rgb(var(--zinc-${n}) / <alpha-value>)`,
          ])
        ),
      },

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
