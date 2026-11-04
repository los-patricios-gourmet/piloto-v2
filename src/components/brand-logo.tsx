import Link from "next/link";

export function BrandLogo({
  href = "/",
  light = false,
}: {
  href?: string;
  light?: boolean;
}) {
  return (
    <Link
      className={`brand-logo ${light ? "brand-logo-light" : ""}`}
      href={href}
      aria-label="Los Patricios Gourmet, ir al inicio"
    >
      <img
        src={
          light
            ? "/brand/logo-horizontal-light-transparent.png"
            : "/brand/logo-horizontal-transparent.png"
        }
        alt="Los Patricios Gourmet"
        width={395}
        height={132}
      />
    </Link>
  );
}
