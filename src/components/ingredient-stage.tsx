"use client";
import { ArrowUpRight } from "@/components/arrow-up-right";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Country, formatPrice, markets } from "@/data/markets";
import { productCutouts } from "@/data/visuals";

export function IngredientStage({ country }: { country: Country }) {
  const products = markets[country].products;
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const product = products[active];

  function select(index: number) {
    setActive(index);
    rail.current?.querySelectorAll("button")[index]?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <section className="v2-stage" aria-labelledby="stage-title">
      <div className="v2-stage-copy">
        <h1 id="stage-title">
          El arte de <em>elegir.</em>
        </h1>
        <p className="v2-stage-intro">
          Ingredientes extraordinarios para dar otra dimensión a la mesa.
          Descubre la colección piloto de {markets[country].name}.
        </p>
        <Link
          className="v2-arrow-link v2-arrow-link-gold"
          href={`/${country}/catalogo`}
        >
          Explorar la colección{" "}
          <span aria-hidden="true">
            <ArrowUpRight />
          </span>
        </Link>
      </div>
      <div className="v2-object-world">
        <div className="v2-object-disc" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.img
            key={product.category}
            className={`v2-hero-object v2-hero-${product.category}`}
            src={productCutouts[product.category]}
            alt={`Imagen provisional de ${product.name}`}
            initial={reduceMotion ? false : { opacity: 0, y: 25, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -15, rotate: 3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </AnimatePresence>
        <div className="v2-object-caption" aria-live="polite">
          <span>{product.name.replace(" · selección piloto", "")}</span>
          <strong>
            Desde {formatPrice(country, product.variants[0].price)}
          </strong>
        </div>
      </div>
      <div
        className="v2-stage-rail"
        ref={rail}
        role="group"
        aria-label="Explorar ingredientes"
      >
        {products.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            className={active === index ? "is-active" : ""}
            onClick={() => select(index)}
            aria-pressed={active === index}
            aria-label={`Ver ${item.name}`}
          >
            <img src={productCutouts[item.category]} alt="" />
            <span>{item.name.replace(" · selección piloto", "")}</span>
          </button>
        ))}
      </div>
      <Link
        className="v2-stage-detail"
        href={`/${country}/producto/${product.slug}`}
      >
        Conocer esta selección{" "}
        <span aria-hidden="true">
          <ArrowUpRight />
        </span>
      </Link>
    </section>
  );
}
