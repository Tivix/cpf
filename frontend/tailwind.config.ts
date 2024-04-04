import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      navy: {
        50: "#F7F7F7",
        100: "#F2F3F4",
        200: "#E5E6EA",
        300: "#C8CBD0",
        400: "#A1A5AC",
        500: "#6E7481",
        600: "#555C6B",
        700: "#3C4455",
        800: "#232C40",
        900: "#0A142A",
      },
      blue: {
        50: "#F7FBFF",
        100: "#EBF0FF",
        200: "#DAE3FF",
        300: "#CBD7FF",
        400: "#B2C5FE",
        500: "#99AFF1",
        600: "#889EE5",
        700: "#657FCF",
        800: "#4B69C9",
        900: "#354FA0",
      },
      green: {
        200: "#E9FCE2",
        600: "#2A8408"
      },
      red: {
        100: "#FCE2E2",
        300: "#FFC0C0",
        600: "#DC2626",
        700: "#BA1919"
      },
      yellow: {
        200: "#FCF9E2",
        300: "#FFF5C0",
        500: "#E9CE40",
        600: "#C6A700"
      }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
