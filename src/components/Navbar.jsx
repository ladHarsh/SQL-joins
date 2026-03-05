import { motion } from "framer-motion";

// ======= NAVIGATION BAR =======
const sections = [
  { id: "visualizer", label: "🔬 Visualizer", emoji: "🔬" },
  { id: "quiz", label: "⚔️ Join Battle", emoji: "⚔️" },
  { id: "reallife", label: "😂 Real-Life", emoji: "😂" },
  { id: "askAI", label: "🤖 Ask AI", emoji: "🤖" },
];

export default function Navbar({ activeSection, onNavigate }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-l-0 border-r-0 rounded-none"
      style={{ borderBottom: "1px solid rgba(108, 58, 237, 0.2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          onClick={() => onNavigate("landing")}
        >
          <span className="text-2xl">🌌</span>
          <span className="font-display font-bold text-lg gradient-text hidden sm:inline">
            JOIN Universe
          </span>
        </motion.div>

        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(section.id)}
              className={`nav-link text-xs sm:text-sm ${
                activeSection === section.id ? "active" : ""
              }`}
            >
              <span className="sm:hidden">{section.emoji}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
