import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if you're using Next.js App Router
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", // black
        foreground: "#ffffff", // white
      },
      letterSpacing: {
        "3": "0.3em",
        "4": "0.4em",
        "5": "0.5em",
        "6": "0.6em",
        "7": "0.7em",
        "8": "0.8em",
        "9": "0.9em",
        "10": "1em",
        // custom tracking class -> tracking-4
        "11": "1.1em",
        "12": "1.2em",
        "13": "1.3em",
        "14": "1.4em",
        "15": "1.5em",
        "16": "1.6em",
        "17": "1.7em",
        "18": "1.8em",
        "19": "1.9em",
        "20": "2em",
        // custom tracking class -> tracking-4
        "21": "2.1em",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#ffffff",
            a: { color: "#ffffff" },
            h1: { color: "#ffffff" },
            h2: { color: "#ffffff" },
            h3: { color: "#ffffff" },
            strong: { color: "#ffffff" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
