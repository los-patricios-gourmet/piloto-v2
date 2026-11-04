import { notFound } from "next/navigation";
import { CatalogClient } from "@/features/catalog/catalog-client";
import { isCountry } from "@/data/markets";
export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}
export default async function CatalogPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return <CatalogClient country={country} />;
}
