export type AssistantPageType = "town" | "guide" | "resource" | "method" | "meta";

export type AssistantTopic =
  | "town-fit"
  | "remote-work"
  | "family"
  | "quiet"
  | "access"
  | "long-stay"
  | "social"
  | "beauty"
  | "tourism"
  | "food"
  | "water"
  | "banking"
  | "community"
  | "safety"
  | "property"
  | "power"
  | "moving"
  | "cost"
  | "method";

export type AssistantIntentKind =
  | "town_fit"
  | "comparison"
  | "property"
  | "women_safety"
  | "food_water"
  | "banking"
  | "power"
  | "community"
  | "moving"
  | "method"
  | "generic";

export type AssistantSubIntent =
  | "ranking"
  | "single_town"
  | "eligibility"
  | "purchase_route"
  | "lease"
  | "risk"
  | "town_safety"
  | "statewide_safety"
  | "healthcare"
  | "water"
  | "groceries"
  | "delivery"
  | "account_opening"
  | "cash_upi"
  | "forex"
  | "network"
  | "outages"
  | "backup"
  | "heating"
  | "coworking"
  | "social"
  | "mental_health"
  | "trial_move"
  | "settling"
  | "utilities"
  | "how_it_works"
  | "fallback";

export type AssistantUserProfile =
  | "out_of_state_indian"
  | "nri_oci"
  | "foreign_national"
  | "company"
  | null;

export type AssistantChunk = {
  id: string;
  pathname: string;
  anchor: string;
  pageTitle: string;
  sectionTitle: string;
  pageType: AssistantPageType;
  entitySlugs: string[];
  keywords: string[];
  text: string;
  priority: number;
};

export type AssistantCitation = {
  title: string;
  href: string;
  sectionLabel: string;
  excerpt?: string;
};

export type AssistantNextLink = {
  label: string;
  href: string;
  reason: string;
};

export type AssistantConversationContext = {
  activeIntentKind: AssistantIntentKind | null;
  activeTownSlugs: string[];
  activeTopics: AssistantTopic[];
  activePageTypes: AssistantPageType[];
  activeUserProfile: AssistantUserProfile;
};

export type AssistantIntent = {
  rawQuery: string;
  normalizedQuery: string;
  intentKind: AssistantIntentKind;
  subIntent: AssistantSubIntent;
  explicitTownSlugs: string[];
  townSlugs: string[];
  topics: AssistantTopic[];
  pageTypes: AssistantPageType[];
  userProfile: AssistantUserProfile;
  wantsComparison: boolean;
  wantsTownRanking: boolean;
  wantsMethod: boolean;
  isFollowUp: boolean;
  hasKnownDomainSignal: boolean;
};

export type AssistantSearchResult = {
  chunk: AssistantChunk;
  score: number;
  matchReasons: string[];
};

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantRequest = {
  message: string;
  conversationContext?: AssistantConversationContext | null;
  history?: AssistantMessage[];
};

export type AssistantResponse = {
  answer: string;
  keyPoints: string[];
  caution?: string;
  citations: AssistantCitation[];
  nextLinks: AssistantNextLink[];
  confidence: "high" | "medium" | "low";
  conversationContext: AssistantConversationContext;
  didFallback: boolean;
  fallbackReason?: "no_match" | "low_confidence" | "out_of_scope";
  responderKind: AssistantIntentKind;
};

export type AssistantSearchOptions = {
  allowedPathnames?: string[];
  excludedPathnames?: string[];
  allowedPageTypes?: AssistantPageType[];
  requiredKeywords?: string[];
  mustIncludePathname?: string | null;
};
