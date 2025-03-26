import React from "react";
import { IconButton } from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";

export default function ThemeSwitcher({ toggleTheme, mode }) {
  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        transition: "transform 0.6s ease, background-color 0.3s ease",
        display: "flex",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: mode === "dark" ? "#444" : "#f9f9f9",
        "&:hover": {
          backgroundColor: mode === "dark" ? "#555" : "#e0e0e0",
        },
        transform: mode === "dark" ? "rotate(0deg)" : "rotate(180deg)",
      }}
    >
      {mode === "dark" ? (
        <NightsStay sx={{ color: "#fbc02d", fontSize: 36 }} />
      ) : (
        <WbSunny sx={{ color: "#ff9800", fontSize: 36 }} />
      )}
    </IconButton>
  );
}
