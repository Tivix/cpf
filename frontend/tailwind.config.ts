import type { Config } from 'tailwindcss';
import { theme } from '@app/styles/theme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: theme.colors,
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
