import { motion } from "framer-motion";

export default function LandingHero({ onStart }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
      {/* Subtle accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="mb-6">
        <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-semibold glass text-indigo-300 tracking-wide">
          Interactive SQL Learning Platform
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}
        className="font-['Outfit'] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
        <span className="block grad-text">Understanding SQL Joins</span>
        <span className="block text-white/90 mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
          Through Interactive Visualization
        </span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
        className="text-base sm:text-lg text-slate-400 max-w-2xl mb-4 font-light leading-relaxed">
        Explore how SQL JOINs work with animated data tables, contextual storylines, and
        hands-on exercises. Learn <span className="text-white font-medium">when</span> and <span className="text-white font-medium">why</span> to use each join type — visually.
      </motion.p>

      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
        className="text-xs sm:text-sm text-slate-500 max-w-md mb-10">
        Featuring Gokuldham Society data, Gen-Z scenarios, interactive quizzes, and an AI-powered assistant.
      </motion.p>

      <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
        onClick={onStart} className="glow-btn text-base sm:text-lg px-12 py-4"
        id="start-exploring-btn">
        Start Exploring
      </motion.button>

      {/* Venn-diagram-inspired decoration */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 flex items-center justify-center select-none pointer-events-none">
        <motion.div animate={{ x: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-cyan-500/20"
          style={{ background: "rgba(6,182,212,.03)" }} />
        <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-pink-500/20 -ml-8 sm:-ml-12"
          style={{ background: "rgba(236,72,153,.03)" }} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="text-slate-600 text-xs flex flex-col items-center gap-1">
          <span className="tracking-wider uppercase text-[.6rem]">Scroll to explore</span>
          <span className="text-base">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
