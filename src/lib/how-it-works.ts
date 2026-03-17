export type MethodSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const methodSections: MethodSection[] = [
  {
    id: "overview",
    title: "What Appleville is for",
    paragraphs: [
      "Appleville is built for people choosing a Himachal base for work, family, a medium stay, or a slower move. It is not trying to predict the perfect town for everyone or replace an on-the-ground visit.",
      "The product is most useful when your real question is about fit: what kind of tradeoff you can actually live with once routine, access, noise, and seasonality start to matter.",
    ],
  },
  {
    id: "quiz",
    title: "What the quiz considers",
    paragraphs: [
      "The quiz focuses on pace, access, budget comfort, tourist pressure, remote-work fit, family shape, climate preference, and whether you are optimizing for deep work, inspiration, convenience, or a longer-term base.",
      "It does not try to infer hidden personal details. It uses your explicit answers to narrow which town traits matter more in the ranking.",
    ],
    bullets: [
      "Stay length and how settled the town needs to feel",
      "Life setup, such as solo remote work, a couple rhythm, or family needs",
      "How quiet, social, practical, or scenic you want the place to be",
      "How much access, routine support, and tourist energy you can tolerate",
    ],
  },
  {
    id: "scores",
    title: "How town trait scores work",
    paragraphs: [
      "Each town has editorial trait scores across dimensions like remote work, access, quiet, family fit, tourist pressure, long-stay fit, and atmosphere. These scores are directional, not scientific measurements.",
      "They exist to create useful separation between towns that solve different daily-life problems. A 4 out of 5 does not mean a guarantee. It means the town is generally stronger on that dimension than another town in the current set.",
    ],
  },
  {
    id: "results",
    title: "How result labels should be read",
    paragraphs: [
      "Best fit is the clearest overall answer for the answers you gave. Safer fit is the lower-friction alternative. Aspirational fit is attractive but usually a little less dependable. Alternative fit is viable, but more conditional.",
      "The useful part of the results page is not just who finished first. It is how the top towns differ, what they are better for, and what they ask from you in return.",
    ],
  },
  {
    id: "compare",
    title: "How compare should be read",
    paragraphs: [
      "Compare is meant to separate towns that already feel plausible to you. It does not declare an overall winner. It shows which town is strongest within the selected set on each dimension.",
      "Several towns can be strongest in the same dimension. That is a tie inside your chosen shortlist, not a universal judgment across Himachal.",
    ],
  },
  {
    id: "town-pages",
    title: "What town pages and guides are based on",
    paragraphs: [
      "Town pages combine editorial judgment, current public context, and relative comparison across the current town set. Guides are written to help you compare fit profiles, not to make certainty-heavy claims.",
      "The writing deliberately avoids precise promises about rent, internet, neighborhood experience, or season-to-season consistency, because those can change too much within the same town.",
    ],
  },
  {
    id: "limits",
    title: "What Appleville cannot know",
    paragraphs: [
      "Appleville cannot know your exact neighborhood, housing quality, landlord experience, school fit, road conditions on a specific week, or how a town changes for your household across seasons.",
      "That is why the site describes towns as directional guidance. It helps you narrow the shortlist and understand tradeoffs earlier, but it does not remove the need for a structured scouting visit or trial stay.",
    ],
    bullets: [
      "A specific house or neighborhood",
      "Exact utility reliability on your street",
      "How your household responds emotionally to a place after several months",
      "Whether one seasonal visit reflects the whole year",
    ],
  },
  {
    id: "use-it-well",
    title: "How to use Appleville well",
    paragraphs: [
      "Use the quiz when you want a sharper shortlist fast. Use towns when you already know names and want better distinctions. Use compare when two to four towns still feel live. Use guides when the real question is about move planning, family fit, or a specific tradeoff.",
      "A good next step after using Appleville is usually not a permanent commitment. It is a more intentional trial stay with clearer questions.",
    ],
  },
];
