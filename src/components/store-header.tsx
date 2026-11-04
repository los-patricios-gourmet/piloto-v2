"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/features/cart/cart-context";
import { Country, markets } from "@/data/markets";
import { BrandLogo } from "./brand-logo";

export function StoreHeader({ country }: { country: Country }) {
  const [open, setOpen] = useState(false);
  const { forCountry } = useCart();
  const count = forCountry(country).reduce((n, line) => n + line.quantity, 0);
  const base = `/${country}`;
  return (
    <>
      <div className="pilot-ribbon">
        PILOTO VISUAL <span>·</span> FOTOGRAFÍAS Y PRECIOS DE MUESTRA{" "}
        <span>·</span> SIN COBROS REALES
      </div>
      <header className="store-header">
        <BrandLogo href={base} />
        <nav
          className={`store-nav ${open ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <Link href={base} onClick={() => setOpen(false)}>
            Inicio
          </Link>
          <Link href={`${base}/catalogo`} onClick={() => setOpen(false)}>
            Colección
          </Link>
          <Link
            href={`${base}/catalogo#historia`}
            onClick={() => setOpen(false)}
          >
            La esencia
          </Link>
          <Link
            className="mobile-only"
            href="/admin-demo"
            onClick={() => setOpen(false)}
          >
            Vista administrativa
          </Link>
        </nav>
        <div className="store-actions">
          <Link
            className="market-switch"
            href={country === "cl" ? "/pe" : "/cl"}
            aria-label={`Cambiar a ${country === "cl" ? "Perú" : "Chile"}`}
          >
            <span className="market-caption">COMPRANDO EN</span>
            <strong>{markets[country].name}</strong>
            <span className="market-arrow">⌄</span>
          </Link>
          <Link
            className="bag-link"
            href={`${base}/carrito`}
            aria-label={`Carrito, ${count} productos`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 8h16l-1.4 12H5.4L4 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            <span>{count}</span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}

export function StoreFooter({ country }: { country: Country }) {
  return (
    <footer className="store-footer">
      <div className="footer-top">
        <div>
          <BrandLogo href={`/${country}`} light />
          <p>Tradición. Calidad. Exclusividad.</p>
        </div>
        <div>
          <small>EXPLORA</small>
          <Link href={`/${country}/catalogo`}>Colección</Link>
          <Link href={`/${country}/carrito`}>Tu carrito</Link>
          <Link href="/">Cambiar de país</Link>
        </div>
        <div>
          <small>EL PILOTO</small>
          <Link href="/admin-demo">Vista administrativa</Link>
          <p>Imágenes, precios y stock provisionales.</p>
          <p>Solo delivery · cobertura por definir.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Los Patricios Gourmet · Piloto UI/UX</span>
        <span>Sin pedidos ni pagos reales</span>
      </div>
    </footer>
  );
}
