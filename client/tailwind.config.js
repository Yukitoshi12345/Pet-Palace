/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
//import tailwind typography plugin
import typography from '@tailwindcss/typography'
//import flowbite plugin
import flowbite from 'flowbite/plugin'


export default {
  darkMode: 'class',
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    fontFamily: {
      primary: ['Playfair Display', 'serif'],
      body: ['Barlow', 'sans-serif'],
      logo: ['Great Vibes', 'cursive'],
      bodyAlt: ['Saira', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '3rem',
      },
    },
    /*
    not using this anymore
    clashing with flowbite
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
     display: ["group-hover"],
      colors: {
        primary: '#050402',
        //secondary: '#1C1D24',
        secondary: '#14161A',
        //tertiary: '#131419',
        tertiary: '#0c0908',
        accent: {
          DEFAULT: '#ac6b34',
          hover: '#925a2b',
        },
        leather: '#0b0806',
        // paragraph: '#878e99',
        paragraph: '#78716c',
        blackperl: '#0e1013', 
      },
    },
    */
  },
  daisyui: {
    themes: [
      "emerald",
      {
      business:{
        ...require("daisyui/src/theming/themes")["business"],
        neutral: "#ffffff",
        accent: "#A16207"
      },
      emerald:{
        ...require("daisyui/src/theming/themes")["emerald"],
        accent: "#A16207"
      }
    }
    
    ],
  },
  plugins: [
    daisyui,
    /* require ('@tailwindcss/typography'),
    require('flowbite/plugin') */
    typography,
    flowbite
  ],
};
