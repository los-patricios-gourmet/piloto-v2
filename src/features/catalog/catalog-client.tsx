"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Country, categoryNames, Category, markets } from "@/data/markets";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export function CatalogClient({ country }: { country: Country }) {
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [query, setQuery] = useState("");
  const products = markets[country].products;
  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "todos" || p.category === category) &&
          (!query ||
            `${p.name} ${p.short}`
              .toLocaleLowerCase("es")
              .includes(query.toLocaleLowerCase("es"))),
      ),
    [products, category, query],
  );
  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero-photo">
          <img
            src="/images/trufas-piloto.png"
            alt="Trufas, fotografía provisional"
          />
        </div>
        <div className="catalog-hero-shade" />
        <Reveal className="catalog-hero-copy">
          <h1>
            LA <em>COLECCIÓN.</em>
          </h1>
          <p>
            Colección piloto de {markets[country].name}:{" "}
            {country === "pe"
              ? "caviar y trufas"
              : "caviar, trufas, Wagyu y foie gras"}
            . Explora cada presentación y crea tu selección.
          </p>
          <a className="catalog-hero-action" href="#productos">
            Ver ingredientes <span aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </section>
      <section className="catalog-content section-pad" id="productos">
        <Reveal className="catalog-head">
          <div>
            <h2>
              ELIGE A TU <em>MANERA.</em>
            </h2>
          </div>
          <span>
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </span>
        </Reveal>
        <Reveal className="catalog-controls">
          <div
            className="catalog-filters"
            role="group"
            aria-label="Filtrar por categoría"
          >
            <button
              type="button"
              className={category === "todos" ? "active" : ""}
              onClick={() => setCategory("todos")}
              aria-pressed={category === "todos"}
            >
              Todo
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>
          <label className="catalog-search">
            <input
              type="search"
              placeholder="¿Qué te gustaría descubrir?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="10.75" cy="10.75" r="6.75" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </label>
        </Reveal>
        {filtered.length ? (
          <div className={`catalog-grid catalog-grid-${filtered.length}`}>
            {filtered.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                country={country}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            No hay productos para esa búsqueda.{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("todos");
              }}
            >
              Ver toda la colección
            </button>
          </div>
        )}
        <p className="disclaimer">
          Fotografías, nombres de selección, presentaciones, precios y stock son
          provisionales para el piloto.
        </p>
      </section>
      <section className="catalog-story" id="historia">
        <div className="story-image">
          <img
            src="/images/caviar-piloto.png"
            alt="Caviar, fotografía provisional"
          />
        </div>
        <Reveal className="story-copy">
          <h2>
            EL VALOR DE
            <br />
            <em>ELEGIR BIEN.</em>
          </h2>
          <p>
            Una experiencia digital a la altura del ritual gastronómico:
            descubrir, conocer cada presentación y elegir con confianza.
          </p>
          <Link className="outline-action" href={`/${country}`}>
            VOLVER AL INICIO ↗
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
