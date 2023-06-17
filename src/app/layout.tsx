"use client";

import "../styles/global.css";

import { Roboto } from "@next/font/google";
import { UserProvider } from "@/contexts/userContext";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { ThemeSystemProvider } from "@/contexts/themeContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "400", "500"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html className={roboto.className} lang="pt-br">
      <head>
        <title>Controle de vendas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            <ThemeSystemProvider>
              {children}
            </ThemeSystemProvider>
          </UserProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
