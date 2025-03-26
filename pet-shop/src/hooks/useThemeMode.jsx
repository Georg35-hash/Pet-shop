import { useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

export default function useThemeMode() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: { default: "#121212", paper: "#1E1E1E" },
                text: { primary: "#ffffff", secondary: "#000000" },
              }
            : {
                background: { default: "#ffffff", paper: "#f5f5f5" },
                text: { primary: "#000000", secondary: "#ffffff" },
              }),
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme, mode };
}
