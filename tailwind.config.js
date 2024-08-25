/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'form-bg': "url('/assets/images/FormBackground.svg')",
      },
      fontFamily: {
        stmono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        'form-bg-color': '#222835',
      },
    },
  },
  plugins: [],
};
