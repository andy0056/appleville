import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { resourceSectionAnchors } from "@/lib/content-anchors";
import { buildPageMetadata } from "@/lib/metadata";
import {
  foodFacts,
  marketNodes,
  organicSpots,
  proteinRealities,
  waterZones,
  waterVerdict,
  dairyCategories,
  bakeryHighlights,
  deliveryReality,
  groceryDelivery,
  seasonalImpact,
  importedGroceryStores,
  foodSources,
} from "@/lib/food";

export const metadata: Metadata = buildPageMetadata({
  title: "Food reality in Himachal Pradesh — markets, water, delivery & seasonal costs",
  description:
    "Where to buy groceries, whether tap water is safe, which proteins are available, Swiggy/Zomato coverage, artisanal cheese & sourdough, and how food costs swing by season.",
  pathname: "/food",
  type: "article",
});

const priceColors: Record<string, string> = {
  spike: "bg-red-100 text-red-800",
  surge: "bg-amber-100 text-amber-800",
  equilibrium: "bg-emerald-100 text-emerald-800",
};

const priceLabels: Record<string, string> = {
  spike: "Price spike",
  surge: "Price surge",
  equilibrium: "Equilibrium",
};

const waterColors: Record<string, string> = {
  excellent: "bg-emerald-100 text-emerald-800",
  caution: "bg-amber-100 text-amber-800",
  "ro-essential": "bg-red-100 text-red-800",
};

const waterLabels: Record<string, string> = {
  excellent: "Excellent",
  caution: "Caution",
  "ro-essential": "RO essential",
};

