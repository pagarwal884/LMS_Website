/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "course-details-heading-small": [
          "26px",
          { lineHeight: "36px" },
        ],
        "course-details-heading-large": [
          "36px",
          { lineHeight: "44px" },
        ],
        "home-heading-small": [
          "28px",
          { lineHeight: "36px" },
        ],
        "home-heading-large": [
          "48px",
          { lineHeight: "58px" },
        ],
        default: [
          "15px",
          { lineHeight: "24px" },
        ],
      },
    },
  },
  plugins: [],
};