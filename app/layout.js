import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Dino Cookies - Deliciosas Galletas Caseras",
  description: "Pide galletas caseras frescas online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <a className="skipLink" href="#main-content">
          Saltar al contenido principal
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
