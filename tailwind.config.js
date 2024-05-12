/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        otomanopee: ['Otomanopee One', 'monospace'],
        odor: ['Odor Mean Chey', 'monospace'],
        nunito: ['Nunito Sans', 'monospace']
      },
    },
  },
};
