const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No GEMINI_API_KEY found in .env");
  process.exit(1);
}

try {
  console.log("Testing Gemini API with key:", apiKey.substring(0, 10), "...");
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are "JOIN Guru", a fun, friendly SQL JOIN teaching assistant. Answer this question briefly: What is an INNER JOIN?`
          }]
        }]
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log("Success! Gemini responded:");
    console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text in response.");
  } else {
    console.error("API Error!");
    console.error("Status:", response.status, response.statusText);
    const errText = await response.text();
    console.error("Details:", errText);
  }
} catch (err) {
  console.error("Request failed:", err.message);
}
