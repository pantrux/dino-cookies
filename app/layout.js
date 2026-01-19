import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Dino Cookies - Deliciosas Galletas Caseras",
  description: "Pide galletas caseras frescas online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
