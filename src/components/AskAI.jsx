import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ======= AI EXPLANATION BOX =======
// Lightweight AI chat that works with external API but gracefully degrades

// Curated fallback answers for when API is unavailable
const fallbackAnswers = {
  "inner join": "INNER JOIN returns only the rows that have matching values in both tables. Think of it as the intersection — only rows that exist in BOTH tables make it to the result. If Student A has no matching Course, they don't appear!",
  "left join": "LEFT JOIN returns ALL rows from the left (first) table, and the matched rows from the right table. If there's no match, the right side gets NULL values. The left table is the VIP — everyone gets in!",
  "right join": "RIGHT JOIN is the mirror of LEFT JOIN. It returns ALL rows from the right (second) table, plus matching rows from the left. Unmatched left rows get NULL values. The right table is the VIP here!",
  "full join": "FULL OUTER JOIN returns ALL rows from BOTH tables. Matched rows are combined, and unmatched rows from either table get NULL values for the missing side. It's the most inclusive JOIN — everyone's invited!",
  "cross join": "CROSS JOIN produces a Cartesian product — every row from the first table is paired with every row from the second table. If Table A has 5 rows and Table B has 3 rows, you get 5 × 3 = 15 rows!",
  "self join": "A SELF JOIN joins a table with itself. It's useful when you need to compare rows within the same table. For example, finding employees who share the same manager. You use aliases to distinguish the two 'copies' of the table.",
  "null": "In SQL JOINs, NULL appears when there's no matching value from the other table. In a LEFT JOIN, if a left row has no match on the right, the right columns will be NULL. NULL means 'unknown' or 'no data' — not zero, not empty string!",
  "on": "The ON clause specifies the join condition — which columns to match between the two tables. For example: ON students.id = courses.student_id. It tells SQL how the tables are related.",
  "difference": "Key differences:\n• INNER JOIN: Only matching rows\n• LEFT JOIN: All left + matching right (NULL if no match)\n• RIGHT JOIN: All right + matching left (NULL if no match)\n• FULL JOIN: ALL rows from both tables (NULL where no match)\n\nThink of it as a spectrum from most restrictive (INNER) to most inclusive (FULL)!",
  "when to use": "Use INNER JOIN when you only want matching data. Use LEFT JOIN when you need all records from the primary table (like all customers, even without orders). Use RIGHT JOIN rarely — most people restructure as LEFT JOIN. Use FULL JOIN when you need complete data from both sources.",
};

function findFallbackAnswer(question) {
  const q = question.toLowerCase();
  
  // Check for specific join types first
  if (q.includes("inner")) return fallbackAnswers["inner join"];
  if (q.includes("left")) return fallbackAnswers["left join"];
  if (q.includes("right")) return fallbackAnswers["right join"];
  if (q.includes("full") || q.includes("outer")) return fallbackAnswers["full join"];
  if (q.includes("cross")) return fallbackAnswers["cross join"];
  if (q.includes("self")) return fallbackAnswers["self join"];
  if (q.includes("null")) return fallbackAnswers["null"];
  if (q.includes("on ") || q.includes("on clause") || q.includes("condition")) return fallbackAnswers["on"];
  if (q.includes("difference") || q.includes("vs") || q.includes("compare")) return fallbackAnswers["difference"];
  if (q.includes("when") || q.includes("use") || q.includes("should")) return fallbackAnswers["when to use"];
  
  return "Great question! SQL JOINs combine rows from two or more tables based on a related column. The four main types are INNER (only matches), LEFT (all left + matches), RIGHT (all right + matches), and FULL (everything). Try asking about a specific JOIN type for a more detailed explanation! 🚀";
}

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm your SQL JOIN guide. Ask me anything about JOINs and I'll explain it in simple terms! Try asking:\n\n• What's the difference between LEFT and INNER JOIN?\n• When should I use a FULL JOIN?\n• What does NULL mean in JOINs?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      if (apiKey) {
        // Try Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a friendly SQL JOIN teaching assistant. Answer this question about SQL JOINs in a simple, fun way with examples. Keep it short (2-4 sentences max). Use emojis. Question: ${userMessage}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            findFallbackAnswer(userMessage);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: aiText },
          ]);
        } else {
          throw new Error("API failed");
        }
      } else {
        // Use curated fallback
        await new Promise((r) => setTimeout(r, 800)); // Simulate thinking
        const answer = findFallbackAnswer(userMessage);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer, isFallback: true },
        ]);
      }
    } catch {
      // Graceful fallback
      const answer = findFallbackAnswer(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, isFallback: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetKey = () => {
    setApiKey(apiKeyInput.trim());
    setShowKeyInput(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "🔑 API key set! I'll now use Gemini AI for smarter answers. Ask away! 🚀",
      },
    ]);
  };

  return (
    <section id="askAI" className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="section-heading gradient-text mb-3">
            🤖 Ask AI About JOINs
          </h2>
          <p className="text-cosmos-300 text-lg max-w-xl mx-auto">
            Confused about a JOIN concept? Ask our AI assistant and get
            a simple, fun explanation instantly!
          </p>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="mt-3 text-xs text-cosmos-500 hover:text-cosmos-300 transition-colors underline"
          >
            {apiKey ? "✅ Gemini API Connected" : "🔑 Add Gemini API Key (optional)"}
          </button>
        </motion.div>

        {/* API Key Input */}
        <AnimatePresence>
          {showKeyInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass-card p-4 rounded-xl flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste your Gemini API key here..."
                  className="flex-1 bg-cosmos-950 rounded-lg px-4 py-2 text-sm text-white border border-cosmos-800 focus:border-cosmos-400 focus:outline-none"
                />
                <button
                  onClick={handleSetKey}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-cosmos-600 text-white hover:bg-cosmos-500 transition-colors"
                >
                  Set Key
                </button>
              </div>
              <p className="text-xs text-cosmos-500 mt-2 text-center">
                Optional: Works without API key using built-in knowledge base. Get a free key at{" "}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nebula-blue hover:underline"
                >
                  aistudio.google.com
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Chat Messages */}
          <div
            className="p-4 space-y-4 overflow-y-auto"
            style={{ maxHeight: "400px", minHeight: "250px" }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-cosmos-600 text-white rounded-br-sm"
                      : "bg-cosmos-900/80 text-cosmos-200 rounded-bl-sm border border-cosmos-800"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="text-xs block mb-1 text-cosmos-500">
                      {msg.isFallback ? "📚 Built-in Knowledge" : "🤖 AI Guide"}
                    </span>
                  )}
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-cosmos-900/80 text-cosmos-400 rounded-2xl rounded-bl-sm px-4 py-3 text-sm border border-cosmos-800">
                  <motion.div className="flex gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-2 h-2 rounded-full bg-cosmos-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: dot * 0.15,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-cosmos-800 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SQL JOINs..."
              className="flex-1 bg-cosmos-950 rounded-xl px-4 py-3 text-sm text-white border border-cosmos-800 focus:border-cosmos-400 focus:outline-none transition-colors"
              id="ai-chat-input"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-cosmos-600 text-white hover:bg-cosmos-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              id="ai-chat-send"
            >
              Send 🚀
            </motion.button>
          </form>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {[
            "What's the difference between JOINs?",
            "When should I use LEFT JOIN?",
            "What does NULL mean?",
            "Explain CROSS JOIN",
          ].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 rounded-lg text-xs glass-card text-cosmos-400 hover:text-white transition-colors"
            >
              💬 {q}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
