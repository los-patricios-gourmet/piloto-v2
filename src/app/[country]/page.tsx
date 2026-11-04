import { ArrowUpRight } from "@/components/arrow-up-right";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IngredientStage } from "@/components/ingredient-stage";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { isCountry, markets, categoryNames } from "@/data/markets";
import { productCutouts } from "@/data/visuals";

export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}

export default async function MarketHome({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  const market = markets[country];
  const lead = market.products[0];

  return (
    <main className="v2-home">
      <IngredientStage country={country} />
      <section className="v2-statement" aria-labelledby="statement-title">
        <p>Tradición, calidad y exclusividad toman forma en cada elección.</p>
        <Reveal>
          <h2 id="statement-title">
            Un ingrediente. <em>Otra historia.</em>
          </h2>
        </Reveal>
      </section>
      <section
        className="v2-collection section-pad"
        aria-labelledby="collection-title"
      >
        <div className="v2-section-head">
          <h2 id="collection-title">La colección</h2>
          <Link className="v2-arrow-link" href={`/${country}/catalogo`}>
            Ver todos los productos{" "}
            <span aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
        <div
          className={`v2-feature-grid v2-feature-grid-${market.products.length}`}
        >
          {market.products.map((product, index) => (
            <Reveal
              className="v2-feature-wrap"
              key={product.slug}
              delay={index * 0.07}
            >
              <Link
                className="v2-feature"
                href={`/${country}/producto/${product.slug}`}
              >
                <div
                  className={`v2-feature-image v2-feature-image-${product.category}`}
                >
                  <img
                    src={productCutouts[product.category]}
                    alt={`Imagen provisional de ${categoryNames[product.category]}`}
                  />
                </div>
                <div className="v2-feature-text">
                  <h3>{categoryNames[product.category]}</h3>
                  <span>{product.short}</span>
                  <b aria-hidden="true">
                    <ArrowUpRight />
                  </b>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="v2-editorial" aria-labelledby="editorial-title">
        <div className="v2-editorial-image">
          <img
            src={lead.image}
            alt={`Fotografía provisional de ${lead.name}`}
          />
        </div>
        <Reveal className="v2-editorial-copy">
          <h2 id="editorial-title">
            Descubrir. <em>Disfrutar.</em>
          </h2>
          <p>
            Explora cada ingrediente, elige una presentación y recorre la futura
            experiencia de compra. Cada imagen, precio y disponibilidad es
            provisional.
          </p>
          <Link
            className="v2-arrow-link v2-arrow-link-gold"
            href={`/${country}/producto/${lead.slug}`}
          >
            Descubrir {categoryNames[lead.category].toLowerCase()}{" "}
            <span aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        </Reveal>
      </section>
      <section
        className="v2-products section-pad"
        aria-labelledby="products-title"
      >
        <div className="v2-section-head">
          <h2 id="products-title">Elige tu próxima experiencia.</h2>
          <p>Una selección de muestra para {market.name}.</p>
        </div>
        <div
          className={`featured-grid v2-product-grid-${market.products.length}`}
        >
          {market.products.map((product, index) => (
            <ProductCard
              key={product.slug}
              country={country}
              product={product}
              index={index}
            />
          ))}
        </div>
      </section>
      <section className="v2-closing" aria-labelledby="closing-title">
        <img src={productCutouts.trufas} alt="" />
        <Reveal>
          <h2 id="closing-title">
            Cada detalle <em>cuenta.</em>
          </h2>
          <Link
            className="v2-arrow-link v2-arrow-link-gold"
            href={`/${country}/catalogo`}
          >
            Explorar la colección{" "}
            <span aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
