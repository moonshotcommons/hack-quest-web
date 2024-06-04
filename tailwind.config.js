/** @type {import('tailwindcss').Config} */

import { themeColors, backgroundImage, backgroundColor, borderColor } from './config/theme/variable';

module.exports = {
  darkMode: ['class'],
  prefix: '',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
    // './node_modules/@moonshotcommons/hackquest-editor/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '0rem',
      screens: {
        '2xl': '1360px'
      }
    },
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

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        modal: '0px 4px 8px 0px rgba(0, 0, 0, 0.12)',
        'idea-card': '0px 0px 8px 0px rgba(0, 0, 0, 0.12)',
        popper: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        ...themeColors,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
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
  plugins: [require('tailwindcss-animate')]
};
