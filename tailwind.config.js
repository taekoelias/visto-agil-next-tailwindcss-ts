module.exports = {
  content: [   
    "./pages/**/*.{jsx,tsx}",   
    "./app/**/*.{jsx,tsx}",  
    ],
  theme: {
    fontFamily: {
      sans: ['Open Sans','-apple-system','BlinkMacSystemFont', 'Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif'],
      serif: ['Montserrat', 'Georgia', 'Times New Roman', 'Times', 'serif'],
    },
    extend: {
      animation: {
        brandTextAnimation: '0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}