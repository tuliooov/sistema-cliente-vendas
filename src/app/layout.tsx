"use client";

import "../styles/global.css";

import { Roboto } from "@next/font/google";
import { createTheme, ThemeProvider } from "@mui/material";
import { UserProvider } from "@/contexts/userContext";
import { SnackbarProvider } from "material-ui-snackbar-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "400", "500"],
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={roboto.className} lang="pt-br">
      <head >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <UserProvider>
            <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
          </UserProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
