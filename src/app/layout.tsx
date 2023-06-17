"use client";

import "../styles/global.css";

import { Roboto } from "@next/font/google";
import { UserProvider } from "@/contexts/userContext";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { ThemeProvider, createTheme } from "@mui/material";
import { useThemeDetector } from "@/contexts/useThemeDetector";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "400", "500"],
});





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const { isDarkTheme } = useThemeDetector()

  const theme = false ? createTheme({
    palette: {
      mode: "dark"
    }
  }) : createTheme({
    palette: {
      mode: "light"
    }
  })

  return (
    <html className={roboto.className} lang="pt-br">
      <head>
        <title>Controle de vendas</title>
        <meta name="viewport" content= "width=device-width, user-scalable=no" />
        
        <meta name="description" content="Sistema de controle de vendas" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
        <meta name="theme-color" content="#000" />
      </head>
      <body>
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <UserProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </UserProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