export default function FoodPage() {
  return (
    <main className="container-app py-8 md:py-16">
      <div className="mx-auto max-w-5xl space-y-8 md:space-y-14">
        {/* Hero */}
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Food reality" },
            ]}
          />
          <p className="eyebrow">Culinary &amp; logistics guide</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Food reality in Himachal
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            Where to buy groceries, what shows up on Swiggy, whether the tap water will wreck you,
            and why your food bill doubles in December.
          </p>
        </div>

        {/* Key facts */}
        <section
          id={resourceSectionAnchors.food.quickRealityCheck}
          className="card scroll-mt-28 border-[rgba(143,93,59,0.2)] bg-[rgba(234,215,191,0.28)] p-5 md:p-6"
        >
          <p className="eyebrow">Quick reality check</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {foodFacts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                <p className="text-lg">{fact.icon}</p>
                <p className="mt-1 text-sm font-semibold">{fact.label}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{fact.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vegetable markets */}
        <section id={resourceSectionAnchors.food.vegetableMarkets} className="scroll-mt-28">
          <p className="eyebrow">Where to buy groceries</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Vegetable mandis &amp; produce hubs
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Fresh produce flows from lower-altitude wholesale hubs (Solan, Palampur) upward with escalating transport premiums.
          </p>
          <div className="mt-5 space-y-3">
            {marketNodes.map((node) => (
              <div key={node.town} className="card p-4 md:p-5">
                <h3 className="text-base font-semibold">{node.town}</h3>
                <p className="mt-1 text-xs font-semibold text-[var(--forest)]">{node.markets}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{node.influence}</p>
                <p className="mt-2 rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] font-semibold text-[var(--forest)]">
                  💰 {node.pricing}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal impact */}
        <section id={resourceSectionAnchors.food.seasonalSwings} className="scroll-mt-28">
          <p className="eyebrow">Seasonal swings</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            How food costs change by season
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {seasonalImpact.map((s) => (
              <div key={s.season} className="card p-5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${priceColors[s.priceVector]}`}>
                    {priceLabels[s.priceVector]}
                  </span>
                  <h3 className="text-sm font-semibold">{s.season}</h3>
                </div>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{s.months}</p>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{s.detail}</p>
                <p className="mt-2 text-xs font-semibold text-[var(--forest)]">Quality: {s.qualityVector}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Drinking water */}
        <section
          id={resourceSectionAnchors.food.drinkingWater}
          className="card scroll-mt-28 border-amber-200/60 bg-amber-50/30 p-5 md:p-8"
        >
          <p className="eyebrow text-amber-800">💧 Drinking water</p>
          <h2 className="mt-2 text-xl font-semibold text-amber-900 md:text-2xl">
            Is the tap water safe?
          </h2>
          <p className="mt-3 text-sm leading-7 text-amber-700">{waterVerdict}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {waterZones.map((z) => (
              <div key={z.town} className="rounded-xl border border-amber-200/60 bg-white/50 p-4">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${waterColors[z.safety]}`}>
                    {waterLabels[z.safety]}
                  </span>
                  <p className="text-sm font-semibold text-amber-900">{z.town}</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-amber-700">{z.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Animal protein */}
        <section id={resourceSectionAnchors.food.animalProtein} className="scroll-mt-28">
          <p className="eyebrow">Meat &amp; fish</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Animal protein supply chain
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {proteinRealities.map((p) => (
              <div key={p.type} className="card p-5">
                <p className="text-2xl">{p.icon}</p>
                <h3 className="mt-2 text-base font-semibold">{p.type}</h3>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{p.detail}</p>
                <p className="mt-2 text-[11px] font-semibold text-[var(--forest)]">{p.towns}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dairy & cheese */}
        <section id={resourceSectionAnchors.food.dairy} className="scroll-mt-28">
          <p className="eyebrow">Dairy ecosystem</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Milk, cheese &amp; dairy
          </h2>
          <div className="mt-5 space-y-3">
            {dairyCategories.map((d) => (
              <div key={d.category} className="card p-4 md:p-5">
                <h3 className="text-sm font-semibold">{d.category}</h3>
                <p className="mt-1 text-xs font-semibold text-[var(--accent)]">{d.providers}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{d.detail}</p>
                <p className="mt-1 text-[11px] text-[var(--forest)]">📍 {d.towns}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Organic & farm-to-table */}
        <section id={resourceSectionAnchors.food.organic} className="scroll-mt-28">
          <p className="eyebrow">Farm-to-table &amp; organic</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Artisanal food &amp; organic spots
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {organicSpots.map((spot) => (
              <div key={spot.name} className="card p-4">
                <p className="text-sm font-semibold">{spot.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{spot.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{spot.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bakeries */}
        <section id={resourceSectionAnchors.food.bakeries} className="scroll-mt-28">
          <p className="eyebrow">Sourdough &amp; bakeries</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            The bakery renaissance
          </h2>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Cool, stable Himalayan climate = perfect sourdough conditions. European-style artisanal baking is booming.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bakeryHighlights.map((bk) => (
              <div key={bk.name} className="card p-4">
                <p className="text-sm font-semibold">{bk.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{bk.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{bk.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Imported groceries */}
        <section
          id={resourceSectionAnchors.food.specialtyGroceries}
          className="card scroll-mt-28 p-5 md:p-6"
        >
          <p className="eyebrow">Imported &amp; specialty groceries</p>
          <h2 className="mt-2 text-lg font-semibold">Where to find international ingredients</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {importedGroceryStores.map((store) => (
              <div key={store.name} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.5)] p-4">
                <p className="text-sm font-semibold">{store.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{store.town}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{store.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Food delivery */}
        <section id={resourceSectionAnchors.food.delivery} className="scroll-mt-28">
          <p className="eyebrow">Food delivery</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Swiggy, Zomato &amp; grocery apps
          </h2>
          <div className="mt-5 space-y-3">
            {deliveryReality.map((d) => (
              <div key={d.town} className="card p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${d.available ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    {d.available ? "Available" : "Not available"}
                  </span>
                  <h3 className="text-sm font-semibold">{d.town}</h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{d.detail}</p>
                {d.caveat && (
                  <p className="mt-1 text-[11px] font-semibold text-amber-700">⚠️ {d.caveat}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 card border-amber-200/60 bg-amber-50/30 p-4">
            <p className="text-xs font-semibold text-amber-800">🛒 {groceryDelivery.headline}</p>
            <p className="mt-1 text-xs leading-5 text-amber-700">{groceryDelivery.detail}</p>
          </div>
        </section>

        {/* Sources */}
        <section className="card p-5 md:p-6">
          <p className="eyebrow">Key sources</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {foodSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4 transition-colors hover:border-[var(--accent)]/40"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">{source.label} ↗</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{source.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="card p-6 md:p-8">
          <p className="eyebrow">Plan your move</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Food sorted? Check power reliability, banking, and community support before committing to a town.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link href="/first-30-days" className="rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-white">
              First 30 days playbook
            </Link>
            <Link href="/power-backup" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold">
              Power backup
            </Link>
            <Link href="/compare" className="rounded-full border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-center text-sm font-semibold">
              Compare towns
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
