import { notFound } from "next/navigation";
import { CheckoutClient } from "@/features/checkout/checkout-client";
import { isCountry } from "@/data/markets";
export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}
export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return <CheckoutClient country={country} />;
}
