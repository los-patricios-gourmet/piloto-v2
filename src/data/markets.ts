export type Country = "pe" | "cl";
export type Category = "caviar" | "trufas" | "wagyu" | "foie-gras";

export type Variant = {
  id: string;
  weight: string;
  price: number;
  stock: number;
};
export type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  eyebrow: string;
  short: string;
  description: string;
  variants: Variant[];
};

export const markets: Record<
  Country,
  {
    name: string;
    currency: "PEN" | "CLP";
    locale: string;
    subtitle: string;
    products: Product[];
  }
> = {
  pe: {
    name: "Perú",
    currency: "PEN",
    locale: "es-PE",
    subtitle: "Caviar y trufas para una mesa excepcional.",
    products: [
      {
        slug: "caviar-seleccion",
        name: "Caviar · selección piloto",
        category: "caviar",
        image: "/images/caviar-piloto.png",
        eyebrow: "EL RITUAL DEL DETALLE",
        short: "Una experiencia de textura y delicadeza.",
        description:
          "Una selección visual de caviar para demostrar cómo se presentarán las distintas opciones de peso. La procedencia, las características y las fotografías del producto real están pendientes de confirmación.",
        variants: [
          { id: "30g", weight: "30 g", price: 290, stock: 8 },
          { id: "50g", weight: "50 g", price: 450, stock: 5 },
          { id: "100g", weight: "100 g", price: 840, stock: 3 },
        ],
      },
      {
        slug: "trufa-seleccion",
        name: "Trufa · selección piloto",
        category: "trufas",
        image: "/images/trufas-piloto.png",
        eyebrow: "LA ESENCIA DE LA TIERRA",
        short: "Aroma, carácter y presencia en cada plato.",
        description:
          "Presentación de muestra para explorar las variantes de peso fijo. La variedad, origen, temporada y disponibilidad definitivos se validarán con la clienta.",
        variants: [
          { id: "25g", weight: "25 g", price: 145, stock: 12 },
          { id: "50g", weight: "50 g", price: 270, stock: 7 },
          { id: "100g", weight: "100 g", price: 510, stock: 2 },
        ],
      },
    ],
  },
  cl: {
    name: "Chile",
    currency: "CLP",
    locale: "es-CL",
    subtitle: "Cuatro ingredientes para ocasiones inolvidables.",
    products: [
      {
        slug: "caviar-seleccion",
        name: "Caviar · selección piloto",
        category: "caviar",
        image: "/images/caviar-piloto.png",
        eyebrow: "EL RITUAL DEL DETALLE",
        short: "Una experiencia de textura y delicadeza.",
        description:
          "Una selección visual de caviar para demostrar cómo se presentarán las distintas opciones de peso. La procedencia, las características y las fotografías del producto real están pendientes de confirmación.",
        variants: [
          { id: "30g", weight: "30 g", price: 69000, stock: 9 },
          { id: "50g", weight: "50 g", price: 109000, stock: 6 },
          { id: "100g", weight: "100 g", price: 205000, stock: 3 },
        ],
      },
      {
        slug: "trufa-seleccion",
        name: "Trufa · selección piloto",
        category: "trufas",
        image: "/images/trufas-piloto.png",
        eyebrow: "LA ESENCIA DE LA TIERRA",
        short: "Aroma, carácter y presencia en cada plato.",
        description:
          "Presentación de muestra para explorar las variantes de peso fijo. La variedad, origen, temporada y disponibilidad definitivos se validarán con la clienta.",
        variants: [
          { id: "25g", weight: "25 g", price: 32000, stock: 11 },
          { id: "50g", weight: "50 g", price: 59000, stock: 7 },
          { id: "100g", weight: "100 g", price: 112000, stock: 2 },
        ],
      },
      {
        slug: "wagyu-seleccion",
        name: "Wagyu · selección piloto",
        category: "wagyu",
        image: "/images/wagyu-piloto.png",
        eyebrow: "EL ARTE DEL MARMOLADO",
        short: "Una pieza que transforma la ocasión.",
        description:
          "Imagen y presentación de muestra para visualizar la experiencia de compra. Corte, origen, grado y conservación se confirmarán antes de vender el producto real.",
        variants: [
          { id: "250g", weight: "250 g", price: 49500, stock: 8 },
          { id: "500g", weight: "500 g", price: 95000, stock: 5 },
        ],
      },
      {
        slug: "foie-gras-seleccion",
        name: "Foie gras · selección piloto",
        category: "foie-gras",
        image: "/images/foie-gras-piloto.png",
        eyebrow: "UNA EXPRESIÓN REFINADA",
        short: "Un ingrediente para disfrutar sin prisa.",
        description:
          "Producto y fotografía provisionales para demostrar la ficha y el carrito. Formato, origen, conservación y ficha comercial definitivos están pendientes de validación.",
        variants: [
          { id: "100g", weight: "100 g", price: 38500, stock: 10 },
          { id: "200g", weight: "200 g", price: 73000, stock: 4 },
        ],
      },
    ],
  },
};

export const categoryNames: Record<Category, string> = {
  caviar: "Caviar",
  trufas: "Trufas",
  wagyu: "Wagyu",
  "foie-gras": "Foie gras",
};
export function isCountry(value: string): value is Country {
  return value === "pe" || value === "cl";
}
export function formatPrice(country: Country, amount: number) {
  const market = markets[country];
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
export function getProduct(country: Country, slug: string) {
  return markets[country].products.find((p) => p.slug === slug);
}
