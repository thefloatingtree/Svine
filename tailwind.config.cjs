const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'background': '#171717',
        'background-light': '#2E2E2E',
        'background-light-light': '#454545',
        'gray-light': '#C8C8C8',
      }
    },
  },

  plugins: [],
};

module.exports = config;
