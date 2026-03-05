import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { datasets, joinDescriptions } from "../data/datasets";
import { executeJoin } from "../utils/joinEngine";

// ======= INTERACTIVE JOIN VISUALIZER =======
const joinTypes = ["INNER", "LEFT", "RIGHT", "FULL"];
const datasetKeys = ["students", "heroes"];

export default function JoinVisualizer() {
  const [activeJoin, setActiveJoin] = useState(null);
  const [datasetKey, setDatasetKey] = useState("students");
  const [showSQL, setShowSQL] = useState(false);

  const dataset = datasets[datasetKey];
  const { leftTable, rightTable, joinKey } = dataset;

  const joinResult = useMemo(() => {
    if (!activeJoin) return null;
    return executeJoin(
      activeJoin,
      leftTable.data,
      rightTable.data,
      joinKey.left,
      joinKey.right
    );
  }, [activeJoin, datasetKey]);

  const joinInfo = activeJoin ? joinDescriptions[activeJoin] : null;

  // Get IDs that are matched in the current join
  const matchedLeftIds = useMemo(() => {
    if (!joinResult) return new Set();
    return new Set(joinResult.filter((r) => r.left).map((r) => r.left.id));
  }, [joinResult]);

  const matchedRightIds = useMemo(() => {
    if (!joinResult) return new Set();
    return new Set(
      joinResult.filter((r) => r.right).map((r) => r.right.id)
    );
  }, [joinResult]);

  return (
    <section id="visualizer" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading gradient-text mb-3">
            🔬 Interactive JOIN Visualizer
          </h2>
          <p className="text-cosmos-300 text-lg max-w-2xl mx-auto">
            Click a JOIN type to see how rows merge, vanish, or fill with NULLs.
            Watch the magic happen!
          </p>
        </motion.div>

        {/* Dataset Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          {datasetKeys.map((key) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDatasetKey(key);
                setActiveJoin(null);
              }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                datasetKey === key
                  ? "glass-card border-cosmos-400 text-white shadow-lg shadow-cosmos-500/20"
                  : "glass-card border-transparent text-cosmos-400 hover:text-white"
              }`}
              style={
                datasetKey === key
                  ? { borderColor: "rgba(108, 58, 237, 0.6)" }
                  : {}
              }
            >
              {key === "students" ? "👩‍🎓 Students & Courses" : "🦸 Heroes & Sidekicks"}
            </motion.button>
          ))}
        </motion.div>

        {/* JOIN Type Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {joinTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveJoin(activeJoin === type ? null : type)}
              className={`join-btn join-btn-${type.toLowerCase()} ${
                activeJoin === type ? "active" : ""
              }`}
              id={`join-btn-${type.toLowerCase()}`}
            >
              {joinDescriptions[type].icon} {joinDescriptions[type].name}
            </motion.button>
          ))}
        </motion.div>

        {/* JOIN Description Card */}
        <AnimatePresence mode="wait">
          {joinInfo && (
            <motion.div
              key={activeJoin}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-5 mb-8 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4 flex-wrap">
                <span className="text-3xl">{joinInfo.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-xl mb-1" style={{ color: joinInfo.color }}>
                    {joinInfo.name}
                  </h3>
                  <p className="text-cosmos-300 text-sm mb-2">{joinInfo.shortDesc}</p>
                  <p className="text-cosmos-400 text-xs italic">💡 {joinInfo.analogy}</p>
                </div>
                <button
                  onClick={() => setShowSQL(!showSQL)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono glass-card text-cosmos-300 hover:text-white transition-colors"
                >
                  {showSQL ? "Hide" : "Show"} SQL
                </button>
              </div>
              <AnimatePresence>
                {showSQL && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <pre className="bg-cosmos-950 rounded-lg p-3 text-xs sm:text-sm font-mono text-nebula-blue overflow-x-auto">
                      {joinInfo.sql}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Left Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#00ff9d" }}
              />
              <h3 className="font-display font-bold text-lg text-white">
                {leftTable.name}
              </h3>
              <span className="text-xs text-cosmos-400 font-mono ml-auto">
                LEFT TABLE
              </span>
            </div>

            {/* Table Header */}
            <div className="grid gap-1 mb-2">
              <div className="flex gap-3 px-4 py-2 text-xs font-mono text-cosmos-400 uppercase tracking-wider">
                <span className="w-8">ID</span>
                {leftTable.displayFields.map((f) => (
                  <span key={f} className="flex-1">{f}</span>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              <AnimatePresence>
                {leftTable.data.map((row, i) => {
                  const isMatched = !activeJoin || matchedLeftIds.has(row.id);
                  const isExcluded =
                    activeJoin &&
                    (activeJoin === "INNER" || activeJoin === "RIGHT") &&
                    !matchedLeftIds.has(row.id);

                  return (
                    <motion.div
                      key={row.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isExcluded ? 0.3 : 1,
                        x: 0,
                        scale: isExcluded ? 0.95 : 1,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className={`data-row ${
                        activeJoin
                          ? isMatched
                            ? "matched"
                            : "unmatched"
                          : "glass-card"
                      }`}
                    >
                      <span className="w-8 font-bold text-cosmos-400">
                        {row.id}
                      </span>
                      {leftTable.displayFields.map((field) => (
                        <span key={field} className="flex-1 text-white">
                          {row[field]}
                        </span>
                      ))}
                      {activeJoin && isMatched && !isExcluded && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-400 text-sm"
                        >
                          ✓
                        </motion.span>
                      )}
                      {isExcluded && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-red-400 text-sm"
                        >
                          ✗
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#ff6bcd" }}
              />
              <h3 className="font-display font-bold text-lg text-white">
                {rightTable.name}
              </h3>
              <span className="text-xs text-cosmos-400 font-mono ml-auto">
                RIGHT TABLE
              </span>
            </div>

            {/* Table Header */}
            <div className="grid gap-1 mb-2">
              <div className="flex gap-3 px-4 py-2 text-xs font-mono text-cosmos-400 uppercase tracking-wider">
                <span className="w-8">FK</span>
                {rightTable.displayFields.map((f) => (
                  <span key={f} className="flex-1">{f}</span>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              <AnimatePresence>
                {rightTable.data.map((row, i) => {
                  const isMatched = !activeJoin || matchedRightIds.has(row.id);
                  const isExcluded =
                    activeJoin &&
                    (activeJoin === "INNER" || activeJoin === "LEFT") &&
                    !matchedRightIds.has(row.id);

                  return (
                    <motion.div
                      key={row.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isExcluded ? 0.3 : 1,
                        x: 0,
                        scale: isExcluded ? 0.95 : 1,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className={`data-row ${
                        activeJoin
                          ? isMatched
                            ? "matched"
                            : "unmatched"
                          : "glass-card"
                      }`}
                    >
                      <span className="w-8 font-bold text-cosmos-400">
                        {row[rightTable.key]}
                      </span>
                      {rightTable.displayFields.map((field) => (
                        <span key={field} className="flex-1 text-white">
                          {row[field]}
                        </span>
                      ))}
                      {activeJoin && isMatched && !isExcluded && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-400 text-sm"
                        >
                          ✓
                        </motion.span>
                      )}
                      {isExcluded && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-red-400 text-sm"
                        >
                          ✗
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* JOIN Result Table */}
        <AnimatePresence>
          {joinResult && joinResult.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-2xl"
                >
                  ⚡
                </motion.div>
                <h3 className="font-display font-bold text-xl text-white">
                  Result Table
                </h3>
                <span
                  className="ml-auto px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `${joinInfo?.color}20`,
                    color: joinInfo?.color,
                  }}
                >
                  {joinResult.length} rows
                </span>
              </div>

              {/* Result Header */}
              <div className="flex gap-3 px-4 py-2 text-xs font-mono text-cosmos-400 uppercase tracking-wider border-b border-cosmos-800 mb-2">
                <span className="flex-1">← {leftTable.name}</span>
                <span className="w-16 text-center">Match</span>
                <span className="flex-1 text-right">{rightTable.name} →</span>
              </div>

              {/* Result Rows */}
              <div className="space-y-2">
                {joinResult.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`data-row ${row.type}`}
                  >
                    {/* Left side */}
                    <div className="flex-1 flex gap-2 items-center">
                      {row.left ? (
                        leftTable.displayFields.map((f) => (
                          <span key={f} className="text-white text-xs sm:text-sm">
                            {row.left[f]}
                          </span>
                        ))
                      ) : (
                        <span className="text-nebula-orange text-xs font-mono italic">
                          NULL
                        </span>
                      )}
                    </div>

                    {/* Match indicator */}
                    <div className="w-16 flex justify-center">
                      {row.type === "matched" ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                          style={{ background: "rgba(0, 255, 157, 0.15)" }}
                        >
                          🔗
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                          style={{ background: "rgba(255, 159, 67, 0.15)" }}
                        >
                          ∅
                        </motion.span>
                      )}
                    </div>

                    {/* Right side */}
                    <div className="flex-1 flex gap-2 items-center justify-end text-right">
                      {row.right ? (
                        rightTable.displayFields.map((f) => (
                          <span key={f} className="text-white text-xs sm:text-sm">
                            {row.right[f]}
                          </span>
                        ))
                      ) : (
                        <span className="text-nebula-orange text-xs font-mono italic">
                          NULL
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Footer */}
              <div className="flex justify-center gap-6 mt-5 text-xs text-cosmos-400">
                <span>
                  ✅ Matched:{" "}
                  <strong className="text-green-400">
                    {joinResult.filter((r) => r.type === "matched").length}
                  </strong>
                </span>
                <span>
                  ∅ NULL-filled:{" "}
                  <strong className="text-nebula-orange">
                    {joinResult.filter((r) => r.type === "null-fill").length}
                  </strong>
                </span>
                <span>
                  📊 Total:{" "}
                  <strong className="text-white">{joinResult.length}</strong>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
