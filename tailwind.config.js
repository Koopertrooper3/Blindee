/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'apple-system' : ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
      },
      colors:{
        menubackground : '#f7f7f7',
        menuborder : '#e3e3e3',
        buttoncolor : 'hsl(224, 100%, 67%)',
      },
      borderWidth:{
        DEFAULT: '1px',
        '6' : '6px'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

