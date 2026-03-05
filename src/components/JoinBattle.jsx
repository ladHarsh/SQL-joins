import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/datasets";

// ======= JOIN BATTLE QUIZ =======
export default function JoinBattle() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // track all answers for stats
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const question = quizQuestions[currentQ];

  // Simulated class results (randomized per question for live feel)
  const classResults = useMemo(() => {
    return quizQuestions.map((q) => {
      const results = q.options.map((_, i) => {
        if (i === q.correct) return Math.floor(Math.random() * 30) + 50; // correct answer: 50-80%
        return Math.floor(Math.random() * 20) + 5; // wrong answers: 5-25%
      });
      const total = results.reduce((a, b) => a + b, 0);
      return results.map((r) => Math.round((r / total) * 100));
    });
  }, []);

  const spawnConfetti = useCallback(() => {
    const colors = ["#6c3aed", "#ff6bcd", "#00d4ff", "#00ff9d", "#ff9f43", "#ffca28"];
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${Math.random() * 2 + 1.5}s`,
      delay: `${Math.random() * 0.5}s`,
      size: Math.random() * 8 + 4,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3500);
  }, []);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === question.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      spawnConfetti();
    }

    setAnswers((prev) => [...prev, { questionId: question.id, selected: index, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  const progressPercent = ((currentQ + (selectedAnswer !== null ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="py-20 px-4 relative">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: piece.left,
            background: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            "--duration": piece.duration,
            "--delay": piece.delay,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading gradient-text-warm mb-3">
            ⚔️ Join Battle Arena
          </h2>
          <p className="text-cosmos-300 text-lg max-w-xl mx-auto">
            Test your SQL JOIN knowledge! Answer quick-fire questions
            and see how you compare with the class.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between text-xs text-cosmos-400 mb-2">
            <span>Question {currentQ + 1} of {quizQuestions.length}</span>
            <span>Score: {score}/{quizQuestions.length}</span>
          </div>
          <div className="percentage-bar">
            <motion.div
              className="percentage-fill"
              style={{ background: "linear-gradient(90deg, #6c3aed, #ff6bcd)" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Question Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{question.emoji}</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-relaxed">
                    {question.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === question.correct;
                    const showResult = selectedAnswer !== null;

                    let optionClass = "quiz-option";
                    if (showResult && isCorrect) optionClass += " correct";
                    else if (showResult && isSelected && !isCorrect)
                      optionClass += " incorrect";

                    return (
                      <motion.button
                        key={i}
                        whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                        onClick={() => handleAnswer(i)}
                        className={`${optionClass} w-full text-left flex items-center gap-3`}
                        id={`quiz-option-${currentQ}-${i}`}
                        disabled={selectedAnswer !== null}
                      >
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{
                            background:
                              showResult && isCorrect
                                ? "rgba(0, 255, 157, 0.2)"
                                : showResult && isSelected && !isCorrect
                                ? "rgba(255, 71, 87, 0.2)"
                                : "rgba(108, 58, 237, 0.15)",
                            color:
                              showResult && isCorrect
                                ? "#00ff9d"
                                : showResult && isSelected && !isCorrect
                                ? "#ff4757"
                                : "#9999ff",
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                          >
                            ✅
                          </motion.span>
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <motion.span
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                          >
                            ❌
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation + Class Results */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                    className="overflow-hidden"
                  >
                    {/* Explanation */}
                    <div className="glass-card p-5 rounded-2xl mb-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <p className="text-cosmos-200 leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Simulated Class Results */}
                    <div className="glass-card p-5 rounded-2xl mb-6">
                      <h4 className="font-display font-bold text-sm text-cosmos-300 mb-4 flex items-center gap-2">
                        📊 Live Class Responses
                        <span className="text-xs text-cosmos-500 font-normal">(simulated)</span>
                      </h4>
                      <div className="space-y-3">
                        {question.options.map((option, i) => {
                          const pct = classResults[currentQ][i];
                          const isCorrectOption = i === question.correct;

                          let fillColor = "rgba(108, 58, 237, 0.4)";
                          if (isCorrectOption) fillColor = "linear-gradient(90deg, rgba(0, 255, 157, 0.5), rgba(0, 212, 255, 0.5))";

                          return (
                            <div key={i}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className={isCorrectOption ? "text-green-400 font-bold" : "text-cosmos-400"}>
                                  {String.fromCharCode(65 + i)}. {option}
                                </span>
                                <span className={isCorrectOption ? "text-green-400 font-bold" : "text-cosmos-400"}>
                                  {pct}%
                                </span>
                              </div>
                              <div className="percentage-bar h-5">
                                <motion.div
                                  className="percentage-fill text-xs"
                                  style={{ background: fillColor }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.max(pct, 8)}%` }}
                                  transition={{ duration: 0.8, delay: i * 0.1 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Next Button */}
                    <motion.div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextQuestion}
                        className="glow-btn px-8 py-3"
                      >
                        {currentQ + 1 >= quizQuestions.length
                          ? "🏆 See Results"
                          : "➡️ Next Question"}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* QUIZ COMPLETE SCREEN */
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 sm:p-10 rounded-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.6 }}
                className="text-7xl mb-6"
              >
                {score >= 7 ? "🏆" : score >= 5 ? "🎉" : score >= 3 ? "💪" : "📚"}
              </motion.div>

              <h3 className="font-display font-black text-3xl gradient-text mb-3">
                {score >= 7
                  ? "SQL JOIN Master!"
                  : score >= 5
                  ? "Great Job!"
                  : score >= 3
                  ? "Nice Try!"
                  : "Keep Learning!"}
              </h3>

              <p className="text-5xl font-black text-white mb-2">
                {score}/{quizQuestions.length}
              </p>
              <p className="text-cosmos-400 mb-6">
                {score >= 7
                  ? "You've truly mastered the art of JOINs! 🌟"
                  : score >= 5
                  ? "Solid understanding! A bit more practice and you'll be unstoppable!"
                  : score >= 3
                  ? "You're getting there! Review the visualizer and try again!"
                  : "JOINs can be tricky! Use the visualizer to see them in action."}
              </p>

              {/* Score Breakdown */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-xs text-cosmos-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {quizQuestions.length - score}
                  </div>
                  <div className="text-xs text-cosmos-400">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nebula-blue">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <div className="text-xs text-cosmos-400">Accuracy</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="glow-btn px-8 py-3"
                id="retry-quiz-btn"
              >
                🔄 Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
