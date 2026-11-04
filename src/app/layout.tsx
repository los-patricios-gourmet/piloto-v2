import type { Metadata } from "next";
import { CartProvider } from "@/features/cart/cart-context";
import "./globals.css";
import "./v2.css";

export const metadata: Metadata = {
  title: "Los Patricios Gourmet · Piloto v2",
  description:
    "Experiencia piloto de Los Patricios Gourmet para Perú y Chile. Fotografías y precios de muestra; sin compras reales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
