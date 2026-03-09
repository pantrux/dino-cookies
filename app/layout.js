import { Outfit, Bodoni_Moda, Source_Serif_4, Fraunces, Oswald } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";

const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--font-serif" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-accent" });
const oswald = Oswald({ subsets: ["latin"], display: "swap", variable: "--font-poster" });

export const metadata = {
  title: "Dino Cookies - Deliciosas Galletas Caseras",
  description: "Pide galletas caseras frescas online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={[outfit.variable, bodoni.variable, sourceSerif.variable, fraunces.variable, oswald.variable].join(' ')}>
        <a className="skipLink" href="#main-content">
          Saltar al contenido principal
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
