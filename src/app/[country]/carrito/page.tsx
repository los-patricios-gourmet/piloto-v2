import { notFound } from "next/navigation";
import { CartClient } from "@/features/cart/cart-client";
import { isCountry } from "@/data/markets";
export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}
export default async function CartPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return <CartClient country={country} />;
}
