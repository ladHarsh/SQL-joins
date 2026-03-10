import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import JoinVisualizer from "./components/JoinVisualizer";
import DecisionHelper from "./components/DecisionHelper";
import JoinChallenge from "./components/JoinChallenge";
import RealWorldExamples from "./components/RealWorldExamples";
import AskAI from "./components/AskAI";
import Footer from "./components/Footer";

export default function App() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState("visualizer");

  const refs = {
    visualizer: useRef(null),
    decision:   useRef(null),
    quiz:       useRef(null),
    examples:   useRef(null),
    ai:         useRef(null),
  };

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => refs.visualizer.current?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  const handleNav = (id) => {
    if (id === "landing") {
      setStarted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActive(id);
    if (!started) setStarted(true);
    setTimeout(() => refs[id]?.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const divider = (
    <div className="max-w-3xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <Starfield />
      <div className="relative z-10">
        <AnimatePresence>
          {!started && (
            <motion.div key="land" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: .4 }}>
              <LandingHero onStart={handleStart} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {started && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .15 }}>
              <Navbar active={active} onNav={handleNav} />
              <div className="h-14" />

              <div ref={refs.visualizer}><JoinVisualizer /></div>
              {divider}
              <div ref={refs.decision}><DecisionHelper /></div>
              {divider}
              <div ref={refs.quiz}><JoinChallenge /></div>
              {divider}
              <div ref={refs.examples}><RealWorldExamples /></div>
              {divider}
              <div ref={refs.ai}><AskAI /></div>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
