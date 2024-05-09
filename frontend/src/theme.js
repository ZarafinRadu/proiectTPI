export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: { main: "#4d7ec9" },
              secondary: {
                main: "#d81d1d",
                dark: "#4f3c8a",
              },
              error: {
                main: "#d32f2f",
              },
            }
          : {
              primary: {
                main: "#1976d2",
              },
              secondary: {
                main: "#9c27b0",
              },
              background: {
                default: "#e2dada",
                paper: "#BD4242",
              },
            }),
      },
    };
  };