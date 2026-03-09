import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/datasets";

export default function JoinChallenge() {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [showExp, setShowExp] = useState(false);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const q = quizQuestions[cur];
  const total = quizQuestions.length;

  // Simulated class results per question
  const classResults = useMemo(() =>
    quizQuestions.map(qn => {
      const r = qn.options.map((_, i) => i === qn.correct ? Math.floor(Math.random() * 25) + 55 : Math.floor(Math.random() * 18) + 4);
      const t = r.reduce((a, b) => a + b, 0);
      return r.map(v => Math.round(v / t * 100));
    }), []);

  const spawnConfetti = useCallback(() => {
    const colors = ["#6366f1", "#ec4899", "#06b6d4", "#22c55e", "#f59e0b", "#fbbf24"];
    const pieces = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i, left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      dur: `${Math.random() * 1.8 + 1.2}s`, del: `${Math.random() * .4}s`,
      size: Math.random() * 7 + 4,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  }, []);

  const answer = (i) => {
    if (sel !== null) return;
    setSel(i);
    setShowExp(true);
    if (i === q.correct) { setScore(s => s + 1); spawnConfetti(); }
  };

  const next = () => {
    if (cur + 1 >= total) { setDone(true); return; }
    setCur(c => c + 1); setSel(null); setShowExp(false);
  };

  const reset = () => { setCur(0); setSel(null); setScore(0); setShowExp(false); setDone(false); };

  const pct = ((cur + (sel !== null ? 1 : 0)) / total) * 100;

  return (
    <section id="quiz" className="py-16 px-4 relative">
      {confetti.map(p => (
        <div key={p.id} className="confetti" style={{ left: p.left, background: p.color, width: p.size, height: p.size, "--dur": p.dur, "--del": p.del }} />
      ))}

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-warm mb-2">JOIN Challenge</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Test your SQL JOIN skills with TMKOC and Gen-Z scenarios. See how well you understand each join type.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-[.7rem] text-slate-500 mb-1.5">
            <span>Q{cur + 1} of {total}</span><span>Score: {score}/{total}</span>
          </div>
          <div className="pbar">
            <motion.div className="pfill" style={{ background: "linear-gradient(90deg,#6366f1,#ec4899)" }}
              animate={{ width: `${pct}%` }} transition={{ duration: .5 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={`q-${cur}`} initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -45 }} transition={{ duration: .35 }}>

              <div className="glass p-5 sm:p-7 rounded-2xl mb-5">
                {/* Scenario */}
                <div className="glass p-3 rounded-xl mb-4">
                  <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">📖 Scenario</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{q.scenario}</p>
                </div>

                <div className="flex items-start gap-3 mb-5">
                  <span className="text-3xl">{q.emoji}</span>
                  <h3 className="font-['Outfit'] font-bold text-base sm:text-lg text-white leading-relaxed">{q.question}</h3>
                </div>

                <div className="space-y-2.5">
                  {q.options.map((opt, i) => {
                    const isSel = sel === i;
                    const isCorrect = i === q.correct;
                    const show = sel !== null;
                    let cls = "quiz-opt";
                    if (show && isCorrect) cls += " correct";
                    else if (show && isSel && !isCorrect) cls += " incorrect";

                    return (
                      <motion.button key={i} whileHover={sel === null ? { scale: 1.01 } : {}}
                        whileTap={sel === null ? { scale: .98 } : {}}
                        onClick={() => answer(i)} disabled={sel !== null}
                        className={`${cls} w-full text-left flex items-center gap-2.5 text-sm`}>
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            background: show && isCorrect ? "rgba(34,197,94,.15)" : show && isSel && !isCorrect ? "rgba(239,68,68,.15)" : "rgba(99,102,241,.1)",
                            color: show && isCorrect ? "#22c55e" : show && isSel && !isCorrect ? "#ef4444" : "#818cf8",
                          }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {show && isCorrect && <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}>✅</motion.span>}
                        {show && isSel && !isCorrect && <motion.span initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }}>❌</motion.span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation + Class Results */}
              <AnimatePresence>
                {showExp && (
                  <motion.div initial={{ opacity: 0, y: 15, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 15, height: 0 }} className="overflow-hidden">

                    <div className="glass p-4 rounded-2xl mb-3">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💡</span>
                        <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>

                    <div className="glass p-4 rounded-2xl mb-5">
                      <h4 className="font-bold text-[.7rem] text-slate-500 mb-3 flex items-center gap-1.5">
                        📊 Class Responses <span className="text-slate-600 font-normal">(simulated)</span>
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((opt, i) => {
                          const p = classResults[cur][i];
                          const isC = i === q.correct;
                          return (
                            <div key={i}>
                              <div className="flex justify-between text-[.65rem] mb-1">
                                <span className={isC ? "text-green-400 font-bold" : "text-slate-500"}>
                                  {String.fromCharCode(65 + i)}. {opt}
                                </span>
                                <span className={isC ? "text-green-400 font-bold" : "text-slate-500"}>{p}%</span>
                              </div>
                              <div className="pbar h-4">
                                <motion.div className="pfill text-[.55rem]"
                                  style={{ background: isC ? "linear-gradient(90deg,rgba(34,197,94,.45),rgba(6,182,212,.45))" : "rgba(99,102,241,.25)" }}
                                  initial={{ width: 0 }} animate={{ width: `${Math.max(p, 6)}%` }}
                                  transition={{ duration: .7, delay: i * .08 }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                        onClick={next} className="glow-btn px-7 py-2.5 text-sm">
                        {cur + 1 >= total ? "🏆 See Results" : "➡️ Next Question"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* COMPLETE */
            <motion.div key="done" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-2xl text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ duration: .5 }}
                className="text-6xl mb-5">
                {score >= 8 ? "🏆" : score >= 6 ? "🎉" : score >= 4 ? "💪" : "📚"}
              </motion.div>
              <h3 className="font-['Outfit'] font-black text-2xl grad-text mb-2">
                {score >= 8 ? "SQL JOIN Master!" : score >= 6 ? "Solid Work!" : score >= 4 ? "Getting There!" : "Keep Practicing!"}
              </h3>
              <p className="text-4xl font-black text-white mb-1">{score}/{total}</p>
              <p className="text-slate-500 text-sm mb-6">
                {score >= 8 ? "Jethalal would be proud of your SQL skills! 🤵" : score >= 6 ? "Bhide Sir gives you 7/10 — strong foundation!" : "Use the Visualizer to review and try again! 🔬"}
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{score}</div>
                  <div className="text-[.65rem] text-slate-500">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">{total - score}</div>
                  <div className="text-[.65rem] text-slate-500">Wrong</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-400">{Math.round(score / total * 100)}%</div>
                  <div className="text-[.65rem] text-slate-500">Accuracy</div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                onClick={reset} className="glow-btn px-7 py-2.5 text-sm">🔄 Retry</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
