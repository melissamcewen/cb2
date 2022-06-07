module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: ['cyberpunk', 'night', 'dark'],
    darkTheme: 'dark',
  },
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '10px 10px 0px',
      },
    },
  },
};
