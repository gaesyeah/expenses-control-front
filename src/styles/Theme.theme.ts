export const theme = {
  colors: {
    status: { red: "#d63e3eff", green: "#53d869ff" },
    background: {
      white: "#FFFFFF",
      main: "#66c9e2ff",
      negative: "#d63e3eff",
      positive: "#53d869ff",
      gray: ["#d6d6d6ff"],
      shadow: "rgba(0, 0, 0, 0.25)",
    },
    font: {
      white: "#FFFFFF",
      main: "#66c9e2ff",
      gray: [],
    },
  },
  fonts: {
    Poppins: '"Poppins", sans-serif',
    Rubik: '"Rubik", sans-serif',
  },
  breakpoints: {
    mobile: "576px",
  },
};

export type Theme = typeof theme;
