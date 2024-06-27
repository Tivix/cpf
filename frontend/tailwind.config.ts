import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      navy: {
        50: '#F7F7F7',
        100: '#F2F3F4',
        200: '#E5E6EA',
        300: '#C8CBD0',
        400: '#A1A5AC',
        500: '#6E7481',
        600: '#555C6B',
        700: '#3C4455',
        800: '#232C40',
        900: '#0A142A',
      },
      blue: {
        50: '#F7FBFF',
        100: '#EBF0FF',
        200: '#DAE3FF',
        300: '#CBD7FF',
        400: '#B2C5FE',
        500: '#99AFF1',
        600: '#889EE5',
        700: '#657FCF',
        800: '#4B69C9',
        900: '#354FA0',
      },
      green: {
        200: '#E9FCE2',
        300: '#D5F6C9',
        600: '#2A8408',
      },
      red: {
        100: '#FCE2E2',
        300: '#FFC0C0',
        600: '#DC2626',
        700: '#BA1919',
      },
      yellow: {
        200: '#FCF9E2',
        300: '#FFF5C0',
        500: '#E9CE40',
        600: '#C6A700',
      },
    },
    fontSize: {
      sm: ['0.875rem', '1.225rem'],   // Body S
      base: ['1rem', '1.5rem'],       // Body M
      xl: ['1.25rem', '1.75rem'],     // Headline S
      '2xl': ['1.5rem', '1.875rem'],  // Headline M
      '3xl': ['2rem', '2.5rem'],      // Headline L
      '4xl': ['2.5rem', '3.125rem'],  // Headline XL
      '5xl': ['3.75rem', '4.375rem'], // Headline 2XL
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        l: ['1.125rem', '1.625rem'],    // Body L
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
