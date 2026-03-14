const guides = [
  {
    title: "Vacation town vs real-life base in Himachal",
    summary: "Why the place you love for a week may not be the place you want for six months.",
  },
  {
    title: "Bir vs Dharamshala vs Palampur",
    summary: "A practical comparison of three very different rhythms of mountain life.",
  },
  {
    title: "What people underestimate about moving to Himachal",
    summary: "A grounded look at access, work friction, seasonality, and expectations.",
  },
];

export default function GuidesPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Guides</p>
          <h1 className="text-4xl font-semibold">Practical guidance, not mountain fantasy</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            This section will become the editorial layer that helps people make
            more grounded decisions about life in Himachal.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.title} className="card p-6">
              <h2 className="text-2xl font-semibold">{guide.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{guide.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
