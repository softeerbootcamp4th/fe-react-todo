const palette = {
  black: "#1E1F22",
  gray: "#2B2D30",
  blue: "#3573F0",
  white: "#FFFFFF",
  semiWhite: "#BBBBBB",
};

// 1rem : 16px
const typo = {
  header: {
    fontSize: "0.9rem",
    lineHeight: "0.9rem",
    color: palette.white,
  },
  footer: {
    fontSize: "0.8rem",
    lineHeight: "0.8rem",
    color: palette.white,
  },
  innerHeader: {
    fontSize: "0.9rem",
    lineHeight: "0.9rem",
    color: palette.white,
  },
  contents: {
    fontSize: "0.85rem",
    lineHeight: "0.85rem",
    color: palette.semiWhite,
  },
};

const layout = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const theme = {
  palette,
  typo,
  layout,
};
