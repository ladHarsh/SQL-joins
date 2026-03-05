import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { realLifeJoins } from "../data/datasets";

// ======= REAL-LIFE JOINS (HUMOROUS EXAMPLES) =======
export default function RealLifeJoins() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getJoinBadgeClass = (type) => {
    switch (type) {
      case "INNER JOIN": return "join-btn-inner";
      case "LEFT JOIN": return "join-btn-left";
      case "RIGHT JOIN": return "join-btn-right";
      case "FULL JOIN": return "join-btn-full";
      default: return "";
    }
  };

  return (
    <section id="reallife" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading gradient-text mb-3">
            😂 Real-Life JOINs
          </h2>
          <p className="text-cosmos-300 text-lg max-w-2xl mx-auto">
            SQL JOINs are everywhere in real life! Here are some funny (and actually accurate)
            examples to help you never forget them.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realLifeJoins.map((example, i) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => toggleExpand(example.id)}
            >
              {/* Card Header Bar */}
              <div
                className="h-1.5"
                style={{ background: example.color }}
              />

              <div className="p-5">
                {/* Title + Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-display font-bold text-base text-white leading-snug">
                    {example.title}
                  </h3>
                  <span
                    className={`join-btn ${getJoinBadgeClass(example.type)} text-xs px-2 py-1 flex-shrink-0`}
                  >
                    {example.type.split(" ")[0]}
                  </span>
                </div>

                {/* Scenario */}
                <p className="text-cosmos-300 text-sm mb-4 leading-relaxed">
                  {example.scenario}
                </p>

                {/* Mini Table Representation */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span
                    className="px-2.5 py-1.5 rounded-lg font-mono"
                    style={{
                      background: `${example.color}15`,
                      color: example.color,
                      border: `1px solid ${example.color}30`,
                    }}
                  >
                    {example.leftTable}
                  </span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg"
                  >
                    ⟕
                  </motion.span>
                  <span
                    className="px-2.5 py-1.5 rounded-lg font-mono"
                    style={{
                      background: `${example.color}15`,
                      color: example.color,
                      border: `1px solid ${example.color}30`,
                    }}
                  >
                    {example.rightTable}
                  </span>
                </div>

                {/* Expand indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cosmos-500">
                    {expandedId === example.id ? "Click to collapse" : "Click to expand"}
                  </span>
                  <motion.span
                    animate={{ rotate: expandedId === example.id ? 180 : 0 }}
                    className="text-cosmos-400"
                  >
                    ▼
                  </motion.span>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === example.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-cosmos-800">
                        {/* Result */}
                        <div className="flex items-start gap-2 mb-3">
                          <span className="text-sm">📋</span>
                          <div>
                            <span className="text-xs text-cosmos-400 block mb-1">Result:</span>
                            <span className="text-sm text-white">{example.result}</span>
                          </div>
                        </div>

                        {/* Meme Text */}
                        <div
                          className="p-3 rounded-xl text-center italic text-sm"
                          style={{
                            background: `${example.color}08`,
                            border: `1px dashed ${example.color}30`,
                            color: example.color,
                          }}
                        >
                          &ldquo;{example.memeText}&rdquo;
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun Fact Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 rounded-2xl text-center"
        >
          <span className="text-3xl block mb-3">🧠</span>
          <h4 className="font-display font-bold text-lg text-white mb-2">
            Pro Tip from the Universe
          </h4>
          <p className="text-cosmos-300 text-sm max-w-2xl mx-auto">
            When in doubt about which JOIN to use, ask yourself:{" "}
            <span className="text-nebula-blue font-semibold">
              &ldquo;Which table do I want ALL rows from?&rdquo;
            </span>
            {" "}If the answer is &ldquo;both&rdquo; → FULL JOIN. 
            &ldquo;Left only&rdquo; → LEFT JOIN. 
            &ldquo;Right only&rdquo; → RIGHT JOIN. 
            &ldquo;Only matches&rdquo; → INNER JOIN. Simple! 🎯
          </p>
        </motion.div>
      </div>
    </section>
  );
}
