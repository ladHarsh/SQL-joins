import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { residents, professions, friendships, events, studentRecords, gradeInfo, joinDescriptions } from "../data/datasets";
import { executeJoin } from "../utils/joinEngine";

const TYPES = ["INNER", "LEFT", "RIGHT", "FULL", "CROSS", "SELF", "NATURAL"];

export default function JoinVisualizer() {
  const [active, setActive] = useState(null);
  const [showSQL, setShowSQL] = useState(false);

  const config = {
    left: residents, right: professions,
    lKey: "id", rKey: "resident_id",
    crossLeft: residents.slice(0, 4), crossRight: events,
    selfTable: residents, friendships,
    natLeft: studentRecords, natRight: gradeInfo,
  };

  const result = useMemo(() => active ? executeJoin(active, config) : null, [active]);
  const info = active ? joinDescriptions[active] : null;

  // Determine which rows are in the join result
  const matchedLeftIds = useMemo(() => {
    if (!result) return new Set();
    return new Set(result.filter(r => r.left).map(r => r.left.id));
  }, [result]);
  const matchedRightIds = useMemo(() => {
    if (!result) return new Set();
    return new Set(result.filter(r => r.right).map(r => r.right.id));
  }, [result]);

  // Decide which source tables to show based on join type
  const showStandard = !active || ["INNER", "LEFT", "RIGHT", "FULL"].includes(active);
  const isCross = active === "CROSS";
  const isSelf = active === "SELF";
  const isNatural = active === "NATURAL";

  const leftData  = isCross ? residents.slice(0, 4) : isNatural ? studentRecords : isSelf ? residents : residents;
  const rightData = isCross ? events : isNatural ? gradeInfo : isSelf ? residents : professions;
  const leftName  = isCross ? "Residents (sample)" : isNatural ? "Student Records" : isSelf ? "Residents (A)" : "Residents";
  const rightName = isCross ? "Events" : isNatural ? "Grade Info" : isSelf ? "Residents (B)" : "Professions";
  const leftFields  = isCross ? ["name","emoji"] : isNatural ? ["student_name","score"] : ["name","emoji","flat"];
  const rightFields = isCross ? ["event"] : isNatural ? ["grade","teacher"] : isSelf ? ["name","emoji","flat"] : ["profession","icon"];
  const leftKeyField = isCross || isSelf ? null : isNatural ? null : "id";
  const rightKeyField = isCross || isSelf ? null : isNatural ? null : "resident_id";

  return (
    <section id="visualizer" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-text mb-2">🔬 JOIN Visualizer Simulator</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Gokuldham Society dataset 🏘️ — Click any JOIN to see rows animate, merge, vanish, or fill with NULLs!
          </p>
        </motion.div>

        {/* JOIN type buttons */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8">
          {TYPES.map(t => (
            <motion.button key={t} whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}
              onClick={() => setActive(active === t ? null : t)}
              className={`jbtn ${active === t ? "active" : ""}`} data-type={t}>
              {joinDescriptions[t].icon} {joinDescriptions[t].name}
            </motion.button>
          ))}
        </motion.div>

        {/* Join info card */}
        <AnimatePresence mode="wait">
          {info && (
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} className="glass p-4 sm:p-5 mb-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-3 flex-wrap">
                <span className="text-3xl">{info.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Outfit'] font-extrabold text-lg" style={{ color: info.color }}>
                    {info.name} <span className="text-xs text-slate-500 font-normal ml-1">— {info.tagline}</span>
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">{info.shortDesc}</p>
                  <p className="text-slate-500 text-xs mt-2 italic">🏘️ {info.realLife}</p>
                  <p className="mt-2 text-xs font-bold" style={{ color: info.color }}>💡 Rule: {info.rule}</p>
                </div>
                <button onClick={() => setShowSQL(!showSQL)}
                  className="px-3 py-1 rounded-lg text-xs font-mono glass text-slate-400 hover:text-white transition-colors flex-shrink-0">
                  {showSQL ? "Hide" : "Show"} SQL
                </button>
              </div>
              <AnimatePresence>
                {showSQL && (
                  <motion.pre initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 bg-[#020617] rounded-lg p-3 text-xs font-mono text-cyan-300 overflow-x-auto">
                    {info.sql}
                  </motion.pre>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Source Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* Left Table */}
          <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <h3 className="font-['Outfit'] font-bold text-sm text-white">{leftName}</h3>
              <span className="text-[.65rem] text-slate-500 font-mono ml-auto">LEFT TABLE</span>
            </div>
            <div className="flex gap-2 px-3 py-1.5 text-[.6rem] font-mono text-slate-500 uppercase tracking-wider">
              {!isCross && !isSelf && !isNatural && <span className="w-6">ID</span>}
              {leftFields.map(f => <span key={f} className="flex-1">{f}</span>)}
            </div>
            <div className="space-y-1.5 mt-1">
              {leftData.map((row, i) => {
                const isExcluded = active && (active === "INNER" || active === "RIGHT") && !matchedLeftIds.has(row.id);
                const isMatch = active && matchedLeftIds.has(row.id);
                return (
                  <motion.div key={row.id || i} initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: isExcluded ? .3 : 1, x: 0, scale: isExcluded ? .96 : 1 }}
                    transition={{ duration: .35, delay: i * .06 }}
                    className={`drow ${active ? (isExcluded ? "excluded" : isMatch ? "matched" : "glass") : "glass"}`}>
                    {!isCross && !isSelf && !isNatural && <span className="w-6 font-bold text-slate-500 text-xs">{row.id}</span>}
                    {leftFields.map(f => <span key={f} className="flex-1 text-white text-xs">{row[f]}</span>)}
                    {active && !isExcluded && isMatch && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 text-xs">✓</motion.span>}
                    {isExcluded && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-400 text-xs">✗</motion.span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Table */}
          <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              <h3 className="font-['Outfit'] font-bold text-sm text-white">{rightName}</h3>
              <span className="text-[.65rem] text-slate-500 font-mono ml-auto">RIGHT TABLE</span>
            </div>
            <div className="flex gap-2 px-3 py-1.5 text-[.6rem] font-mono text-slate-500 uppercase tracking-wider">
              {rightKeyField && <span className="w-6">FK</span>}
              {rightFields.map(f => <span key={f} className="flex-1">{f}</span>)}
            </div>
            <div className="space-y-1.5 mt-1">
              {rightData.map((row, i) => {
                const rId = row.id || i;
                const isExcluded = active && (active === "INNER" || active === "LEFT") && !matchedRightIds.has(row.id);
                const isMatch = active && matchedRightIds.has(row.id);
                return (
                  <motion.div key={rId} initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: isExcluded ? .3 : 1, x: 0, scale: isExcluded ? .96 : 1 }}
                    transition={{ duration: .35, delay: i * .06 }}
                    className={`drow ${active ? (isExcluded ? "excluded" : isMatch ? "matched" : "glass") : "glass"}`}>
                    {rightKeyField && <span className="w-6 font-bold text-slate-500 text-xs">{row[rightKeyField]}</span>}
                    {rightFields.map(f => <span key={f} className="flex-1 text-white text-xs">{row[f]}</span>)}
                    {active && !isExcluded && isMatch && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 text-xs">✓</motion.span>}
                    {isExcluded && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-400 text-xs">✗</motion.span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Result Table */}
        <AnimatePresence>
          {result && result.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 25 }}
              className="glass p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <motion.span animate={{ rotate: [0,360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-xl">⚡</motion.span>
                <h3 className="font-['Outfit'] font-bold text-base text-white">Result Table</h3>
                <span className="ml-auto px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${info?.color}18`, color: info?.color }}>
                  {result.length} row{result.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Result header */}
              <div className="flex gap-2 px-3 py-1.5 text-[.6rem] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-800 mb-1.5">
                <span className="flex-1">← {leftName}</span>
                <span className="w-10 text-center">⟷</span>
                <span className="flex-1 text-right">{rightName} →</span>
              </div>

              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {result.map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * .04, duration: .3 }}
                    className={`drow ${row.type}`}>
                    <div className="flex-1 flex gap-1.5 items-center flex-wrap">
                      {row.left ? leftFields.map(f => (
                        <span key={f} className="text-white text-[.72rem]">{row.left[f]}</span>
                      )) : <span className="text-amber-400 text-[.7rem] font-mono italic">NULL</span>}
                    </div>
                    <div className="w-10 flex justify-center">
                      {row.type === "matched" ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[.65rem]"
                          style={{ background: "rgba(34,197,94,.12)" }}>🔗</motion.span>
                      ) : row.type === "self-ref" ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: [0,1.3,1] }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[.65rem]"
                          style={{ background: "rgba(244,63,94,.12)" }}>🪞</motion.span>
                      ) : row.type === "cross" ? (
                        <span className="text-[.6rem] text-violet-400">×</span>
                      ) : (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: [0,1.2,1] }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[.6rem]"
                          style={{ background: "rgba(245,158,11,.1)" }}>∅</motion.span>
                      )}
                    </div>
                    <div className="flex-1 flex gap-1.5 items-center justify-end flex-wrap text-right">
                      {row.right ? rightFields.map(f => (
                        <span key={f} className="text-white text-[.72rem]">{row.right[f]}</span>
                      )) : <span className="text-amber-400 text-[.7rem] font-mono italic">NULL</span>}
                      {row.right?.label && (
                        <span className="text-[.6rem] text-slate-500 ml-1">({row.right.label})</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-5 mt-4 text-[.65rem] text-slate-500">
                <span>✅ Matched: <strong className="text-green-400">{result.filter(r => r.type === "matched").length}</strong></span>
                <span>∅ NULL: <strong className="text-amber-400">{result.filter(r => r.type === "null-fill").length}</strong></span>
                {result.some(r => r.type === "cross") && <span>✖️ Cross: <strong className="text-violet-400">{result.filter(r => r.type === "cross").length}</strong></span>}
                <span>📊 Total: <strong className="text-white">{result.length}</strong></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
