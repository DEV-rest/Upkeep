type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  split?: boolean;
};

export function SectionHeading({ eyebrow, title, description, split = false }: SectionHeadingProps) {
  return (
    <div className={split ? "section-heading split" : "section-heading"}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}
