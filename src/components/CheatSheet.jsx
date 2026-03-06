import { motion } from "framer-motion";
import { cheatSheetItems, joinDescriptions } from "../data/datasets";

export default function CheatSheet() {
  return (
    <section id="cheatsheet" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-text mb-2">📋 JOIN Cheat Sheet</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Screenshot this. Pin it. Tattoo it. These are the only 7 rules you need to remember. 🧠
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
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
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * .3 }}
                  className="text-3xl sm:text-4xl mb-3">{item.icon}</motion.div>
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

        {/* Quick Visual Comparison */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-5 rounded-2xl">
          <h3 className="font-['Outfit'] font-bold text-sm text-center text-slate-300 mb-4">⚡ Quick Memory Hack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-cyan-400 mb-1.5">🎯 Want ONLY matches?</p>
              <p className="text-sm text-white font-mono">→ INNER JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-green-400 mb-1.5">⬅️ Want ALL from one table?</p>
              <p className="text-sm text-white font-mono">→ LEFT or RIGHT JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-amber-400 mb-1.5">🔄 Want EVERYTHING?</p>
              <p className="text-sm text-white font-mono">→ FULL OUTER JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-violet-400 mb-1.5">✖️ Want ALL combos?</p>
              <p className="text-sm text-white font-mono">→ CROSS JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-rose-400 mb-1.5">🪞 Same table relationships?</p>
              <p className="text-sm text-white font-mono">→ SELF JOIN</p>
            </div>
            <div className="glass p-3 rounded-xl">
              <p className="text-xs font-bold text-teal-400 mb-1.5">🌿 Shared column auto-match?</p>
              <p className="text-sm text-white font-mono">→ NATURAL JOIN</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
