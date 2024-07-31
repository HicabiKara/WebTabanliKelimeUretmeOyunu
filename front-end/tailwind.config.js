/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors:{
      violet:'#806FB3',
      white:'#FFF',
      gray:'#9ca3af',
      black:'#000',
      red:"#b91c1c",
      
    },

    extend: {
      keyframes: {
        fadeDown: {
          '0%': { opacity: '0',transform: 'translateY(-30px)' },
          '100%': { opacity: '1',transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '1' ,transform: 'translateY(0)'},
          '100%': { opacity: '0',transform: 'translateY(-30px)' },
        },
        slideLeft: {
          '0%': { opacity: '0',transform: 'translateX(100%)' },
          '100%': { opacity: '1',transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0',transform: 'translateX(-100%)' },
          '100%': { opacity: '1',transform: 'translateX(0)' },
        },
        hexColorChange: {
          '0%, 100%': { fill: '#806FB3', color: '#FFF' },
          '50%': { fill: '#FFF', color: '#806FB3' },
        },
      },
      animation: {
        fadeDown: 'fadeDown 0.3s ease-out forwards',
        fadeUp: 'fadeUp 0.3s ease-out forwards',
        slideLeft:'slideLeft 0.75s forwards',
        slideRight:'slideRight 0.75s forwards',
        hexColorChange: 'hexColorChange 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}

