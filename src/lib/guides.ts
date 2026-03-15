export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  body: string[];
};

export const guides: Guide[] = [
  {
    slug: "vacation-town-vs-real-life-base",
    title: "Vacation town vs real-life base in Himachal",
    summary:
      "Why the place you love for a week may not be the place you want for six months.",
    category: "Decision-making",
    body: [
      "A place can be exciting, photogenic, and emotionally magnetic without being easy to actually live in. That gap matters more than most people expect.",
      "When people choose from travel content alone, they tend to overvalue scenery, novelty, and social energy. They undervalue access, routines, infrastructure, noise, and how a place feels on an ordinary Tuesday.",
      "A real-life base should support your work, your mind, your budget, and your daily rhythm — not just your imagination.",
      "That is why this product tries to separate mountain fantasy from mountain fit.",
    ],
  },
  {
    slug: "bir-vs-dharamshala-vs-palampur",
    title: "Bir vs Dharamshala vs Palampur",
    summary:
      "A practical comparison of three very different rhythms of mountain life.",
    category: "Town comparisons",
    body: [
      "Bir is often the most immediately exciting if you want inspiration, social overlap, and a lighter, more mobile chapter. It is less convincing if you need rooted calm.",
      "Dharamshala is one of the better-balanced choices. It can hold a work rhythm, some movement, and longer-stay practicality without feeling as sleepy as calmer towns.",
      "Palampur is often the answer for people who realize they want steadiness more than atmosphere-driven momentum. It feels less performative and more livable.",
      "If you are choosing between them, the real question is not which one is better — it is which tradeoff profile fits you best.",
    ],
  },
  {
    slug: "what-people-underestimate-about-moving-to-himachal",
    title: "What people underestimate about moving to Himachal",
    summary:
      "A grounded look at access, work friction, seasonality, and expectations.",
    category: "Relocation reality",
    body: [
      "People often underestimate friction. A place can feel magical and still make everyday life more complex than expected.",
      "Internet matters differently when you rely on it for income. Access matters differently when plans change. Quiet matters differently after the novelty wears off.",
      "Seasonality also changes the emotional tone of a place. What feels romantic in one month may feel isolating or impractical in another.",
      "The goal is not to avoid all friction. It is to choose the kind of friction you can actually live with.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
