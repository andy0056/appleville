/**
 * Turns dense-retrieval hits into a routed intent.
 *
 * The responders are hand-written and produce good grounded answers — the
 * thing that was broken was never the answering, it was deciding which
 * responder should see the question. So rather than having embeddings generate
 * text, they pick the domain and hand the existing machinery an intent that
 * says so. Retrieval changes the routing; nothing downstream changes at all.
 */

import { getGuideBySlug } from "../guides.ts";
import type { SemanticHit } from "./embeddings/semantic.ts";
import type { AssistantIntent, AssistantIntentKind, AssistantPageType } from "./types.ts";

/** Resource pages map one-to-one onto responders. */
const PATH_TO_KIND: Record<string, AssistantIntentKind> = {
  "/property-rules": "property",
  "/womens-safety": "women_safety",
  "/food": "food_water",
  "/banking": "banking",
  "/power-backup": "power",
  "/community": "community",
  "/first-30-days": "moving",
  "/how-it-works": "method",
  "/about": "method",
};

/**
 * Guides are heterogeneous, so they route on the guide's own useCase rather
 * than on a slug list that would drift the moment a guide is added.
 */
const USE_CASE_TO_KIND: Record<string, AssistantIntentKind> = {
  "trial-move": "moving",
  "remote-work": "town_fit",
  family: "town_fit",
  shortlist: "town_fit",
  "fit-basics": "town_fit",
};

function kindForPathname(pathname: string): AssistantIntentKind | null {
  const direct = PATH_TO_KIND[pathname];
  if (direct) return direct;

  if (pathname.startsWith("/towns/")) return "town_fit";

  if (pathname.startsWith("/guides/")) {
    const guide = getGuideBySlug(pathname.replace("/guides/", ""));
    return guide ? (USE_CASE_TO_KIND[guide.useCase] ?? "town_fit") : "town_fit";
  }

  return null;
}

/**
 * Votes across the top hits rather than trusting the single best one — a
 * question can graze one town page while three safety chunks sit just behind
 * it, and the majority is the better signal. Ties break toward the higher
 * similarity score.
 */
function pickKind(hits: SemanticHit[]): { kind: AssistantIntentKind; hit: SemanticHit } | null {
  const tally = new Map<AssistantIntentKind, { weight: number; best: SemanticHit }>();

  for (const hit of hits) {
    const kind = kindForPathname(hit.chunk.pathname);
    if (!kind) continue;

    const existing = tally.get(kind);
    if (existing) {
      existing.weight += hit.score;
    } else {
      tally.set(kind, { weight: hit.score, best: hit });
    }
  }

  const ranked = [...tally.entries()].sort((left, right) => right[1].weight - left[1].weight);
  const top = ranked[0];
  return top ? { kind: top[0], hit: top[1].best } : null;
}

/**
 * Produces an intent the responders will accept, or null when the hits carry
 * no routable signal — in which case the caller keeps the lexical outcome.
 */
export function applySemanticRouting(
  intent: AssistantIntent,
  hits: SemanticHit[],
): AssistantIntent | null {
  if (!hits.length) return null;

  const picked = pickKind(hits);
  if (!picked) return null;

  const { kind, hit } = picked;

  // Towns named by the winning chunks, preferring ones the query itself
  // mentioned so an explicit "Bir" is never overridden by a neighbour.
  const semanticTowns = hits
    .filter((h) => kindForPathname(h.chunk.pathname) === kind)
    .flatMap((h) => h.chunk.entitySlugs)
    .filter((slug, i, all) => all.indexOf(slug) === i);

  const townSlugs = intent.mentionedTownSlugs.length
    ? intent.mentionedTownSlugs
    : semanticTowns.slice(0, 3);

  const pageTypes: AssistantPageType[] = [
    ...new Set(hits.map((h) => h.chunk.pageType)),
  ];

  return {
    ...intent,
    intentKind: kind,
    primaryIntentKind: kind,
    focusDomainKind: kind,
    // A trial-move guide winning means the question was about testing a move,
    // which the moving responder handles through this sub-intent.
    subIntent:
      hit.chunk.pathname === "/guides/how-to-test-a-move-before-committing"
        ? "trial_move"
        : intent.subIntent,
    townSlugs,
    topics: intent.topics,
    pageTypes,
    hasKnownDomainSignal: true,
    queryFrame: {
      ...intent.queryFrame,
      primaryIntentKind: kind,
      focusDomainKind: kind,
    },
  };
}
