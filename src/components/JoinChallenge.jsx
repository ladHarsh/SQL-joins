import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/datasets";

export default function JoinChallenge() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return; // already answered
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const scoreLabel = () => {
    if (score === 5) return "Perfect Score! You're a JOIN Pro! 🏆";
    if (score >= 3)  return "Great work! Keep it up! 💪";
    return "Keep practicing — you'll get there! 📚";
  };

  return (
    <section id="quiz" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8">
          <h2 className="sec-head grad-warm mb-2">JOIN Challenge</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            5 realistic SQL JOIN scenarios. Pick the right join type and get instant feedback.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={current}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: .3 }}
              className="glass p-6 sm:p-8 rounded-2xl">

              {/* Progress */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[.65rem] text-slate-500 font-semibold uppercase tracking-wider">
                  Question {current + 1} of {quizQuestions.length}
                </span>
                <span className="text-[.65rem] text-indigo-400 font-semibold">
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(current / quizQuestions.length) * 100}%` }}
                  transition={{ duration: .5 }}
                />
              </div>

              {/* Scenario */}
              <div className="glass p-4 rounded-xl mb-5">
                <p className="text-[.65rem] text-indigo-400 font-semibold uppercase tracking-wider mb-2">
                  {q.emoji} Scenario
                </p>
                <p className="text-slate-200 text-sm leading-relaxed">{q.scenario}</p>
              </div>

              {/* Question */}
              <p className="font-['Outfit'] font-bold text-base text-white mb-4">{q.question}</p>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {q.options.map((opt, idx) => {
                  let cls = "quiz-opt w-full text-left flex items-center gap-3 text-sm";
                  if (selected !== null) {
                    if (idx === q.correct)  cls += " correct";
                    else if (idx === selected && idx !== q.correct) cls += " incorrect";
                  }
                  return (
                    <motion.button key={idx}
                      whileHover={selected === null ? { x: 4 } : {}}
                      whileTap={selected === null ? { scale: .98 } : {}}
                      onClick={() => handleSelect(idx)}
                      className={cls}
                      disabled={selected !== null}>
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        selected !== null && idx === q.correct ? "bg-green-500/20 text-green-400" :
                        selected !== null && idx === selected && idx !== q.correct ? "bg-red-500/20 text-red-400" :
                        "bg-indigo-500/10 text-indigo-400"
                      }`}>
                        {selected !== null && idx === q.correct ? "✓" :
                         selected !== null && idx === selected ? "✗" :
                         String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-slate-200">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    className={`rounded-xl p-3 mb-4 text-sm ${
                      selected === q.correct
                        ? "bg-green-500/10 border border-green-500/30 text-green-300"
                        : "bg-red-500/10 border border-red-500/30 text-red-300"
                    }`}>
                    <p className="font-bold mb-1">{selected === q.correct ? "✓ Correct!" : "✗ Incorrect"}</p>
                    <p className="text-[.8rem] leading-relaxed text-slate-300">{q.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {selected !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                    onClick={handleNext}
                    className="glow-btn px-6 py-2.5 text-sm">
                    {current + 1 >= quizQuestions.length ? "See Results" : "Next Question →"}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Completion screen */
            <motion.div key="done"
              initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-2xl text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: .5 }}
                className="text-5xl mb-4">
                {score === 5 ? "🏆" : score >= 3 ? "🎉" : "📚"}
              </motion.div>
              <h3 className="font-['Outfit'] font-black text-2xl text-white mb-2">{scoreLabel()}</h3>
              <p className="text-slate-400 text-sm mb-6">
                You scored <span className="text-indigo-400 font-bold text-lg">{score}</span> out of{" "}
                <span className="text-white font-bold">{quizQuestions.length}</span>
              </p>

              {/* Score breakdown */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {quizQuestions.map((_, i) => (
                  <div key={i} className={`py-2 rounded-xl text-xs font-bold ${
                    i < score ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>Q{i + 1}<br />{i < score ? "✓" : "✗"}</div>
                ))}
              </div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                onClick={handleRestart} className="glow-btn px-8 py-3">
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
