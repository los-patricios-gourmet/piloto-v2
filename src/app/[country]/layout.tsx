import { notFound } from "next/navigation";
import { StoreFooter, StoreHeader } from "@/components/store-header";
import { Country, isCountry } from "@/data/markets";

export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}
export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return (
    <>
      <StoreHeader country={country as Country} />
      {children}
      <StoreFooter country={country as Country} />
    </>
  );
}
