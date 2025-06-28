
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'brand-brown': '#6B4F4B',
          'brand-light-brown': '#A68A81',
          'brand-cream': '#F5F2F0',
          'brand-dark': '#1F1A19',
        },
        animation: {
          marquee: 'marquee 25s linear infinite',
          marquee2: 'marquee2 25s linear infinite',
        },
        keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
