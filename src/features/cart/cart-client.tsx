"use client";
import { ArrowUpRight } from "@/components/arrow-up-right";
import Link from "next/link";
import { Country, formatPrice, getProduct, markets } from "@/data/markets";
import { useCart } from "./cart-context";

export function CartClient({ country }: { country: Country }) {
  const { forCountry, update } = useCart();
  const lines = forCountry(country);
  const rows = lines.map((line) => ({
    line,
    product: getProduct(country, line.slug)!,
    variant: getProduct(country, line.slug)!.variants.find(
      (v) => v.id === line.variantId,
    )!,
  }));
  const subtotal = rows.reduce(
    (sum, { line, variant }) => sum + line.quantity * variant.price,
    0,
  );
  return (
    <main className="cart-page section-pad">
      <div className="page-heading">
        <p className="eyebrow gold">
          TU SELECCIÓN / {markets[country].name.toUpperCase()}
        </p>
        <h1>
          EL CARRITO<span>.</span>
        </h1>
        <p>Revisa los ingredientes y sus presentaciones antes de continuar.</p>
      </div>
      {rows.length ? (
        <div className="cart-layout">
          <div className="cart-list">
            <div className="cart-list-label">
              <span>PRODUCTO</span>
              <span>TOTAL</span>
            </div>
            {rows.map(({ line, product, variant }) => (
              <div className="cart-item" key={`${line.slug}:${line.variantId}`}>
                <Link
                  href={`/${country}/producto/${product.slug}`}
                  className="cart-item-image"
                >
                  <img
                    src={product.image}
                    alt={`Imagen provisional de ${product.name}`}
                  />
                </Link>
                <div className="cart-item-info">
                  <span className="eyebrow gold">
                    {product.category.toUpperCase()}
                  </span>
                  <Link href={`/${country}/producto/${product.slug}`}>
                    {product.name}
                  </Link>
                  <p>
                    Presentación {variant.weight} ·{" "}
                    {formatPrice(country, variant.price)} cada una
                  </p>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() =>
                          update(
                            country,
                            line.slug,
                            line.variantId,
                            line.quantity - 1,
                          )
                        }
                        aria-label={`Disminuir ${product.name} ${variant.weight}`}
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          update(
                            country,
                            line.slug,
                            line.variantId,
                            line.quantity + 1,
                          )
                        }
                        aria-label={`Aumentar ${product.name} ${variant.weight}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-link"
                      type="button"
                      onClick={() =>
                        update(country, line.slug, line.variantId, 0)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <strong>
                  {formatPrice(country, variant.price * line.quantity)}
                </strong>
              </div>
            ))}
          </div>
          <aside className="order-summary">
            <p className="eyebrow gold">RESUMEN PILOTO</p>
            <h2>TU PEDIDO</h2>
            <div>
              <span>
                Productos ({lines.reduce((n, l) => n + l.quantity, 0)})
              </span>
              <strong>{formatPrice(country, subtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>Por definir</strong>
            </div>
            <div className="order-total">
              <span>Subtotal</span>
              <strong>{formatPrice(country, subtotal)}</strong>
            </div>
            <p>
              Solo entregas a domicilio. Cobertura, tarifas y total final se
              definirán antes del lanzamiento.
            </p>
            <Link href={`/${country}/checkout`} className="filled-action">
              CONTINUAR A CHECKOUT{" "}
              <span>
                <ArrowUpRight />
              </span>
            </Link>
            <small>SIMULACIÓN · SIN PAGOS REALES</small>
          </aside>
        </div>
      ) : (
        <div className="empty-cart">
          <span>◇</span>
          <h2>TU CARRITO ESTÁ ESPERANDO.</h2>
          <p>Elige una presentación de la colección para comenzar.</p>
          <Link href={`/${country}/catalogo`} className="filled-action">
            EXPLORAR LA COLECCIÓN <ArrowUpRight />
          </Link>
        </div>
      )}
    </main>
  );
}
