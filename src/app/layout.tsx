import "../styles/global.css";

import { Roboto } from "@next/font/google";
import Dashboard from "@/components/Dashboard";

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
      <head />
      <body>
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
