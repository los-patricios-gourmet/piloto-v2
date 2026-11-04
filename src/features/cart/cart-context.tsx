"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Country, getProduct, markets } from "@/data/markets";

export type CartLine = {
  country: Country;
  slug: string;
  variantId: string;
  quantity: number;
};
type CartContextValue = {
  lines: CartLine[];
  add: (
    country: Country,
    slug: string,
    variantId: string,
    quantity?: number,
  ) => void;
  update: (
    country: Country,
    slug: string,
    variantId: string,
    quantity: number,
  ) => void;
  clear: (country: Country) => void;
  forCountry: (country: Country) => CartLine[];
};
const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "los-patricios-piloto-cart-v2";

function validLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return (
    (line.country === "pe" || line.country === "cl") &&
    !!getProduct(line.country, line.slug)?.variants.some(
      (v) => v.id === line.variantId,
    ) &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= 99
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem(storageKey) || "[]",
      );
      if (Array.isArray(parsed)) setLines(parsed.filter(validLine));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [lines, hydrated]);
  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      add(country, slug, variantId, quantity = 1) {
        if (
          !getProduct(country, slug)?.variants.some((v) => v.id === variantId)
        )
          return;
        setLines((current) => {
          const exists = current.some(
            (line) =>
              line.country === country &&
              line.slug === slug &&
              line.variantId === variantId,
          );
          return exists
            ? current.map((line) =>
                line.country === country &&
                line.slug === slug &&
                line.variantId === variantId
                  ? {
                      ...line,
                      quantity: Math.min(99, line.quantity + quantity),
                    }
                  : line,
              )
            : [
                ...current,
                { country, slug, variantId, quantity: Math.min(99, quantity) },
              ];
        });
      },
      update(country, slug, variantId, quantity) {
        setLines((current) =>
          quantity <= 0
            ? current.filter(
                (line) =>
                  !(
                    line.country === country &&
                    line.slug === slug &&
                    line.variantId === variantId
                  ),
              )
            : current.map((line) =>
                line.country === country &&
                line.slug === slug &&
                line.variantId === variantId
                  ? { ...line, quantity: Math.min(99, quantity) }
                  : line,
              ),
        );
      },
      clear(country) {
        setLines((current) =>
          current.filter((line) => line.country !== country),
        );
      },
      forCountry(country) {
        return lines.filter(
          (line) =>
            line.country === country &&
            !!markets[country].products.find((p) => p.slug === line.slug),
        );
      },
    }),
    [lines],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("CartProvider missing");
  return value;
}
