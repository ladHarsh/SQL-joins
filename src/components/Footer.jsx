import { motion } from "framer-motion";

// ======= FOOTER =======
export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-cosmos-800/50 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Venn Diagram Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-0 relative h-16">
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 rounded-full border-2 border-nebula-blue/40"
              style={{ background: "rgba(0,212,255,0.05)" }}
            />
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 rounded-full border-2 border-nebula-pink/40 -ml-6"
              style={{ background: "rgba(255,107,205,0.05)" }}
            />
          </div>
        </motion.div>

        <p className="text-cosmos-400 text-sm mb-2">
          Built with 💜 for the most fun SQL lesson ever
        </p>
        <p className="text-cosmos-600 text-xs">
          SQL JOIN Universe • Interactive Learning Experience • {new Date().getFullYear()}
        </p>

        {/* Fun footer facts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-cosmos-500"
        >
          <span>📊 No databases were harmed in making this</span>
          <span>•</span>
          <span>🚀 100% Frontend Magic</span>
          <span>•</span>
          <span>🎮 Learning should be fun!</span>
        </motion.div>
      </div>
    </footer>
  );
}
