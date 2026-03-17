type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-[13ch] text-3xl leading-[1.04] font-semibold tracking-tight text-balance md:max-w-[14ch] md:text-[3.25rem]">
        {title}
      </h1>
      {body ? (
        <p className="max-w-3xl text-base leading-7 text-pretty text-[var(--muted)] md:text-lg md:leading-8">
          {body}
        </p>
      ) : null}
    </div>
  );
}
