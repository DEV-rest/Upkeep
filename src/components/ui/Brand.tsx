import logo from "../../data/logo2-transparent.png";

type BrandProps = {
  className?: string;
  href?: string;
};

export function Brand({ className = "", href = "#top" }: BrandProps) {
  return (
    <a className={["brand", className].filter(Boolean).join(" ")} href={href} aria-label="Upkeep home">
      <img alt="Upkeep" className="brand-logo" src={logo} />
    </a>
  );
}
