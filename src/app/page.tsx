import { ArrowUpRight } from "@/components/arrow-up-right";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function CountryEntry() {
  return (
    <main className="v2-entry">
      <header className="v2-entry-header">
        <BrandLogo light />
        <span>Piloto visual · Imágenes y precios provisionales</span>
      </header>
      <div className="v2-entry-main">
        <div className="v2-entry-copy">
          <h1>
            El arte de <em>disfrutar.</em>
          </h1>
          <p>
            Ingredientes con carácter. Una experiencia gourmet para elegir con
            calma y disfrutar con todos los sentidos.
          </p>
          <div className="v2-entry-country" aria-label="Elige tu país">
            <Link href="/pe" aria-label="Explorar colección de Perú">
              <strong>Perú</strong>
              <b aria-hidden="true">
                <ArrowUpRight />
              </b>
            </Link>
            <Link href="/cl" aria-label="Explorar colección de Chile">
              <strong>Chile</strong>
              <b aria-hidden="true">
                <ArrowUpRight />
              </b>
            </Link>
          </div>
        </div>
        <div className="v2-entry-art" aria-hidden="true">
          <div className="v2-entry-arch" />
          <img
            className="v2-entry-truffle"
            src="/images/trufas-hero-v2.webp"
            alt=""
          />
          <img
            className="v2-entry-caviar"
            src="/images/caviar-hero-v2.webp"
            alt=""
          />
          <img
            className="v2-entry-wagyu"
            src="/images/wagyu-hero-v2.webp"
            alt=""
          />
        </div>
      </div>
      <footer className="v2-entry-bottom">
        <span>Tradición / Calidad / Exclusividad</span>
        <Link href="/admin-demo">
          Vista administrativa <ArrowUpRight />
        </Link>
        <span>Sin compras reales</span>
      </footer>
    </main>
  );
}
