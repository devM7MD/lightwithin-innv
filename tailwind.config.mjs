// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          'teal': {
            100: '#B8E0DA',
            200: '#97D0C9',
            300: '#76BFB2',
            400: '#57AF9C',
            500: '#3B9E85',
            600: '#2F7F6B',
            700: '#236051',
            800: '#184036',
            900: '#0C201B',
          },
        },
      },
    },
    plugins: [],
  }