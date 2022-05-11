module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /./,
    },
  ],
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: ['cyberpunk', 'synthwave'],
    //darkTheme: 'synthwave',
  },
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '10px 10px 0px',
      },
    },
  },
};
