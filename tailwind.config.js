/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            body: ["Montserrat", "sans-serif"],
         },
         colors: {
            primary: "#F9A826",
         }
      },
   },
   plugins: [],
};
