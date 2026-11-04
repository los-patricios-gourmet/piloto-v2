"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Country, formatPrice, markets } from "@/data/markets";

type Tab = "resumen" | "productos" | "inventario" | "pedidos" | "delivery";
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "resumen", label: "Resumen", icon: "◫" },
  { id: "productos", label: "Productos", icon: "◇" },
  { id: "inventario", label: "Inventario", icon: "▤" },
  { id: "pedidos", label: "Pedidos", icon: "▣" },
  { id: "delivery", label: "Delivery", icon: "↗" },
];
const sampleOrders = [
  {
    id: "DEMO-1038",
    name: "Cliente de ejemplo",
    country: "Chile",
    total: "$138.000",
    status: "En preparación",
  },
  {
    id: "DEMO-1037",
    name: "Cliente de ejemplo",
    country: "Perú",
    total: "S/ 415",
    status: "Pendiente",
  },
  {
    id: "DEMO-1036",
    name: "Cliente de ejemplo",
    country: "Chile",
    total: "$69.000",
    status: "Entregado",
  },
];

export function AdminClient() {
  const [tab, setTab] = useState<Tab>("resumen");
  const [country, setCountry] = useState<Country>("cl");
  const [stock, setStock] = useState<Record<string, number>>({});
  const [orderStatus, setOrderStatus] = useState<Record<string, string>>({});
  const products = markets[country].products;
  const variants = useMemo(
    () =>
      products.flatMap((p) =>
        p.variants.map((v) => ({
          product: p,
          variant: v,
          key: `${country}-${p.slug}-${v.id}`,
        })),
      ),
    [products, country],
  );
  const low = variants.filter(
    ({ key, variant }) => (stock[key] ?? variant.stock) <= 4,
  ).length;
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">✦</span>
          <div>
            LOS PATRICIOS<small>GESTIÓN · PILOTO</small>
          </div>
        </div>
        <nav aria-label="Administración de prueba">
          {tabs.map((item) => (
            <button
              type="button"
              key={item.id}
              className={tab === item.id ? "active" : ""}
              onClick={() => setTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <p>VISTA DEMOSTRATIVA</p>
          <span>Los cambios no se guardan ni afectan la tienda.</span>
          <Link href="/">← Volver a la tienda</Link>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topline">
          <span>PILOTO ADMINISTRATIVO · DATOS FICTICIOS</span>
          <Link href="/">VER STOREFRONT ↗</Link>
        </div>
        <div className="admin-heading">
          <div>
            <p className="eyebrow gold">PANEL DE GESTIÓN / DEMO</p>
            <h1>
              {tabs.find((t) => t.id === tab)?.label.toUpperCase()}
              <span>.</span>
            </h1>
            <p>
              Una vista de cómo se administraría la tienda en la versión
              definitiva.
            </p>
          </div>
          <div className="admin-country">
            <label htmlFor="admin-country">MERCADO</label>
            <select
              id="admin-country"
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
            >
              <option value="cl">Chile</option>
              <option value="pe">Perú</option>
            </select>
          </div>
        </div>
        {tab === "resumen" && (
          <>
            <div className="admin-metrics">
              <div>
                <span>PRODUCTOS EN {markets[country].name.toUpperCase()}</span>
                <strong>{products.length.toString().padStart(2, "0")}</strong>
                <small>Catálogo de demostración</small>
              </div>
              <div>
                <span>PRESENTACIONES</span>
                <strong>{variants.length.toString().padStart(2, "0")}</strong>
                <small>Con stock independiente</small>
              </div>
              <div>
                <span>STOCK BAJO</span>
                <strong>{low.toString().padStart(2, "0")}</strong>
                <small>Hasta 4 unidades · datos demo</small>
              </div>
            </div>
            <div className="admin-panels">
              <section>
                <div className="admin-panel-head">
                  <h2>PRODUCTOS DESTACADOS</h2>
                  <button type="button" onClick={() => setTab("productos")}>
                    VER TODOS ↗
                  </button>
                </div>
                {products.slice(0, 3).map((p) => (
                  <div className="admin-product-row" key={p.slug}>
                    <img src={p.image} alt="" />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.variants.length} presentaciones</span>
                    </div>
                    <b>{formatPrice(country, p.variants[0].price)}</b>
                  </div>
                ))}
              </section>
              <section>
                <div className="admin-panel-head">
                  <h2>ACTIVIDAD DE MUESTRA</h2>
                  <button type="button" onClick={() => setTab("pedidos")}>
                    VER PEDIDOS ↗
                  </button>
                </div>
                {sampleOrders.map((o) => (
                  <div className="admin-activity" key={o.id}>
                    <span className="activity-dot" />
                    <div>
                      <strong>{o.id}</strong>
                      <small>
                        {o.name} · {o.country}
                      </small>
                    </div>
                    <em>{orderStatus[o.id] || o.status}</em>
                  </div>
                ))}
              </section>
            </div>
          </>
        )}
        {tab === "productos" && (
          <section className="admin-table-panel">
            <div className="admin-panel-head">
              <h2>CATÁLOGO DE {markets[country].name.toUpperCase()}</h2>
              <span>
                Los productos reales se cargarán después de validar el piloto.
              </span>
            </div>
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>CATEGORÍA</th>
                    <th>PRESENTACIONES</th>
                    <th>DESDE</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.slug}>
                      <td>
                        <div className="table-product">
                          <img src={p.image} alt="" />
                          <strong>{p.name}</strong>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>{p.variants.map((v) => v.weight).join(" · ")}</td>
                      <td>{formatPrice(country, p.variants[0].price)}</td>
                      <td>
                        <span className="status-pill">MUESTRA</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {tab === "inventario" && (
          <section className="admin-table-panel">
            <div className="admin-panel-head">
              <h2>STOCK POR PRESENTACIÓN</h2>
              <span>Ajustes en pantalla; no se guardan.</span>
            </div>
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>PESO FIJO</th>
                    <th>PRECIO PILOTO</th>
                    <th>STOCK DEMO</th>
                    <th>AJUSTAR</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map(({ product: p, variant: v, key }) => (
                    <tr key={key}>
                      <td>{p.name}</td>
                      <td>{v.weight}</td>
                      <td>{formatPrice(country, v.price)}</td>
                      <td>
                        <span
                          className={
                            (stock[key] ?? v.stock) <= 4
                              ? "stock-low"
                              : "stock-ok"
                          }
                        >
                          {stock[key] ?? v.stock} unidades
                        </span>
                      </td>
                      <td>
                        <div className="admin-adjust">
                          <button
                            type="button"
                            onClick={() =>
                              setStock({
                                ...stock,
                                [key]: Math.max(0, (stock[key] ?? v.stock) - 1),
                              })
                            }
                            aria-label={`Restar stock de ${p.name} ${v.weight}`}
                          >
                            −
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setStock({
                                ...stock,
                                [key]: (stock[key] ?? v.stock) + 1,
                              })
                            }
                            aria-label={`Agregar stock de ${p.name} ${v.weight}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {tab === "pedidos" && (
          <section className="admin-table-panel">
            <div className="admin-panel-head">
              <h2>PEDIDOS FICTICIOS</h2>
              <span>Estados editables solo durante esta visita.</span>
            </div>
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>REFERENCIA</th>
                    <th>CLIENTE</th>
                    <th>PAÍS</th>
                    <th>TOTAL DEMO</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <strong>{o.id}</strong>
                      </td>
                      <td>{o.name}</td>
                      <td>{o.country}</td>
                      <td>{o.total}</td>
                      <td>
                        <select
                          className="order-status"
                          value={orderStatus[o.id] || o.status}
                          onChange={(e) =>
                            setOrderStatus({
                              ...orderStatus,
                              [o.id]: e.target.value,
                            })
                          }
                          aria-label={`Estado del pedido ficticio ${o.id}`}
                        >
                          <option>Pendiente</option>
                          <option>En preparación</option>
                          <option>En reparto</option>
                          <option>Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {tab === "delivery" && (
          <div className="admin-delivery">
            <section>
              <p className="eyebrow gold">MODALIDAD CONFIRMADA</p>
              <h2>SOLO ENTREGA A DOMICILIO.</h2>
              <p>
                La futura administración podrá configurar zonas de cobertura,
                tarifas y disponibilidad por mercado. No habrá recojo en tienda
                en el alcance actual.
              </p>
            </section>
            <section>
              <p className="eyebrow gold">PENDIENTE DE DEFINICIÓN</p>
              <ul>
                <li>Ciudades, distritos y comunas con cobertura.</li>
                <li>Tarifas y compra mínima, si aplica.</li>
                <li>Plazos, horarios y conservación durante el despacho.</li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
