import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
};

export function Button({ children, className = "", href, variant = "primary", ...props }: ButtonProps) {
  const variantClassName = variant === "primary" ? "button-primary" : "button-secondary";

  return (
    <a className={`button ${variantClassName} ${className}`.trim()} href={href} {...props}>
      {children}
    </a>
  );
}
