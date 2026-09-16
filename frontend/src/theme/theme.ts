"use client";

import { createTheme, alpha } from "@mui/material/styles";

const ink = "#14212b";
const mist = "#f3f1ec";
const copper = "#c45c26";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ink,
      light: "#2c3d4a",
      dark: "#0b1218",
      contrastText: "#ffffff",
    },
    secondary: {
      main: copper,
      light: "#d67a4a",
      dark: "#9a3f14",
      contrastText: "#ffffff",
    },
    background: {
      default: mist,
      paper: "#ffffff",
    },
    text: {
      primary: ink,
      secondary: alpha(ink, 0.68),
    },
    divider: alpha(ink, 0.1),
    success: {
      main: "#2f6f4e",
    },
    error: {
      main: "#b42318",
    },
  },
  typography: {
    fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.015em" },
    h6: { fontWeight: 700, letterSpacing: "-0.01em" },
    subtitle1: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(20, 33, 43, 0.04)",
    "0 4px 12px rgba(20, 33, 43, 0.06)",
    "0 8px 24px rgba(20, 33, 43, 0.08)",
    "0 12px 32px rgba(20, 33, 43, 0.1)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
    "0 16px 40px rgba(20, 33, 43, 0.12)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(196, 92, 38, 0.08), transparent)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
        sizeLarge: {
          minHeight: 48,
          paddingInline: 24,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#fff",
        },
      },
    },
  },
});

export default theme;
