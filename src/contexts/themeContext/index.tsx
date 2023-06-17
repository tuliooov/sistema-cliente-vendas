"use client";
import React, { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export interface ThemeContextType {
  swapTheme: () => void
  modeTheme: ThemeModeType

}


const darkMode = createTheme({
  palette: {
    mode: 'dark'
  },
});

const lightMode = createTheme({
  palette: {
    mode: 'light'
  },
});


export const ThemeContext = createContext({});

export enum ThemeModeEnum {
  dark = 'dark',
  light = 'light'
}


export type ThemeModeType = 'dark' | 'light';

export const getThemeDefault = () => {
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") as ThemeModeType : ThemeModeEnum.light;
  return theme
};


export const ThemeSystemProvider = ({ children }: { children: any }) => {
  const [modeTheme, setModeTheme] = useState<ThemeModeType>(getThemeDefault())


  const swapTheme = () => {
    const newmode = modeTheme === ThemeModeEnum.dark ? ThemeModeEnum.light : ThemeModeEnum.dark
    localStorage.setItem("theme", newmode);
    setModeTheme(newmode);
  };

  return (
    <ThemeContext.Provider value={{ swapTheme, modeTheme }}>
        <ThemeProvider theme={modeTheme === ThemeModeEnum.dark ? darkMode : lightMode}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext) as ThemeContextType;
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
