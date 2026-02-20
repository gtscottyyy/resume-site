import { json } from "@remix-run/node";
import { connectToDatabase } from "~/utils/db.server";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();

  if (!q) return json({ answer: "please provide a question." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ answer: "AI is not configured yet." });

  const { copy } = await connectToDatabase();

  const experience = ((copy as any)?.experience ?? [])
    .map(
      (e: any) =>
        `- ${e.company} (${e.dates}): ${e.role} — ${e.project}. ${e.description} [${e.tags.join(", ")}]`
    )
    .join("\n");

  const system = `You are a concise assistant answering questions about Scotty Henry's professional background for visitors to his portfolio site. Be direct, friendly, and keep responses to 2–4 sentences.

Name: ${(copy as any)?.home_title ?? "Scotty Henry"}
Role: ${(copy as any)?.home_subtitle ?? "Software Developer"}
About: ${(copy as any)?.about_body ?? ""}

Experience:
${experience}

If asked something outside this data, say so briefly. Do not make things up.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system,
        messages: [{ role: "user", content: q }],
      }),
    });

    if (!res.ok) return json({ answer: "couldn't reach AI. try again." });

    const data = await res.json();
    const answer = data.content?.[0]?.text ?? "no response.";
    return json({ answer });
  } catch {
    return json({ answer: "something went wrong. try again." });
  }
}
