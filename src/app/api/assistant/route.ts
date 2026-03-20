import { NextResponse } from "next/server";
import { generateAssistantResponse } from "@/lib/assistant/respond";
import { sanitizeConversationContext } from "@/lib/assistant/context";
import type { AssistantMessage, AssistantRequest } from "@/lib/assistant/types";

const MAX_MESSAGE_LENGTH = 320;
const MAX_HISTORY_LENGTH = 10;

export const runtime = "nodejs";

function isAssistantMessage(value: unknown): value is AssistantMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "role" in value &&
    "content" in value &&
    (value.role === "user" || value.role === "assistant") &&
    typeof value.content === "string"
  );
}

export async function POST(request: Request) {
  let payload: AssistantRequest;

  try {
    payload = (await request.json()) as AssistantRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const message =
    typeof payload.message === "string" ? payload.message.trim().replace(/\s+/g, " ") : "";

  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const history = Array.isArray(payload.history)
    ? payload.history.filter(isAssistantMessage).slice(-MAX_HISTORY_LENGTH)
    : [];

  const response = generateAssistantResponse(
    message,
    sanitizeConversationContext(payload.conversationContext),
  );

  return NextResponse.json(
    {
      ...response,
      historyLength: history.length,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
