/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary-normal": "#F40000",
        "secondary-normal": "#1A2B88",
        "warning-normal": "#F0AD4E",
        "success-normal": "#4BB543",
        "grey-normal": "#8F8F8F",
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        "spin-slow": "spin 5s linear infinite",
      },
      keyframes: {
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          // Buttons:
          // Primary
          ".btn-primary-normal": {
            "background-color": "#F40000",
          },
          ".btn-primary-normal:hover": {
            "background-color": "#DC0000",
          },
          ".btn-primary-normal:active": {
            "background-color": "#C30000",
          },
          ".btn-primary-normal-darker": {
            "background-color": "#E54646",
          },
          ".btn-primary-normal-darker:hover": {
            "background-color": "#ac3535",
          },
          ".btn-primary-normal-darker:active": {
            "background-color": "#892a2a",
          },
          // Secondary
          ".btn-secondary-normal": {
            "background-color": "#1A2B88",
          },
          ".btn-secondary-normal:hover": {
            "background-color": "#17277A",
          },
          ".btn-secondary-normal:active": {
            "background-color": "#15226D",
          },
          // Success
          ".btn-success-normal": {
            "background-color": "#4BB543",
          },
          ".btn-success-normal:hover": {
            "background-color": "#44A33C",
          },
          ".btn-success-normal:active": {
            "background-color": "#3C9136",
          },
          // Warning
          ".btn-warning-normal": {
            "background-color": "#F0AD4E",
          },
          ".btn-warning-normal:hover": {
            "background-color": "#D89C46",
          },
          ".btn-warning-normal:active": {
            "background-color": "#C08A3E",
          },
          // Ghost
          ".btn-ghost-neuro": {
            color: "#8F8F8F",
            "background-color": "#FFFFFF",
            "box-shadow": "1px 1px 4px rgba(0, 0, 0, 0.12)",
            "border-radius": "10px",
          },
          ".btn-ghost-neuro:hover": {
            color: "#8F8F8F",
            "background-color": "#FFFFFF",
            "box-shadow": "1px 1px 4px rgba(0, 0, 0, 0.12)",
            "border-radius": "10px",
          },
          ".btn-primary-outline": {
            "background-color": "transparent",
            "border-color": "#F40000",
            color: "#F40000",
          },
          ".btn-primary-outline:hover": {
            "background-color": "#F40000",
            "border-color": "#F40000",
            color: "white",
          },
          ".btn-secondary-outline": {
            "background-color": "transparent",
            "border-color": "#1A2B88",
            color: "#1A2B88",
          },
          ".btn-secondary-outline:hover": {
            "background-color": "#1A2B88",
            "border-color": "#1A2B88",
            color: "white",
          },
          ".btn-secondary-outline-dark": {
            "background-color": "transparent",
            "border-color": "#32323c",
            color: "white",
          },
          ".btn-secondary-outline-dark:hover": {
            "background-color": "#1A2B88",
            "border-color": "#1A2B88",
            color: "white",
          },
          ".btn-secondary-transparent": {
            "background-color": "transparent",
            "border-color": "#d3d4d7",
            color: "#1A2B88",
          },
          ".btn-secondary-transparent:hover": {
            "background-color": "#1A2B88",
            "border-color": "#1A2B88",
            color: "white",
          },
          ".btn-success-outline": {
            "background-color": "transparent",
            "border-color": "#4BB543",
            color: "#4BB543",
          },
          ".btn-success-outline:hover": {
            "background-color": "#4BB543",
            "border-color": "#4BB543",
            color: "white",
          },
          ".btn-warning-outline": {
            "background-color": "transparent",
            "border-color": "#F0AD4E",
            color: "#F0AD4E",
          },
          ".btn-warning-outline:hover": {
            "background-color": "#F0AD4E",
            "border-color": "#F0AD4E",
            color: "white",
          },

          // Radios
          ".radio-warning-normal": {
            "border-color": "#F0AD4E",
          },
          ".radio-warning-normal:checked": {
            "border-color": "#F0AD4E",
            "background-color": "#F0AD4E",
          },
          ".radio-success-normal": {
            "border-color": "#4BB543",
          },
          ".radio-success-normal:checked": {
            "border-color": "#4BB543",
            "background-color": "#4BB543",
          },
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
