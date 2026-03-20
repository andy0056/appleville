import { resourceSectionAnchors } from "../../content-anchors.ts";
import {
  buyerTypes,
  dueDiligenceChecklist,
  purchaseRoutes,
  scamRisks,
  section118Summary,
} from "../../property-rules.ts";
import { getTownBySlug } from "../../towns.ts";
import type { AssistantIntent, AssistantUserProfile } from "../types.ts";
import {
  buildCitation,
  buildGuideLink,
  buildResourceLink,
  buildTownProfileLink,
  dedupeNextLinks,
  ensureKeyPoints,
  summarizeText,
  type AssistantResponderResult,
} from "./shared.ts";

function getBuyerType(profile: AssistantUserProfile) {
  switch (profile) {
    case "nri_oci":
      return buyerTypes.find((buyer) => buyer.label === "NRI / OCI");
    case "foreign_national":
      return buyerTypes.find((buyer) => buyer.label === "Foreign national (non-Indian origin)");
    case "company":
      return buyerTypes.find((buyer) => buyer.label === "Company / LLP");
    case "out_of_state_indian":
    default:
      return buyerTypes.find((buyer) => buyer.label === "Out-of-state Indian citizen");
  }
}

function getProfileLabel(profile: AssistantUserProfile) {
  switch (profile) {
    case "nri_oci":
      return "As an NRI or OCI";
    case "foreign_national":
      return "As a foreign national of non-Indian origin";
    case "company":
      return "Through a company or LLP";
    case "out_of_state_indian":
    default:
      return "As an out-of-state Indian";
  }
}

export function buildPropertyResponse(intent: AssistantIntent): AssistantResponderResult {
  const profile = intent.userProfile ?? "out_of_state_indian";
  const buyerType = getBuyerType(profile);
  const town =
    intent.townSlugs.length === 1 ? getTownBySlug(intent.townSlugs[0]) : null;
  const locationPhrase = town ? ` in ${town.name}` : " in Himachal Pradesh";
  const municipalRoute = purchaseRoutes[0];
  const permissionRoute = purchaseRoutes[1];
  const leaseRoute = purchaseRoutes[2];
  const riskRoute = purchaseRoutes[3];
  const primaryRisk = scamRisks[0];

  let answer = "";
  if (intent.subIntent === "lease") {
    answer = `${getProfileLabel(profile)}, a registered long lease is usually the cleaner, lower-risk path${locationPhrase} than trying to force ownership of land.`;
  } else if (intent.subIntent === "risk") {
    answer = `Do not treat POA, GPA, or "buy now, permission later" structures as a safe way to buy${locationPhrase}. Appleville's property guidance reads those as high-risk workarounds, not normal ownership routes.`;
  } else if (intent.subIntent === "eligibility") {
    answer = `${getProfileLabel(profile)}, do not assume you can directly buy land${locationPhrase}. The normal safe answer is to check whether the asset is genuinely outside the restricted "land" bucket or to use a lawful lease or permission path instead.`;
  } else {
    answer = `${getProfileLabel(profile)}, do not assume you can directly buy land${locationPhrase}. The lower-risk routes are a genuinely exempt built-up municipal unit, a registered long lease, or a formal permission route where it actually applies.`;
  }

  const keyPoints = ensureKeyPoints([
    section118Summary.core,
    buyerType?.headline ?? "",
    intent.subIntent === "lease"
      ? `${leaseRoute.route}. Best for: ${leaseRoute.bestFor}.`
      : `Safer routes usually mean either ${municipalRoute.route.toLowerCase()} or ${permissionRoute.route.toLowerCase()}.`,
    intent.subIntent === "risk"
      ? `${primaryRisk.title}: ${primaryRisk.detail}`
      : `Before paying, verify the revenue classification, the exact exemption or permission path, and whether the deal still works without "creative" paperwork.`,
  ]);

  const caution =
    intent.subIntent === "risk"
      ? summarizeText(section118Summary.enforcement, 1, 180)
      : summarizeText(
          `${riskRoute.route}. ${section118Summary.antiAvoidance} ${dueDiligenceChecklist[0]}`,
          2,
          180,
        );

  const citations = [
    buildCitation(
      "Property rules in Himachal",
      `/property-rules#${resourceSectionAnchors.propertyRules.section118}`,
      "Section 118",
      summarizeText(section118Summary.core, 1, 120),
    ),
    buildCitation(
      "Property rules in Himachal",
      `/property-rules#${resourceSectionAnchors.propertyRules.buyerTypes}`,
      "Buyer types",
      summarizeText(buyerType?.detail ?? "", 1, 120),
    ),
    buildCitation(
      "Property rules in Himachal",
      `/property-rules#${resourceSectionAnchors.propertyRules.purchaseRoutes}`,
      "Purchase routes",
      summarizeText(
        intent.subIntent === "lease" ? leaseRoute.route : municipalRoute.route,
        1,
        120,
      ),
    ),
  ];

  const nextLinks = dedupeNextLinks(
    [
      buildResourceLink(
        "Open property rules",
        "/property-rules",
        "Read the full legal and practical decision tree instead of a short extracted answer.",
      ),
      town ? buildTownProfileLink(town.slug) : null,
      buildGuideLink(
        "how-to-test-a-move-before-committing",
        "Use a trial stay before making a property or lease decision.",
      ),
    ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
  );

  return {
    answer,
    keyPoints,
    caution,
    citations,
    nextLinks,
    confidence: "high",
    resolvedTownSlugs: town ? [town.slug] : [],
    resolvedPageTypes: ["resource"],
  };
}
