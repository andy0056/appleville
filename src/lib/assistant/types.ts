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
  activeTownSlugs: string[];
  activeTopics: AssistantTopic[];
  activePageTypes: AssistantPageType[];
};

export type AssistantIntent = {
  rawQuery: string;
  normalizedQuery: string;
  explicitTownSlugs: string[];
  townSlugs: string[];
  topics: AssistantTopic[];
  pageTypes: AssistantPageType[];
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
  supportBullets: string[];
  citations: AssistantCitation[];
  nextLinks: AssistantNextLink[];
  confidence: "high" | "medium" | "low";
  conversationContext: AssistantConversationContext;
  didFallback: boolean;
  fallbackReason?: "no_match" | "low_confidence" | "out_of_scope";
};
