import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { decisionTree, joinDescriptions } from "../data/datasets";

export default function DecisionHelper() {
  const [currentId, setCurrentId] = useState("q1");
  const [resultType, setResultType] = useState(null);
  const [history, setHistory] = useState([]);

  const currentNode = decisionTree.find(n => n.id === currentId);
  const resultInfo = resultType ? joinDescriptions[resultType] : null;

  const handleOption = (opt) => {
    if (opt.result) {
      setResultType(opt.result);
      setHistory(prev => [...prev, currentId]);
    } else if (opt.next) {
      setHistory(prev => [...prev, currentId]);
      setCurrentId(opt.next);
    }
  };

  const reset = () => {
    setCurrentId("q1");
    setResultType(null);
    setHistory([]);
  };

  const goBack = () => {
    if (resultType) {
      setResultType(null);
      return;
    }
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrentId(prev);
    }
  };

  return (
    <section id="decision" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="sec-head grad-text mb-2">🧭 JOIN Decision Helper</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Not sure which JOIN to use? Answer a few quick questions and we'll tell you! 🎯
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!resultType ? (
            <motion.div key={currentId}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="glass p-6 sm:p-8 rounded-2xl">

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {decisionTree.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i <= history.length ? "bg-indigo-500 scale-110" : "bg-slate-700"
                  }`} />
                ))}
              </div>

              <div className="flex items-start gap-3 mb-6">
                <span className="text-3xl">🤔</span>
                <h3 className="font-['Outfit'] font-bold text-lg text-white leading-relaxed">
                  {currentNode?.question}
                </h3>
              </div>

              <div className="space-y-3">
                {currentNode?.options.map((opt, i) => (
                  <motion.button key={i}
                    whileHover={{ scale: 1.01, x: 4 }} whileTap={{ scale: .98 }}
                    onClick={() => handleOption(opt)}
                    className="quiz-opt w-full text-left flex items-center gap-3 text-sm">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-slate-200">{opt.label}</span>
                    <span className="ml-auto text-slate-600">→</span>
                  </motion.button>
                ))}
              </div>

              {history.length > 0 && (
                <button onClick={goBack} className="mt-4 text-xs text-slate-500 hover:text-white transition-colors">
                  ← Go back
                </button>
              )}
            </motion.div>
          ) : (
            /* RESULT */
            <motion.div key="result"
              initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}
              className="glass p-6 sm:p-8 rounded-2xl text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: .5 }}
                className="text-5xl mb-4">{resultInfo.icon}</motion.div>

              <h3 className="font-['Outfit'] font-black text-2xl mb-1" style={{ color: resultInfo.color }}>
                Use {resultInfo.name}!
              </h3>
              <p className="text-slate-400 text-sm italic mb-4">{resultInfo.tagline}</p>

              <div className="glass p-4 rounded-xl text-left mb-4">
                <p className="text-sm text-slate-300 mb-2">{resultInfo.shortDesc}</p>
                <p className="text-xs text-slate-500 italic">🏘️ {resultInfo.realLife}</p>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm font-bold mb-6"
                style={{ color: resultInfo.color }}>
                <span className="px-3 py-1.5 rounded-lg text-xs" style={{ background: `${resultInfo.color}15`, border: `1px solid ${resultInfo.color}30` }}>
                  {resultInfo.rule}
                </span>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                  onClick={reset} className="glow-btn px-6 py-2.5 text-sm">
                  🔄 Try Again
                </motion.button>
                <button onClick={goBack}
                  className="px-5 py-2.5 rounded-xl text-sm glass text-slate-400 hover:text-white transition-colors font-semibold">
                  ← Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
