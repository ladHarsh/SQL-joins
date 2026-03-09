import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-slate-800/40">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: .85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mb-4">
          <div className="inline-flex items-center relative h-14">
            <motion.div animate={{ x: [0,-3,0] }} transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-full border-2 border-cyan-500/30" style={{ background: "rgba(6,182,212,.03)" }} />
            <motion.div animate={{ x: [0,3,0] }} transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-full border-2 border-pink-500/30 -ml-5" style={{ background: "rgba(236,72,153,.03)" }} />
          </div>
        </motion.div>
        <p className="text-slate-500 text-xs mb-1">
          Built for interactive SQL JOIN learning
        </p>
        <p className="text-slate-700 text-[.65rem]">
          JOIN UNIVERSE • Interactive Learning Platform • {new Date().getFullYear()}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-[.6rem] text-slate-600">
          <span>100% Frontend</span>
          <span>•</span>
          <span>No Database Required</span>
          <span>•</span>
          <span>AI-Powered Assistance</span>
          <span>•</span>
          <span>Mobile Responsive</span>
        </div>
      </div>
    </footer>
  );
}
