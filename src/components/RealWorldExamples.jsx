import { motion } from "framer-motion";
import { realWorldExamples, joinDescriptions } from "../data/datasets";

function MiniDiagram({ ex }) {
  // Build result preview from static data
  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-slate-800/60">
      {/* Tables header */}
      <div className="grid grid-cols-2 text-[.58rem] font-mono text-slate-600 uppercase tracking-wider px-3 py-1.5 border-b border-slate-800/60">
        <span>{ex.leftTable}</span>
        <span className="text-right">{ex.rightTable}</span>
      </div>

      {/* Source rows */}
      <div className="grid grid-cols-2 gap-2 px-3 py-2 border-b border-slate-800/40">
        <div className="space-y-1">
          {ex.leftRows.map((r, i) => (
            <div key={i} className={`text-[.65rem] px-2 py-0.5 rounded-md ${
              r.includes("✓") ? "bg-green-500/10 text-green-300 border border-green-500/25" :
              r.includes("→") ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 border-dashed" :
              "bg-slate-800/50 text-slate-400"
            }`}>{r.replace(" ✓", "").replace(" →", "").replace(" ✗", "")}</div>
          ))}
        </div>
        <div className="space-y-1">
          {ex.rightRows.map((r, i) => (
            <div key={i} className={`text-[.65rem] px-2 py-0.5 rounded-md text-right ${
              r.includes("✓") ? "bg-green-500/10 text-green-300 border border-green-500/25" :
              r.includes("→") ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 border-dashed" :
              "bg-slate-800/50 text-slate-400"
            }`}>{r.replace(" ✓", "").replace(" →", "").replace(" ✗", "")}</div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="px-3 py-2">
        <p className="text-[.55rem] font-mono text-slate-600 uppercase tracking-wider mb-1.5">Result →</p>
        <div className="space-y-1">
          {ex.resultRows.map((r, i) => (
            <div key={i} className={`text-[.65rem] px-2 py-0.5 rounded-md font-mono ${
              r.includes("NULL")
                ? "bg-amber-500/8 text-amber-300/80 border border-amber-500/20 border-dashed"
                : "bg-green-500/8 text-green-300 border border-green-500/20"
            }`}>{r}</div>
          ))}
        </div>
        <p className="text-[.58rem] text-slate-600 mt-1.5 italic">{ex.resultType}</p>
      </div>
    </div>
  );
}

export default function RealWorldExamples() {
  return (
    <section id="examples" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-text mb-2">Real World JOIN Examples</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Every JOIN type explained using relatable everyday scenarios — students, orders, gaming teams, and more.
            Each card shows the source data, the join result, and exactly which rows get NULLed out.
          </p>
        </motion.div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {realWorldExamples.map((ex, i) => (
            <motion.div key={ex.joinType}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .08, duration: .4 }}
              whileHover={{ y: -5, transition: { duration: .2 } }}
              className="glass p-4 sm:p-5 rounded-2xl flex flex-col"
              style={{ borderTop: `3px solid ${ex.color}` }}>

              {/* Card header */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div>
                  <h3 className="font-['Outfit'] font-bold text-sm text-white leading-tight">{ex.title}</h3>
                  <p className="text-[.65rem] text-slate-500 mt-0.5">{ex.explanation}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[.6rem] font-mono font-bold flex-shrink-0"
                  style={{ background: `${ex.color}18`, color: ex.color }}>
                  {ex.joinType}
                </span>
              </div>

              {/* SQL snippet */}
              <div className="glass rounded-lg px-3 py-2 mb-3 font-mono text-[.62rem] text-cyan-300/70 leading-relaxed">
                <span className="text-violet-400">SELECT</span> *{" "}<br />
                <span className="text-violet-400">FROM</span> {ex.leftTable}{" "}<br />
                <span style={{ color: ex.color }} className="font-bold">{ex.joinType}</span>{" "}
                {ex.rightTable}{" "}<br />
                {ex.joinType !== "CROSS JOIN" && ex.joinType !== "NATURAL JOIN" && (
                  <><span className="text-violet-400">ON</span> <span className="text-slate-400">id = id;</span></>
                )}
                {ex.joinType === "CROSS JOIN" && <span className="text-slate-500">-- No condition needed</span>}
                {ex.joinType === "NATURAL JOIN" && <span className="text-slate-500">-- Auto-matches columns</span>}
              </div>

              {/* Mini diagram */}
              <div className="flex-1">
                <MiniDiagram ex={ex} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick reference table */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 glass p-5 rounded-2xl overflow-x-auto">
          <h3 className="font-['Outfit'] font-bold text-sm text-white mb-4 text-center">Quick Comparison</h3>
          <table className="w-full text-xs min-w-[520px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-2 px-3 text-slate-500 font-semibold">JOIN Type</th>
                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Returns</th>
                <th className="text-left py-2 px-3 text-slate-500 font-semibold">NULLs?</th>
                <th className="text-left py-2 px-3 text-slate-500 font-semibold">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { type: "INNER",   returns: "Only matching rows from BOTH", nulls: "Never",         cond: "ON clause required" },
                { type: "LEFT",    returns: "All left rows + matching right", nulls: "Right side",   cond: "ON clause required" },
                { type: "RIGHT",   returns: "All right rows + matching left", nulls: "Left side",    cond: "ON clause required" },
                { type: "FULL",    returns: "All rows from both tables",      nulls: "Both sides",   cond: "ON clause required" },
                { type: "CROSS",   returns: "Every row × every row (A×B)",    nulls: "Never",         cond: "No condition" },
                { type: "SELF",    returns: "Rows from same table matched",   nulls: "If unmatched",  cond: "Aliases A & B" },
                { type: "NATURAL", returns: "Shared-column auto-match",       nulls: "If unmatched",  cond: "Auto-detect" },
              ].map(row => {
                const desc = joinDescriptions[row.type];
                return (
                  <tr key={row.type} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2 px-3">
                      <span className="font-mono font-bold text-[.7rem]" style={{ color: desc.color }}>
                        {desc.icon} {desc.name}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-300">{row.returns}</td>
                    <td className="py-2 px-3">
                      <span className={`text-[.65rem] font-mono ${row.nulls === "Never" ? "text-green-400" : "text-amber-400"}`}>
                        {row.nulls}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 font-mono text-[.65rem]">{row.cond}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
