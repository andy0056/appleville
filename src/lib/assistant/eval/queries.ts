/**
 * Labelled evaluation set for the Ask Appleville assistant.
 *
 * Every query is a question a real person planning a Himachal move would ask,
 * and `expected` lists the pathname(s) that would genuinely answer it. A hit is
 * any expected pathname appearing in the response's citations.
 *
 * `style` is the point of the whole file:
 *
 *   direct     — phrased in the corpus's own vocabulary ("Section 118",
 *                "power backup"). Keyword retrieval should handle these.
 *   paraphrase — phrased the way someone actually asks, using words that may
 *                appear nowhere in the corpus ("can a Punjabi buy farmland",
 *                "do I need an inverter").
 *
 * The gap between those two scores is the vocabulary-mismatch problem, and it
 * is what any retrieval change should be judged on. Splitting them means an
 * improvement that only helps direct queries cannot hide inside an average.
 */

export type EvalStyle = "direct" | "paraphrase";

export type EvalQuery = {
  id: string;
  query: string;
  /** A hit if ANY of these pathnames is cited — several questions are fairly answered by more than one page. */
  expected: string[];
  style: EvalStyle;
  domain: string;
};

export const evalQueries: EvalQuery[] = [
  // ─── Towns ─────────────────────────────────────────────────
  { id: "town-01", query: "What is Bir like?", expected: ["/towns/bir"], style: "direct", domain: "town" },
  { id: "town-02", query: "Tell me about Palampur", expected: ["/towns/palampur"], style: "direct", domain: "town" },
  { id: "town-03", query: "Shimla overview", expected: ["/towns/shimla"], style: "direct", domain: "town" },
  { id: "town-04", query: "Is Manali good for remote work?", expected: ["/towns/manali"], style: "direct", domain: "town" },
  { id: "town-05", query: "Who is Solan not ideal for?", expected: ["/towns/solan"], style: "direct", domain: "town" },
  { id: "town-06", query: "What's the local feel of Naggar?", expected: ["/towns/naggar"], style: "direct", domain: "town" },
  { id: "town-07", query: "Where do the paragliders hang out?", expected: ["/towns/bir"], style: "paraphrase", domain: "town" },
  { id: "town-08", query: "Which place has the Dalai Lama?", expected: ["/towns/mcleodganj", "/towns/dharamshala"], style: "paraphrase", domain: "town" },
  { id: "town-09", query: "I want somewhere with tea gardens and not too many tourists", expected: ["/towns/palampur"], style: "paraphrase", domain: "town" },
  { id: "town-10", query: "Somewhere close to Chandigarh so my parents can visit easily", expected: ["/towns/solan"], style: "paraphrase", domain: "town" },

  // ─── Property rules ────────────────────────────────────────
  { id: "prop-01", query: "Section 118", expected: ["/property-rules"], style: "direct", domain: "property" },
  { id: "prop-02", query: "Can an NRI buy property in Himachal?", expected: ["/property-rules"], style: "direct", domain: "property" },
  { id: "prop-03", query: "property purchase routes", expected: ["/property-rules"], style: "direct", domain: "property" },
  { id: "prop-04", query: "Can a Punjabi guy buy farmland here?", expected: ["/property-rules"], style: "paraphrase", domain: "property" },
  { id: "prop-05", query: "I'm from Delhi, can I own a cottage in the hills?", expected: ["/property-rules"], style: "paraphrase", domain: "property" },
  { id: "prop-06", query: "How do people get scammed buying land there?", expected: ["/property-rules"], style: "paraphrase", domain: "property" },
  { id: "prop-07", query: "Can I set up a company to hold the land instead?", expected: ["/property-rules"], style: "paraphrase", domain: "property" },

  // ─── Power ─────────────────────────────────────────────────
  { id: "pow-01", query: "power backup", expected: ["/power-backup"], style: "direct", domain: "power" },
  { id: "pow-02", query: "Which town has the most reliable electricity?", expected: ["/power-backup"], style: "direct", domain: "power" },
  { id: "pow-03", query: "outage profile for Bir", expected: ["/power-backup"], style: "direct", domain: "power" },
  { id: "pow-04", query: "Do I need an inverter?", expected: ["/power-backup"], style: "paraphrase", domain: "power" },
  { id: "pow-05", query: "How often do the lights go out?", expected: ["/power-backup"], style: "paraphrase", domain: "power" },
  { id: "pow-06", query: "Will my fridge survive the winter there?", expected: ["/power-backup"], style: "paraphrase", domain: "power" },

  // ─── Women's safety ────────────────────────────────────────
  { id: "safe-01", query: "women's safety in Shimla", expected: ["/womens-safety"], style: "direct", domain: "women_safety" },
  { id: "safe-02", query: "crime data for Himachal towns", expected: ["/womens-safety"], style: "direct", domain: "women_safety" },
  { id: "safe-03", query: "SheTravel policy", expected: ["/womens-safety"], style: "direct", domain: "women_safety" },
  { id: "safe-04", query: "Is it okay for a single woman to rent alone there?", expected: ["/womens-safety"], style: "paraphrase", domain: "women_safety" },
  { id: "safe-05", query: "My daughter wants to move there by herself, should I worry?", expected: ["/womens-safety"], style: "paraphrase", domain: "women_safety" },
  { id: "safe-06", query: "Can I walk back after dark?", expected: ["/womens-safety"], style: "paraphrase", domain: "women_safety" },

  // ─── Food and water ────────────────────────────────────────
  { id: "food-01", query: "Is the tap water drinkable?", expected: ["/food"], style: "direct", domain: "food_water" },
  { id: "food-02", query: "vegetable markets", expected: ["/food"], style: "direct", domain: "food_water" },
  { id: "food-03", query: "dairy ecosystem in Himachal", expected: ["/food"], style: "direct", domain: "food_water" },
  { id: "food-04", query: "Where do I find fresh sabzi in January?", expected: ["/food"], style: "paraphrase", domain: "food_water" },
  { id: "food-05", query: "Can I get chicken and eggs easily?", expected: ["/food"], style: "paraphrase", domain: "food_water" },
  { id: "food-06", query: "Do I have to boil everything I drink?", expected: ["/food"], style: "paraphrase", domain: "food_water" },

  // ─── Banking ───────────────────────────────────────────────
  { id: "bank-01", query: "banking in Palampur", expected: ["/banking"], style: "direct", domain: "banking" },
  { id: "bank-02", query: "financial snapshot", expected: ["/banking"], style: "direct", domain: "banking" },
  { id: "bank-03", query: "Where do I open a bank account?", expected: ["/banking"], style: "paraphrase", domain: "banking" },
  { id: "bank-04", query: "Will I find an ATM that actually has cash?", expected: ["/banking"], style: "paraphrase", domain: "banking" },

  // ─── Community ─────────────────────────────────────────────
  { id: "comm-01", query: "community profile for Dharamshala", expected: ["/community"], style: "direct", domain: "community" },
  { id: "comm-02", query: "newcomer playbook", expected: ["/community"], style: "direct", domain: "community" },
  { id: "comm-03", query: "How do I make friends after moving?", expected: ["/community"], style: "paraphrase", domain: "community" },
  { id: "comm-04", query: "Will I be lonely there in the off season?", expected: ["/community"], style: "paraphrase", domain: "community" },

  // ─── First 30 days ─────────────────────────────────────────
  { id: "move-01", query: "first 30 days checklist", expected: ["/first-30-days"], style: "direct", domain: "moving" },
  { id: "move-02", query: "move-in go-bag", expected: ["/first-30-days"], style: "direct", domain: "moving" },
  { id: "move-03", query: "What do I sort out in my first month?", expected: ["/first-30-days"], style: "paraphrase", domain: "moving" },
  { id: "move-04", query: "I land next week with two suitcases, then what?", expected: ["/first-30-days"], style: "paraphrase", domain: "moving" },

  // ─── Guides ────────────────────────────────────────────────
  { id: "guide-01", query: "best Himachal towns for remote workers", expected: ["/guides/best-himachal-towns-for-remote-workers"], style: "direct", domain: "guide" },
  { id: "guide-02", query: "best towns for families", expected: ["/guides/best-himachal-towns-for-families"], style: "direct", domain: "guide" },
  { id: "guide-03", query: "quiet vs social towns", expected: ["/guides/quiet-vs-social-towns-in-himachal"], style: "direct", domain: "guide" },
  { id: "guide-04", query: "how to test a move before committing", expected: ["/guides/how-to-test-a-move-before-committing"], style: "direct", domain: "guide" },
  { id: "guide-05", query: "Bir vs Dharamshala vs Palampur", expected: ["/guides/bir-vs-dharamshala-vs-palampur"], style: "direct", domain: "guide" },
  { id: "guide-06", query: "My video calls cannot drop, where should I live?", expected: ["/guides/best-himachal-towns-for-remote-workers"], style: "paraphrase", domain: "guide" },
  { id: "guide-07", query: "We have a six year old, where should we go?", expected: ["/guides/best-himachal-towns-for-families"], style: "paraphrase", domain: "guide" },
  { id: "guide-08", query: "I hate crowds and noise", expected: ["/guides/quiet-vs-social-towns-in-himachal"], style: "paraphrase", domain: "guide" },
  { id: "guide-09", query: "How do I try it out before selling my flat?", expected: ["/guides/how-to-test-a-move-before-committing"], style: "paraphrase", domain: "guide" },
  { id: "guide-10", query: "What goes wrong after the honeymoon phase wears off?", expected: ["/guides/what-people-underestimate-about-moving-to-himachal"], style: "paraphrase", domain: "guide" },
  { id: "guide-11", query: "A holiday there was lovely but is it liveable?", expected: ["/guides/vacation-town-vs-real-life-base"], style: "paraphrase", domain: "guide" },
  { id: "guide-12", query: "Everyone says the mountains fix you, is that true?", expected: ["/guides/what-people-underestimate-about-moving-to-himachal", "/guides/vacation-town-vs-real-life-base"], style: "paraphrase", domain: "guide" },

  // ─── Method / meta ─────────────────────────────────────────
  { id: "meth-01", query: "How do town trait scores work?", expected: ["/how-it-works"], style: "direct", domain: "method" },
  { id: "meth-02", query: "What Appleville cannot know", expected: ["/how-it-works"], style: "direct", domain: "method" },
  { id: "meth-03", query: "Where does this data even come from?", expected: ["/how-it-works", "/about"], style: "paraphrase", domain: "method" },
  { id: "meth-04", query: "Should I trust these rankings?", expected: ["/how-it-works", "/about"], style: "paraphrase", domain: "method" },
];

export const evalQueryCount = evalQueries.length;
