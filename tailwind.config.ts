import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#C2185B',
          primarydark: '#B21151',
          secondary: '#ee7f09',  
          secondarydark: '#c0680b',   
          neutral: '#4e4e4e',   
        },
        screens: {
          'xs': { 'max': '539px' },     // celulares pequeños
          'sm': { 'min': '540px', 'max': '768px' },     // móviles normales
          'md': { 'min': '769px', 'max': '1024px' },    // tablets
          'lg': { 'min': '1025px' }, 

        },
      },
    },
    plugins: [],
  }
  export default config;
