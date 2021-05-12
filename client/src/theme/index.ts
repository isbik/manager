import { ThemeOptions } from "@material-ui/core";

const commonTheme: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          scrollbarColor: "#1a1144",
          scrollbarWidth: "thin",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        "*::-webkit-scrollbar": {
          width: "0.05em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          height: 20,
          backgroundColor: "rgba(0,0,0,.5)",
        },
        ".none-outline": {
          outline: "none",
        },
        ".placeholder": {
          "&[contenteditable][placeholder]:empty:before": {
            content: "attr(placeholder)",
            position: "absolute",
            color: "gray",
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
};

export const light: ThemeOptions = {
  palette: {
    type: "light",
  },
  ...commonTheme,
};

export const dark: ThemeOptions = {
  palette: {
    type: "dark",
  },
  ...commonTheme,
};
