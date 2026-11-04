"use client";
import { ArrowUpRight } from "@/components/arrow-up-right";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Country, formatPrice, getProduct, markets } from "@/data/markets";
import { useCart } from "@/features/cart/cart-context";

type Stage = 0 | 1 | 2 | 3;
export function CheckoutClient({ country }: { country: Country }) {
  const [stage, setStage] = useState<Stage>(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    note: "",
  });
  const { forCountry, clear } = useCart();
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
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stage === 2) {
      clear(country);
      setStage(3);
    } else setStage((stage + 1) as Stage);
  }
  if (stage === 3)
    return (
      <main className="checkout-page section-pad">
        <div className="checkout-success">
          <span>✦</span>
          <p className="eyebrow gold">SIMULACIÓN COMPLETADA</p>
          <h1>
            GRACIAS POR
            <br />
            <em>EXPLORAR.</em>
          </h1>
          <p>
            Has recorrido la futura experiencia de compra. No se ha creado
            ningún pedido ni se ha procesado un pago. Los datos ingresados no se
            enviaron ni guardaron.
          </p>
          <Link className="filled-action" href={`/${country}`}>
            VOLVER A LA TIENDA <ArrowUpRight />
          </Link>
        </div>
      </main>
    );
  return (
    <main className="checkout-page section-pad">
      <div className="page-heading">
        <p className="eyebrow gold">
          CHECKOUT VISUAL / {markets[country].name.toUpperCase()}
        </p>
        <h1>
          UN ÚLTIMO <em>PASO.</em>
        </h1>
        <p>
          Recorre una compra de demostración. No se enviarán datos, pedidos ni
          pagos.
        </p>
      </div>
      {!rows.length ? (
        <div className="empty-cart">
          <h2>TU CARRITO ESTÁ VACÍO.</h2>
          <Link href={`/${country}/catalogo`} className="filled-action">
            EXPLORAR LA COLECCIÓN <ArrowUpRight />
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-form-panel">
            <div className="checkout-steps">
              <span className={stage === 0 ? "active" : ""}>
                01 <b>DATOS</b>
              </span>
              <span className={stage === 1 ? "active" : ""}>
                02 <b>ENTREGA</b>
              </span>
              <span className={stage === 2 ? "active" : ""}>
                03 <b>RESUMEN</b>
              </span>
            </div>
            <form onSubmit={next}>
              {stage === 0 && (
                <div className="checkout-stage">
                  <p className="eyebrow">TUS DATOS</p>
                  <h2>¿A QUIÉN ENTREGAMOS?</h2>
                  <div className="form-grid">
                    <label>
                      Nombre completo
                      <input
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Tu nombre"
                      />
                    </label>
                    <label>
                      Correo electrónico
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="correo@ejemplo.com"
                      />
                    </label>
                    <label>
                      Teléfono
                      <input
                        required
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="Teléfono de ejemplo"
                      />
                    </label>
                  </div>
                  <p className="form-note">
                    Los datos se mantienen únicamente en esta pantalla mientras
                    haces la prueba; no se guardan ni transmiten.
                  </p>
                </div>
              )}
              {stage === 1 && (
                <div className="checkout-stage">
                  <p className="eyebrow">DELIVERY A DOMICILIO</p>
                  <h2>¿DÓNDE ENTREGAMOS?</h2>
                  <div className="form-grid">
                    <label>
                      Ciudad / distrito o comuna
                      <input
                        required
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                        placeholder="Ubicación de ejemplo"
                      />
                    </label>
                    <label>
                      Dirección de entrega
                      <input
                        required
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="Dirección de ejemplo"
                      />
                    </label>
                    <label>
                      Indicaciones adicionales
                      <input
                        value={form.note}
                        onChange={(e) =>
                          setForm({ ...form, note: e.target.value })
                        }
                        placeholder="Opcional"
                      />
                    </label>
                  </div>
                  <div className="checkout-info">
                    La cobertura y el costo de delivery están pendientes de
                    definición. El piloto no valida una dirección real ni
                    calcula una tarifa final.
                  </div>
                </div>
              )}
              {stage === 2 && (
                <div className="checkout-stage">
                  <p className="eyebrow">REVISA TU SELECCIÓN</p>
                  <h2>TODO LISTO PARA LA DEMO.</h2>
                  <div className="review-line">
                    <span>Cliente</span>
                    <strong>{form.name}</strong>
                  </div>
                  <div className="review-line">
                    <span>País</span>
                    <strong>{markets[country].name}</strong>
                  </div>
                  <div className="review-line">
                    <span>Entrega</span>
                    <strong>
                      {form.city} · {form.address}
                    </strong>
                  </div>
                  <div className="review-line">
                    <span>Subtotal de productos</span>
                    <strong>{formatPrice(country, subtotal)}</strong>
                  </div>
                  <div className="review-line">
                    <span>Delivery</span>
                    <strong>Por definir</strong>
                  </div>
                  <div className="checkout-info">
                    En la versión definitiva, Mercado Pago se integrará dentro
                    del flujo de compra según la modalidad viable para cada
                    país. Este botón solo termina la simulación.
                  </div>
                </div>
              )}
              <div className="checkout-form-actions">
                {stage > 0 && (
                  <button
                    type="button"
                    className="back-action"
                    onClick={() => setStage((stage - 1) as Stage)}
                  >
                    ← VOLVER
                  </button>
                )}
                <button type="submit" className="filled-action">
                  {stage === 2 ? "FINALIZAR SIMULACIÓN" : "CONTINUAR"}{" "}
                  <span>
                    <ArrowUpRight />
                  </span>
                </button>
              </div>
            </form>
          </section>
          <aside className="checkout-order">
            <p className="eyebrow gold">TU SELECCIÓN</p>
            <h2>RESUMEN</h2>
            {rows.map(({ line, product, variant }) => (
              <div
                className="checkout-order-row"
                key={`${line.slug}:${line.variantId}`}
              >
                <img src={product.image} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <small>
                    {variant.weight} · Cantidad {line.quantity}
                  </small>
                </div>
                <b>{formatPrice(country, variant.price * line.quantity)}</b>
              </div>
            ))}
            <div className="checkout-order-total">
              <span>Subtotal piloto</span>
              <strong>{formatPrice(country, subtotal)}</strong>
            </div>
            <p>
              Entrega a domicilio. Costo y total final sujetos a cobertura. No
              se realiza un cobro.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
