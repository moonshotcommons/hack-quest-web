import type { Config } from 'tailwindcss';

import {
  themeColors,
  backgroundImage,
  backgroundColor,
  borderColor
} from './config/theme/variable';

const config: Config = {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        ...backgroundImage
      },

      fontFamily: {
        'next-book-bold': ['NEXT Book Bold'],
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
        Inter: ['Inter'],
        'Space-Mono': ['Space Mono', 'monospace;']
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

        '2xl': '1352px',
        // => @media (min-width: 1352px) { ... }
        slab: {
          raw: '(max-width: 1024px)'
        },
        wap: {
          raw: '(max-width: 768px)'
        }
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
          lg: '768px',
          xl: '1024px',
          '2xl': '1280px'
        }
      }
    }
  },
  plugins: []
};

export default config;
