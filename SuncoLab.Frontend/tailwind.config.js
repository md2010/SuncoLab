/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        dark: "var(--color-dark)",
        bone: "var(--color-bone)",
        white: "var(--color-white)",
        triadic: "var(--color-triadic)",
      },
      // spacing: {
      //   xs: "var(--space-xs)",
      //   sm: "var(--space-sm)",
      //   md: "var(--space-md)",
      //   lg: "var(--space-lg)",
      //   xl: "var(--space-xl)",
      // },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        md: "var(--shadow-md)",
        'inner-both': 'inset 4px 4px 8px rgba(0,0,0,0.25), inset -4px -4px 8px rgba(0,0,0,0.25)',
      },
      dropShadow: {
      'paper': '0 8px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        anton: ["Anton", "system-ui", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
