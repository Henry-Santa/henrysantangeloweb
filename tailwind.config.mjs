/*
 * Tailwind CSS Configuration
 * --------------------------
 * Enabling `darkMode: "class"` allows us to toggle themes by simply adding
 * the `dark` class to the root `<html>` element (see `ThemeToggle`). In
 * addition we register the `app` and `public` folders for class scanning so
 * that unused styles are purged correctly in production.
 */

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './public/**/*.{md,html}',
    './app/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          DEFAULT: '#393e41',
          100: '#0b0c0d',
          200: '#17191a',
          300: '#222527',
          400: '#2e3234',
          500: '#393e41',
          600: '#5d666b',
          700: '#838d93',
          800: '#acb3b7',
          900: '#d6d9db'
        },
        timberwolf: {
          DEFAULT: '#d3d0cb',
          100: '#2d2a26',
          200: '#59544c',
          300: '#867f72',
          400: '#aca79e',
          500: '#d3d0cb',
          600: '#dbd9d5',
          700: '#e4e3e0',
          800: '#edecea',
          900: '#f6f6f5'
        },
        platinum: {
          DEFAULT: '#e7e5df',
          100: '#343127',
          200: '#67614e',
          300: '#999078',
          400: '#c0bbab',
          500: '#e7e5df',
          600: '#eceae5',
          700: '#f1efec',
          800: '#f5f5f2',
          900: '#fafaf9'
        },
        keppel: {
          DEFAULT: '#44bba4',
          100: '#0e2521',
          200: '#1b4b41',
          300: '#297062',
          400: '#369683',
          500: '#44bba4',
          600: '#69c9b6',
          700: '#8fd6c8',
          800: '#b4e4da',
          900: '#daf1ed'
        },
        saffron: {
          DEFAULT: '#e7bb41',
          100: '#352807',
          200: '#69510d',
          300: '#9e7914',
          400: '#d3a11a',
          500: '#e7bb41',
          600: '#ecc966',
          700: '#f1d68d',
          800: '#f6e4b3',
          900: '#faf1d9'
        }
      }
    },
  },
  plugins: [],
};

export default config; 