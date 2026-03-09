import { motion } from "framer-motion";
import { cheatSheetItems, joinDescriptions, genZExamples } from "../data/datasets";

export default function CheatSheet() {
  return (
    <section id="cheatsheet" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-text mb-2">JOIN Cheat Sheet</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Quick reference for all 7 join types, plus relatable Gen-Z examples you'll actually remember.
          </p>
        </motion.div>

        {/* JOIN type cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {cheatSheetItems.map((item, i) => {
            const info = joinDescriptions[item.type];
            return (
              <motion.div key={item.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08, duration: .4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="cheat-card glass"
                style={{ borderTop: `3px solid ${item.color}` }}>
                <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                <h3 className="font-['Outfit'] font-extrabold text-xs sm:text-sm mb-1" style={{ color: item.color }}>
                  {info.name}
                </h3>
                <p className="font-bold text-white text-xs sm:text-sm mb-2">{item.rule}</p>
                <p className="text-[.65rem] text-slate-500 italic">{item.mnemonic}</p>
              </motion.div>
            );
          })}

          {/* UNION vs JOIN bonus card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .6 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="cheat-card glass"
            style={{ borderTop: "3px solid #a78bfa" }}>
            <div className="text-3xl sm:text-4xl mb-3">📊</div>
            <h3 className="font-['Outfit'] font-extrabold text-xs sm:text-sm mb-1 text-violet-400">
              UNION vs JOIN
            </h3>
            <p className="font-bold text-white text-xs sm:text-sm mb-2">Stack ≠ Merge</p>
            <p className="text-[.65rem] text-slate-500 italic">JOIN merges columns →  UNION stacks rows ↓</p>
          </motion.div>
        </div>

        {/* Gen-Z Real-World Examples */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-lg text-center text-white mb-6">
            Real-World Examples
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {genZExamples.map((ex, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08, duration: .4 }}
                whileHover={{ y: -4 }}
                className="glass p-4 sm:p-5 rounded-xl"
                style={{ borderLeft: `3px solid ${ex.color}` }}>

                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-['Outfit'] font-bold text-sm text-white">{ex.title}</h4>
                  <span className="text-[.6rem] font-mono font-bold px-2 py-0.5 rounded-md"
                    style={{ background: `${ex.color}15`, color: ex.color }}>
                    {ex.joinType}
                  </span>
                </div>

                {/* Mini diagram */}
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <p className="text-[.55rem] text-slate-500 font-mono uppercase mb-1">{ex.leftTable}</p>
                    <div className="space-y-1">
                      {ex.diagram.left.map((item, j) => {
                        const isMatched = ex.diagram.matched === "all" || ex.diagram.matched?.some(m => m[0] === item);
                        const isNull = ex.diagram.nullLeft?.includes(item);
                        return (
                          <div key={j} className={`text-[.65rem] px-2 py-1 rounded-md ${
                            isMatched ? "bg-green-500/10 text-green-300 border border-green-500/20" :
                            isNull ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 border-dashed" :
                            "bg-slate-800/50 text-slate-400"
                          }`}>
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center text-slate-600 text-xs">⟷</div>
                  <div className="flex-1">
                    <p className="text-[.55rem] text-slate-500 font-mono uppercase mb-1">{ex.rightTable}</p>
                    <div className="space-y-1">
                      {ex.diagram.right.map((item, j) => {
                        const isMatched = ex.diagram.matched === "all" || ex.diagram.matched?.some(m => m[1] === item);
                        const isNull = ex.diagram.nullRight?.includes(item);
                        return (
                          <div key={j} className={`text-[.65rem] px-2 py-1 rounded-md ${
                            isMatched ? "bg-green-500/10 text-green-300 border border-green-500/20" :
                            isNull ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 border-dashed" :
                            "bg-slate-800/50 text-slate-400"
                          }`}>
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-[.7rem] text-slate-400 leading-relaxed">{ex.explanation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Visual Comparison */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-5 rounded-2xl">
          <h3 className="font-['Outfit'] font-bold text-sm text-center text-slate-300 mb-4">Quick Memory Hack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-cyan-400 mb-1.5">Want ONLY matches?</p>
              <p className="text-sm text-white font-mono">→ INNER JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-green-400 mb-1.5">Want ALL from one table?</p>
              <p className="text-sm text-white font-mono">→ LEFT or RIGHT JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-amber-400 mb-1.5">Want EVERYTHING from both?</p>
              <p className="text-sm text-white font-mono">→ FULL OUTER JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-violet-400 mb-1.5">Want ALL possible combos?</p>
              <p className="text-sm text-white font-mono">→ CROSS JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-rose-400 mb-1.5">Same table relationships?</p>
              <p className="text-sm text-white font-mono">→ SELF JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-teal-400 mb-1.5">Shared column auto-match?</p>
              <p className="text-sm text-white font-mono">→ NATURAL JOIN</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
