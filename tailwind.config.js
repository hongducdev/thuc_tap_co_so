/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            body: ["Montserrat", "sans-serif"],
         },
         colors: {
            primary: "#66DE93",
         },
      },
   },
   plugins: [],
};
