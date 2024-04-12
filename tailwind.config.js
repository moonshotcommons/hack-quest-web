/** @type {import('tailwindcss').Config} */

import { themeColors, backgroundImage, backgroundColor, borderColor } from './config/theme/variable';

module.exports = {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@moonshotcommons/hackquest-editor/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        ...backgroundImage
      },

      fontFamily: {
        'next-book-bold': ['var(--next-book-bold)'],
        'next-book': ['NEXT Book'],
        'next-book-Thin': ['NEXT Book Thin'],
        'next-poster-Bold': ['NEXT Poster Bold'],
        'next-poster': ['NEXT Poster'],
        'next-poster-Thin': ['NEXT Poster Thin'],
        'neuemachina-light': ['Neue Machina Light'],
        neuemachina: ['Neue Machina'],
        'futura-bold': ['Futura Bold'],
        'futura-book': ['Futura Book'],
        'Sofia-Pro-Light-Az': ['Sofia Pro;'],
        Chaney: ['Chaney'],
        'Chaney-Extended': ['Chaney-Extended'],
        MiSans: ['MiSans'],
        'MiSans-Semibold': ['MiSans-Semibold'],
        Inter: ['var(--font-inter)'],
        Nunito: ['var(--font-nunito)'],
        'Space-Mono': ['var(--font-space-mono)'],
        Poppins: ['var(--font-poppins)']
      },
      screens: {
        sm: '640px',
        // // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1360px',
        // => @media (min-width: 1352px) { ... }
        slab: {
          raw: '(max-width: 1024px)'
        },
        wap: {
          raw: '(max-width: 768px)'
        }
        // wapMin: {
        //   raw: '(max-width: 375px)'
        // }
      },
      colors: {
        ...themeColors
      },
      backgroundColor: {
        ...backgroundColor
      },
      borderColor: {
        ...borderColor
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1360px'
        }
      },
      maxHeight: {
        270: '67.5rem'
      }
    }
  },
  plugins: []
};
