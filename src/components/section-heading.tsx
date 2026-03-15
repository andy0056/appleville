type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {body ? <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">{body}</p> : null}
    </div>
  );
}
