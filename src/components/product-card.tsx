import Link from "next/link";
import { Country, formatPrice, Product } from "@/data/markets";
import { Reveal } from "./reveal";

export function ProductCard({
  country,
  product,
  index = 0,
}: {
  country: Country;
  product: Product;
  index?: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.32)} className="product-card">
      <Link
        href={`/${country}/producto/${product.slug}`}
        className="product-card-link"
        aria-label={`Ver ${product.name}`}
      >
        <div className="product-card-image">
          <img
            src={product.image}
            alt={`Imagen provisional de ${product.name}`}
          />
          <span className="product-card-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <div className="product-card-meta">
          <span>Desde {formatPrice(country, product.variants[0].price)}</span>
        </div>
      </Link>
    </Reveal>
  );
}
