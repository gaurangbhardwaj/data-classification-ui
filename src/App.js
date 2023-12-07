import React from "react";
import Home from "./components/home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "light",
        },
      })}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Home />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
