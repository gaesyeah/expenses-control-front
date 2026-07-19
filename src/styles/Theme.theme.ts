export const theme = {
  colors: {
    background: {
      white: "#FFFFFF",
      main: "#66c9e2ff",
      cancel: "#e45454ff",
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
