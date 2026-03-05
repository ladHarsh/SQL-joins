import { motion } from "framer-motion";

// ======= LANDING / HERO SECTION =======
export default function LandingHero({ onStart }) {
  return (
    <section
      id="landing"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center"
    >
      {/* Floating decorative elements */}
      <motion.div
        className="absolute text-6xl sm:text-8xl opacity-20"
        style={{ top: "15%", left: "10%" }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        📊
      </motion.div>
      <motion.div
        className="absolute text-5xl sm:text-7xl opacity-20"
        style={{ top: "20%", right: "8%" }}
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🗃️
      </motion.div>
      <motion.div
        className="absolute text-4xl sm:text-6xl opacity-15"
        style={{ bottom: "20%", left: "15%" }}
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🔗
      </motion.div>
      <motion.div
        className="absolute text-5xl sm:text-7xl opacity-15"
        style={{ bottom: "25%", right: "12%" }}
        animate={{ y: [0, 20, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🧩
      </motion.div>

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="inline-block px-5 py-2 rounded-full text-sm font-medium glass-card text-cosmos-300 border border-cosmos-400/30">
          🚀 Interactive SQL Learning Experience
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6"
      >
        <span className="block gradient-text">Welcome to</span>
        <span className="block mt-2" style={{ color: "#fff" }}>
          JOIN Universe
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg sm:text-xl md:text-2xl text-cosmos-300 max-w-2xl mb-4 font-light"
      >
        Where Tables Discover Their{" "}
        <span className="gradient-text-warm font-semibold">Relationships</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-sm sm:text-base text-cosmos-400 max-w-lg mb-10"
      >
        Master SQL JOINs through stunning visualizations, interactive quizzes,
        and real-life memes. No boring slides. Just fun. 🎮
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="glow-btn text-lg px-10 py-4 font-display"
        id="start-experience-btn"
      >
        🚀 Start Experience
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-cosmos-400 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <span className="text-xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
