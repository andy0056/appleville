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

export type AssistantComparisonMode = "none" | "direct" | "ranking" | "contrast";

export type AssistantAnswerShape =
  | "single_domain"
  | "single_town_overview"
  | "comparison"
  | "overview_plus_comparison";

export type AssistantQueryClause = {
  rawText: string;
  normalizedText: string;
  index: number;
  clauseRole: "statement" | "question" | "follow_up";
};

export type AssistantMention = {
  kind: "town" | "domain" | "comparison_cue" | "persona" | "ranking_cue";
  value: string;
  clauseIndex: number;
};

export type AssistantIntentCandidate = {
  kind: AssistantIntentKind;
  score: number;
  clauseIndex: number;
  evidence: string[];
  focusTopics: AssistantTopic[];
};

export type AssistantQueryFrame = {
  primaryIntentKind: AssistantIntentKind;
  focusDomainKind: AssistantIntentKind | null;
  focusTopics: AssistantTopic[];
  mentionedTownSlugs: string[];
  subjectTownSlugs: string[];
  comparisonTownSlugs: string[];
  comparisonMode: AssistantComparisonMode;
  answerShape: AssistantAnswerShape;
};

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
  activePrimaryIntentKind: AssistantIntentKind | null;
  activeFocusDomainKind: AssistantIntentKind | null;
  activeTownSlugs: string[];
  activeMentionedTownSlugs: string[];
  activeComparisonTownSlugs: string[];
  activeTopics: AssistantTopic[];
  activePageTypes: AssistantPageType[];
  activeUserProfile: AssistantUserProfile;
};

export type AssistantIntent = {
  rawQuery: string;
  normalizedQuery: string;
  intentKind: AssistantIntentKind;
  primaryIntentKind: AssistantIntentKind;
  focusDomainKind: AssistantIntentKind | null;
  subIntent: AssistantSubIntent;
  explicitTownSlugs: string[];
  mentionedTownSlugs: string[];
  townSlugs: string[];
  topics: AssistantTopic[];
  pageTypes: AssistantPageType[];
  userProfile: AssistantUserProfile;
  wantsComparison: boolean;
  wantsTownRanking: boolean;
  wantsMethod: boolean;
  isFollowUp: boolean;
  hasKnownDomainSignal: boolean;
  queryFrame: AssistantQueryFrame;
  anticipationMatch: AssistantAnticipationMatch | null;
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
  answerShape?: AssistantAnswerShape;
};

export type AssistantSearchOptions = {
  allowedPathnames?: string[];
  excludedPathnames?: string[];
  allowedPageTypes?: AssistantPageType[];
  requiredKeywords?: string[];
  mustIncludePathname?: string | null;
};

export type AssistantAnticipationDomain = AssistantIntentKind;

export type AssistantAnticipationConstraint = {
  requiresTown?: boolean;
  requiresComparisonCue?: boolean;
  comparisonPreferred?: boolean;
};

export type AssistantAnticipationEntry = {
  id: string;
  domainKind: AssistantAnticipationDomain;
  subIntent: AssistantSubIntent;
  focusTopics: AssistantTopic[];
  sourceKind: "doc" | "module" | "mixed";
  sourceLabel: string;
  livePathname: string | null;
  comparisonCapable: boolean;
  singleTownCapable: boolean;
  followUpCapable: boolean;
  requiredKeywords: string[];
  preferredKeywords: string[];
  questionPatterns: string[];
  samplePrompts: string[];
  strictFallback: boolean;
  evidenceHeadings: string[];
  constraints?: AssistantAnticipationConstraint;
};

export type AssistantAnticipationMatch = {
  entry: AssistantAnticipationEntry;
  score: number;
  matchedKeywords: string[];
  matchedPatterns: string[];
};

export type AssistantAnticipationPromptCase = {
  prompt: string;
  expectedPrimaryIntentKind: AssistantIntentKind;
  expectedFocusDomainKind: AssistantIntentKind | null;
  expectedSubIntent?: AssistantSubIntent;
  answerSourcePathname?: string | null;
};

export type AssistantAnticipationFollowUpCase = {
  seedPrompt: string;
  prompt: string;
  expectedPrimaryIntentKind: AssistantIntentKind;
  expectedFocusDomainKind: AssistantIntentKind | null;
  expectedAnswerShape?: AssistantAnswerShape;
};
