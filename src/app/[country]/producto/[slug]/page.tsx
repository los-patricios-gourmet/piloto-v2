import { notFound } from "next/navigation";
import { getProduct, isCountry, markets } from "@/data/markets";
import { ProductClient } from "@/features/catalog/product-client";

export function generateStaticParams() {
  return (["pe", "cl"] as const).flatMap((country) =>
    markets[country].products.map((p) => ({ country, slug: p.slug })),
  );
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await params;
  if (!isCountry(country)) notFound();
  const product = getProduct(country, slug);
  if (!product) notFound();
  return <ProductClient country={country} product={product} />;
}
