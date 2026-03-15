import { SectionHeading } from "@/components/section-heading";
import { TownCard } from "@/components/town-card";
import { towns } from "@/lib/towns";

export default function TownsPage() {
  return (
    <main className="container-app py-14 md:py-20">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Towns"
          title="Explore the first Himachal town set"
          body="These are the first towns in the recommendation engine — chosen to represent different rhythms, tradeoffs, and styles of mountain life."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {towns.map((town) => (
            <TownCard key={town.slug} town={town} />
          ))}
        </div>
      </div>
    </main>
  );
}
