
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary:"#037662",
        secondary:"#31C9AE"
      },
       fontFamily:{
      'heading': ['Kavoon', 'cursive'],
    }
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
