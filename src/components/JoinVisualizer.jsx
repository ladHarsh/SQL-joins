import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  residents, societyEvents, events, friendships,
  joinDescriptions, storyDescriptions,
} from "../data/datasets";
import { executeJoin } from "../utils/joinEngine";

const TYPES = ["INNER", "LEFT", "RIGHT", "FULL", "CROSS", "SELF"];

// ─── Venn Diagram SVG ──────────────────────────────────────────────────────
function VennDiagram({ type }) {
  const config = {
    INNER: { leftOnly: false, overlap: true,  rightOnly: false },
    LEFT:  { leftOnly: true,  overlap: true,  rightOnly: false },
    RIGHT: { leftOnly: false, overlap: true,  rightOnly: true  },
    FULL:  { leftOnly: true,  overlap: true,  rightOnly: true  },
    CROSS: { leftOnly: true,  overlap: true,  rightOnly: true  },
    SELF:  { leftOnly: true,  overlap: true,  rightOnly: false },
  }[type] || {};

  const info = joinDescriptions[type];
  const activeColor = info?.color || "#6366f1";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="clipOverlap">
            <circle cx="72" cy="60" r="45" />
          </clipPath>
        </defs>

        {/* Left circle */}
        <circle cx="72" cy="60" r="45"
          fill={config.leftOnly ? activeColor : "transparent"}
          fillOpacity={config.leftOnly ? 0.35 : 0}
          stroke={activeColor} strokeWidth="2" strokeOpacity={0.5} />

        {/* Right circle */}
        <circle cx="128" cy="60" r="45"
          fill={config.rightOnly ? activeColor : "transparent"}
          fillOpacity={config.rightOnly ? 0.35 : 0}
          stroke={activeColor} strokeWidth="2" strokeOpacity={0.5} />

        {/* Overlap area */}
        <circle cx="128" cy="60" r="45"
          clipPath="url(#clipOverlap)"
          fill={config.overlap ? activeColor : (config.leftOnly && !config.rightOnly ? "#0f172a" : "transparent")}
          fillOpacity={config.overlap ? 0.6 : (config.leftOnly && !config.rightOnly ? 0.8 : 0)} />

        {/* Labels */}
        <text x="52" y="62" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">L</text>
        <text x="148" y="62" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">R</text>
      </svg>
      <p className="text-[.6rem] text-slate-500 mt-1 font-mono text-center">{info?.tagline}</p>
    </div>
  );
}

// ─── Table config by join type ──────────────────────────────────────────────
function getTableConfig(type) {
  if (type === "CROSS") return { left: residents.slice(0, 4), right: events, leftName: "Residents", rightName: "Events", lFields: ["name", "role"], rFields: ["event"] };
  if (type === "SELF")  return { left: residents.slice(0, 5), right: residents.slice(0, 5), leftName: "Residents (A)", rightName: "Residents (B)", lFields: ["name", "flat"], rFields: ["name", "flat"] };
  return { left: residents, right: societyEvents, leftName: "Residents", rightName: "SocietyActivities", lFields: ["name", "flat", "role"], rFields: ["activity"] };
}

function getJoinConfig(type) {
  if (type === "CROSS") return { left: residents.slice(0, 4), right: events, lKey: "id", rKey: null };
  if (type === "SELF")  return { selfTable: residents, friendships };
  return { left: residents, right: societyEvents, lKey: "id", rKey: "resident_id" };
}

