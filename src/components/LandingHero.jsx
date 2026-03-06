import { motion } from "framer-motion";

export default function LandingHero({ onStart }) {
  const floaters = [
    { emoji: "📊", style: { top: "12%", left: "8%" },  anim: { y: [0,-18,0], rotate: [0,6,0] }, dur: 5.5 },
    { emoji: "🗃️", style: { top: "18%", right: "7%" }, anim: { y: [0,14,0], rotate: [0,-5,0] }, dur: 4.8, delay: 1 },
    { emoji: "🔗", style: { bottom: "22%", left: "12%" }, anim: { y: [0,-12,0] }, dur: 6, delay: 2 },
    { emoji: "🧩", style: { bottom: "18%", right: "10%" }, anim: { y: [0,16,0], rotate: [0,-7,0] }, dur: 5, delay: .5 },
    { emoji: "🏪", style: { top: "40%", left: "3%" }, anim: { y: [0,10,0] }, dur: 7, delay: 1.5 },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
      {floaters.map((f, i) => (
        <motion.div key={i}
          className="absolute text-4xl sm:text-6xl opacity-15 select-none"
          style={f.style}
          animate={f.anim}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay || 0 }}
        >{f.emoji}</motion.div>
      ))}

      <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5 }}
        className="mb-5">
        <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-semibold glass text-indigo-300">
          🚀 Interactive SQL Learning — No Boring Slides
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }}
        className="font-['Outfit'] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-5">
        <span className="block grad-text">Welcome to</span>
        <span className="block text-white mt-1">JOIN UNIVERSE</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .4 }}
        className="text-base sm:text-xl text-slate-400 max-w-xl mb-3 font-light">
        Where Tables Discover Their <span className="grad-warm font-bold">Relationships</span>
      </motion.p>

      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .6 }}
        className="text-xs sm:text-sm text-slate-500 max-w-md mb-10">
        Master SQL JOINs with TMKOC vibes 🏘️, Gen-Z humor 😂, and zero snoozefest energy. Ready?
      </motion.p>

      <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .8 }}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: .95 }}
        onClick={onStart} className="glow-btn text-base sm:text-lg px-10 py-4"
        id="start-learning-btn">
        🚀 Start Learning
      </motion.button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-6">
        <motion.div animate={{ y: [0,8,0] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="text-slate-500 text-xs flex flex-col items-center gap-1">
          <span>Scroll to explore</span><span className="text-lg">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
