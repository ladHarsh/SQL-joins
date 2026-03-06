import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Curated fallback knowledge base ───
const fallbacks = {
  "inner join": "INNER JOIN returns only rows that match in both tables. Think of it like a strict bouncer — no match, no entry! If Jethalal has a profession entry and Daya doesn't, only Jethalal shows up. 🎯",
  "left join": "LEFT JOIN keeps ALL rows from the left table and fills NULLs for unmatched rows from the right. It's like Bhide's attendance — everyone on the left list is present, missing data = NULL! ⬅️",
  "right join": "RIGHT JOIN keeps ALL rows from the right table and fills NULLs for unmatched left rows. Like listing all professions — even if no resident matches a role, the profession still shows up! ➡️",
  "full join": "FULL OUTER JOIN keeps ALL rows from BOTH tables. No row is left behind! NULLs fill the gaps. It's the Gokuldham reunion — everyone's invited! 🔄",
  "cross join": "CROSS JOIN produces the Cartesian product — every row from A paired with every row from B. 7 residents × 3 events = 21 rows! It's like assigning every person to every event. ✖️",
  "self join": "SELF JOIN is when a table joins with itself, using aliases. Perfect for finding relationships within the same data, like 'who is whose best friend' in a single residents table! 🪞",
  "natural join": "NATURAL JOIN automatically matches columns with the same name in both tables. No ON clause needed — SQL figures it out on its own! Just make sure the shared column names are intentional. 🌿",
  "null": "NULL in JOINs means 'no matching data'. When LEFT JOIN shows a resident without a profession, the profession column becomes NULL — not zero, not blank, just 'unknown'! 👻",
  "difference": "INNER = only matches. LEFT = all left + matches. RIGHT = all right + matches. FULL = everything. CROSS = all combos. SELF = same table. It's a spectrum from strict to everything! 📊",
  "when": "Use INNER when you need only matching data. LEFT when the left table is your priority. FULL when you can't afford to lose ANY row. CROSS for combinations. SELF for self-referencing data! 🧠",
  "union": "UNION stacks rows vertically (combining results), while JOIN merges columns horizontally (combining tables). UNION needs same columns; JOIN needs a key relationship! 📊",
};

function findFallback(q) {
  const l = q.toLowerCase();
  if (l.includes("inner")) return fallbacks["inner join"];
  if (l.includes("left")) return fallbacks["left join"];
  if (l.includes("right")) return fallbacks["right join"];
  if (l.includes("full") || l.includes("outer")) return fallbacks["full join"];
  if (l.includes("cross")) return fallbacks["cross join"];
  if (l.includes("self")) return fallbacks["self join"];
  if (l.includes("natural")) return fallbacks["natural join"];
  if (l.includes("null")) return fallbacks["null"];
  if (l.includes("diff") || l.includes("vs") || l.includes("compare")) return fallbacks["difference"];
  if (l.includes("when") || l.includes("use") || l.includes("should")) return fallbacks["when"];
  if (l.includes("union")) return fallbacks["union"];
  return "Great question! SQL JOINs combine rows from two or more tables based on related columns. The main types are INNER (only matches), LEFT (all from left), RIGHT (all from right), FULL (everything), CROSS (all combos), and SELF (table with itself). Try asking about a specific type! 🚀";
}

export default function AskAI() {
  const [msgs, setMsgs] = useState([{
    role: "ai",
    text: "Hey! 👋 I'm your JOIN Guru. Ask me anything about SQL JOINs — like:\n\n• When should I use LEFT JOIN?\n• What's the difference between INNER and FULL?\n• Explain CROSS JOIN with an example\n• UNION vs JOIN?\n\nLet's go! 🚀",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(p => [...p, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      // Try serverless API first
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }),
      });
      if (res.ok) {
        const data = await res.json();
        setMsgs(p => [...p, { role: "ai", text: data.answer }]);
      } else {
        throw new Error("API failed");
      }
    } catch {
      // Fallback to curated answers
      await new Promise(r => setTimeout(r, 600));
      setMsgs(p => [...p, { role: "ai", text: findFallback(userMsg), isFallback: true }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Explain INNER JOIN simply",
    "LEFT vs RIGHT JOIN?",
    "When to use CROSS JOIN?",
    "What does NULL mean in JOINs?",
    "UNION vs JOIN difference",
    "SELF JOIN example?",
  ];

  return (
    <section id="ai" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8">
          <h2 className="sec-head grad-text mb-2">🤖 Ask JOIN Guru</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Confused about a JOIN? Ask the Guru and get a simple, fun answer.
            Works even offline with built-in knowledge! 📚
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden">

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 380, minHeight: 220 }}>
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`chat-bubble ${m.role === "user" ? "chat-user" : "chat-ai"}`}>
                  {m.role === "ai" && (
                    <span className="text-[.6rem] block mb-1 text-slate-500">
                      {m.isFallback ? "📚 Built-in Knowledge" : "🤖 JOIN Guru"}
                    </span>
                  )}
                  {m.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="chat-ai chat-bubble">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(d => (
                      <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-500"
                        animate={{ y: [0, -5, 0] }} transition={{ duration: .5, repeat: Infinity, delay: d * .12 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={send} className="p-3 border-t border-slate-800 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about SQL JOINs..."
              className="flex-1 bg-[#020617] rounded-xl px-4 py-2.5 text-sm text-white border border-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
              disabled={loading} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
              type="submit" disabled={loading || !input.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-35 disabled:cursor-not-allowed transition-all">
              Send 🚀
            </motion.button>
          </form>
        </motion.div>

        {/* Quick suggestions */}
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)}
              className="px-2.5 py-1 rounded-lg text-[.65rem] glass text-slate-500 hover:text-white transition-colors">
              💬 {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