// ─── SQL-style result table (like SSMS output) ─────────────────────────────
function SQLResultTable({ result, tconf, info }) {
  if (!result || result.length === 0) return null;
  const lCols = tconf.lFields;
  const rCols = tconf.rFields;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800/60">
      <table className="w-full text-[.68rem] font-mono">
        <thead>
          <tr className="bg-slate-800/50">
            {lCols.map(c => (
              <th key={`l-${c}`} className="px-3 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-700/50">
                r.{c.replace(/_/g, "")}
              </th>
            ))}
            <th className="px-1 py-2 border-b border-slate-700/50 w-4">
              <span className="text-slate-600">│</span>
            </th>
            {rCols.map(c => (
              <th key={`r-${c}`} className="px-3 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-700/50">
                s.{c.replace(/_/g, "")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((row, i) => (
            <motion.tr key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * .025, duration: .2 }}
              className={`border-b border-slate-800/30 transition-colors ${
                row.type === "matched" ? "hover:bg-green-500/5" :
                row.type === "null-fill" ? "hover:bg-amber-500/5" :
                row.type === "cross" ? "hover:bg-violet-500/5" :
                "hover:bg-slate-800/30"
              }`}>
              {lCols.map(c => (
                <td key={`l-${c}`} className="px-3 py-1.5">
                  {row.left
                    ? <span className="text-white">{row.left.emoji && c === "name" ? `${row.left.emoji} ` : ""}{String(row.left[c] ?? "")}</span>
                    : <span className="text-amber-400 italic">NULL</span>
                  }
                </td>
              ))}
              <td className="px-1 py-1.5 text-center">
                {row.type === "matched" && <span className="text-green-400">🔗</span>}
                {row.type === "null-fill" && <span className="text-amber-400">∅</span>}
                {row.type === "cross" && <span className="text-violet-400">×</span>}
                {row.type === "self-ref" && <span>🪞</span>}
              </td>
              {rCols.map(c => (
                <td key={`r-${c}`} className="px-3 py-1.5">
                  {row.right
                    ? <span className="text-white">{row.right.icon && c === "activity" ? `${row.right.icon} ` : ""}{String(row.right[c] ?? "")}</span>
                    : <span className="text-amber-400 italic">NULL</span>
                  }
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function JoinVisualizer() {
  const [active, setActive] = useState(null);

  const info   = active ? joinDescriptions[active] : null;
  const story  = active ? storyDescriptions[active] : null;
  const tconf  = active ? getTableConfig(active) : getTableConfig("INNER");
  const jconf  = active ? getJoinConfig(active) : null;
  const result = useMemo(() => active ? executeJoin(active, jconf) : null, [active]);

  // Row matching for source-table highlighting
  const matchedLeftIds = useMemo(() => {
    if (!result) return new Set();
    return new Set(result.filter(r => r.left).map(r => r.left.id));
  }, [result]);
  const matchedRightIds = useMemo(() => {
    if (!result) return new Set();
    return new Set(result.filter(r => r.right).map(r => r.right.id ?? r.right.resident_id));
  }, [result]);

  function isLeftExcluded(row) {
    if (!active) return false;
    if (["INNER", "RIGHT"].includes(active)) return !matchedLeftIds.has(row.id);
    return false;
  }
  function isRightExcluded(row) {
    if (!active) return false;
    if (["INNER", "LEFT"].includes(active)) return !matchedRightIds.has(row.id ?? row.resident_id);
    return false;
  }
  function isLeftMatched(row)  { return active && matchedLeftIds.has(row.id); }
  function isRightMatched(row) { return active && matchedRightIds.has(row.id ?? row.resident_id); }

  return (
    <section id="visualizer" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5">
          <h2 className="sec-head grad-text mb-1">JOIN Visualizer</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            <span className="text-white font-semibold">Residents</span> of Gokuldham Society and their{" "}
            <span className="text-white font-semibold">Society Activities</span>.
            Click any JOIN type to see the SQL query, Venn diagram, and result table.
          </p>
        </motion.div>

        {/* ── JOIN Type Buttons ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {TYPES.map(t => (
            <motion.button key={t} whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}
              onClick={() => setActive(active === t ? null : t)}
              className={`jbtn ${active === t ? "active" : ""}`} data-type={t}>
              {joinDescriptions[t].icon} {joinDescriptions[t].name}
            </motion.button>
          ))}
        </div>

        {/* ── Info strip + ALWAYS VISIBLE SQL ── */}
        <AnimatePresence mode="wait">
          {info && (
            <motion.div key={active}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass p-4 mb-5 max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left: Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-2xl">{info.icon}</span>
                    <h3 className="font-['Outfit'] font-extrabold text-base" style={{ color: info.color }}>{info.name}</h3>
                    <span className="text-[.65rem] text-slate-500 italic">{info.tagline}</span>
                  </div>
                  <p className="text-slate-300 text-xs mb-1">{info.shortDesc}</p>
                  <p className="text-xs font-bold" style={{ color: info.color }}>Rule: {info.rule}</p>
                </div>
                {/* Right: SQL Always Visible */}
                <div className="lg:w-[320px] flex-shrink-0">
                  <p className="text-[.55rem] font-mono text-slate-600 uppercase tracking-wider mb-1">SQL Query</p>
                  <pre className="bg-[#020617] rounded-xl p-3 text-[.68rem] font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {info.sql}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SOURCE TABLES ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">

          {/* Left Table */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="font-['Outfit'] font-bold text-sm text-white">{tconf.leftName}</span>
              <span className="ml-auto text-[.6rem] font-mono text-slate-500 uppercase tracking-wider">LEFT TABLE</span>
            </div>
            <div className="flex gap-2 px-3 py-1 text-[.58rem] font-mono text-slate-600 uppercase tracking-wider border-b border-slate-800/60 mb-1">
              <span className="w-7">PK</span>
              {tconf.lFields.map(f => (
                <span key={f} className={`${f === 'role' ? 'flex-[2]' : 'flex-1'} truncate text-left`}>
                  {f.replace(/_/g, " ")}
                </span>
              ))}
            </div>
            <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
              {tconf.left.map((row, i) => {
                const excl = isLeftExcluded(row);
                const match = isLeftMatched(row);
                return (
                  <motion.div key={row.id || i}
                    animate={{ opacity: excl ? .25 : 1, scale: excl ? .97 : 1 }}
                    transition={{ duration: .3, delay: i * .04 }}
                    className={`drow ${active ? (excl ? "excluded" : match ? "matched" : "glass") : "glass"}`}>
                    <span className="w-7 text-[.65rem] font-mono text-slate-500">{row.id ?? i+1}</span>
                    {tconf.lFields.map(f => (
                      <span key={f} className={`${f === 'role' ? 'flex-[2]' : 'flex-1'} text-xs text-white ${f === 'role' ? 'whitespace-normal leading-tight' : 'truncate'}`} title={String(row[f] ?? "")}>
                        {row.emoji && f === "name" ? `${row.emoji} ` : ""}{String(row[f] ?? "")}
                      </span>
                    ))}
                    {active && match && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 text-xs ml-auto">✓</motion.span>}
                    {active && excl  && <span className="text-red-400 text-xs ml-auto opacity-60">✗</span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Table */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 flex-shrink-0" />
              <span className="font-['Outfit'] font-bold text-sm text-white">{tconf.rightName}</span>
              <span className="ml-auto text-[.6rem] font-mono text-slate-500 uppercase tracking-wider">RIGHT TABLE</span>
            </div>
            <div className="flex gap-2 px-3 py-1 text-[.58rem] font-mono text-slate-600 uppercase tracking-wider border-b border-slate-800/60 mb-1">
              <span className="w-7">FK</span>
              {tconf.rFields.map(f => <span key={f} className="flex-1 truncate">{f.replace(/_/g, " ")}</span>)}
            </div>
            <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
              {tconf.right.map((row, i) => {
                const rId = row.id ?? row.resident_id ?? i;
                const excl = isRightExcluded(row);
                const match = isRightMatched(row);
                return (
                  <motion.div key={rId}
                    animate={{ opacity: excl ? .25 : 1, scale: excl ? .97 : 1 }}
                    transition={{ duration: .3, delay: i * .04 }}
                    className={`drow ${active ? (excl ? "excluded" : match ? "matched" : "glass") : "glass"}`}>
                    <span className="w-7 text-[.65rem] font-mono text-pink-400/70">{row.resident_id ?? ""}</span>
                    {tconf.rFields.map(f => (
                      <span key={f} className="flex-1 text-xs text-white whitespace-normal leading-tight">
                        {row.icon && f === "activity" ? `${row.icon} ` : ""}{String(row[f] ?? "")}
                      </span>
                    ))}
                    {active && match && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 text-xs ml-auto">✓</motion.span>}
                    {active && excl  && <span className="text-red-400 text-xs ml-auto opacity-60">✗</span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── RESULT SECTION: Venn + Story + SQL-style Table ── */}
        <AnimatePresence>
          {result && result.length > 0 && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass p-4 sm:p-5 rounded-2xl max-w-5xl mx-auto">

              {/* Top row: Venn + Story + Stats */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Venn Diagram */}
                <div className="flex-shrink-0 sm:w-[180px]">
                  <VennDiagram type={active} />
                </div>
                {/* Story + stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-['Outfit'] font-bold text-sm text-white">Query Result</h3>
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-[.65rem] font-bold"
                      style={{ background: `${info?.color}20`, color: info?.color }}>
                      {result.length} row{result.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {story && (
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      <span className="font-bold mr-1" style={{ color: info?.color }}>Story:</span>{story.summary}
                    </p>
                  )}
                  {story?.nullStory && (
                    <p className="text-[.68rem] text-amber-400/80 italic">
                      NULL = {story.nullStory}
                    </p>
                  )}
                  {/* Legend */}
                  <div className="flex flex-wrap gap-3 mt-2 text-[.6rem] text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500/40 border border-green-500/50 inline-block" /> Matched</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500/20 border border-amber-500/40 border-dashed inline-block" /> NULL-fill</span>
                    {result.some(r => r.type === "cross") && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-500/20 border border-violet-500/40 inline-block" /> Cartesian</span>}
                  </div>
                </div>
              </div>

              {/* SQL-style result table */}
              <div className="max-h-[280px] overflow-y-auto">
                <SQLResultTable result={result} tconf={tconf} info={info} />
              </div>

              {/* Stat bar */}
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap gap-4 text-[.65rem] text-slate-500">
                <span>Matched <strong className="text-green-400">{result.filter(r => r.type === "matched").length}</strong></span>
                <span>NULL-fill <strong className="text-amber-400">{result.filter(r => r.type === "null-fill").length}</strong></span>
                {result.some(r => r.type === "self-ref") && <span>Self-ref <strong className="text-rose-400">{result.filter(r => r.type === "self-ref").length}</strong></span>}
                <span>Total <strong className="text-white">{result.length}</strong></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-6 text-slate-600 text-sm">
            ↑ Click a JOIN type above to see the SQL query, Venn diagram, and result table
          </motion.div>
        )}
      </div>
    </section>
  );
}
