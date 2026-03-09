// Vercel Serverless Function — Gemini API proxy
// Keeps API key secure on the server side
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are "JOIN Guru", a fun, friendly SQL JOIN teaching assistant for Gen-Z college interns. Answer this question about SQL JOINs in a simple, engaging way. Use emojis. Keep it SHORT (2-4 sentences max). Use analogies from everyday life like Instagram, gaming, college, or Indian TV shows. Question: ${question}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I couldn't generate an answer. Try asking differently! 🤔";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Serverless function error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
