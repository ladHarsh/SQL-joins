import { motion } from "framer-motion";

const navItems = [
  { id: "visualizer", label: "Visualizer" },
  { id: "decision",   label: "Decision Helper" },
  { id: "quiz",       label: "Challenge" },
  { id: "examples",   label: "Real World Examples" },
  { id: "ai",         label: "Ask Guru" },
];

export default function Navbar({ active, onNav }) {
  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5 }}
      className="fixed top-0 inset-x-0 z-50 glass rounded-none border-t-0 border-x-0"
      style={{ borderBottom: "1px solid rgba(99,102,241,.12)" }}>
      <div className="max-w-7xl mx-auto px-3 py-2.5 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.04 }} onClick={() => onNav("landing")}
          className="flex items-center gap-1.5 cursor-pointer select-none">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex-shrink-0" />
          <span className="font-['Outfit'] font-bold text-sm sm:text-base grad-text hidden sm:inline">JOIN UNIVERSE</span>
        </motion.div>
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
          {navItems.map(n => (
            <button key={n.id} onClick={() => onNav(n.id)}
              className={`nav-dot text-[.68rem] sm:text-xs ${active === n.id ? "active" : ""}`}>
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
