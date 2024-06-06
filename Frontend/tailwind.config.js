module.exports = {
  prefix: "tw-",
  content: [
    "./src/**/*.{js,jsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        "80vh": "80vh",
        "70vh": "70vh",
      },
    },
  },
  plugins: [],
};
