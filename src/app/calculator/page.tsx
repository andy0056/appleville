import { TrueCostCalculator } from "@/components/calculator/true-cost-calculator";
import { buildPageMetadata, siteMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "True Cost of Himachal: Relocation Budget Calculator",
  description:
    "Estimate your monthly cost of living in Dharamshala, Manali, Shimla, and Palampur based on rent, winter heating, and lifestyle choices.",
  pathname: "/calculator",
  image: "/images/towns/palampur.jpg",
});

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "True Cost of Himachal Calculator",
    description:
      "An interactive budget calculator specifically designed to estimate the cost of living and relocating to towns in Himachal Pradesh.",
    url: `${siteMetadata.url}/calculator`,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <main className="container-app py-8 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12 max-w-3xl space-y-6">
        <p className="eyebrow">Cost of Living</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          The True Cost of Himachal
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          The biggest mistake remote workers make is assuming mountain life is inherently cheaper
          than city life. By the time you account for winter heating premiums, reliable internet,
          and imported groceries, the math changes drastically. Use this calculator to build a
          realistic 2026 budget before you sign a lease.
        </p>
      </div>

      <TrueCostCalculator />
    </main>
  );
}
