import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import JoinVisualizer from "./components/JoinVisualizer";
import JoinBattle from "./components/JoinBattle";
import RealLifeJoins from "./components/RealLifeJoins";
import AskAI from "./components/AskAI";
import Footer from "./components/Footer";

// ======= MAIN APP =======
export default function App() {
  const [started, setStarted] = useState(false);
  const [activeSection, setActiveSection] = useState("visualizer");

  // Section refs for scrolling
  const visualizerRef = useRef(null);
  const quizRef = useRef(null);
  const reallifeRef = useRef(null);
  const askAIRef = useRef(null);

  const sectionRefs = {
    visualizer: visualizerRef,
    quiz: quizRef,
    reallife: reallifeRef,
    askAI: askAIRef,
  };

  const handleStart = () => {
    setStarted(true);
    // Scroll to top of content after a brief animation delay
    setTimeout(() => {
      visualizerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleNavigate = (section) => {
    if (section === "landing") {
      setStarted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveSection(section);
    if (!started) setStarted(true);
    setTimeout(() => {
      sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Starfield />

      {/* Content */}
      <div className="relative z-10">
        {/* Landing */}
        <AnimatePresence>
          {!started && (
            <motion.div
              key="landing"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <LandingHero onStart={handleStart} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {started && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

              {/* Spacer for fixed navbar */}
              <div className="h-16" />

              <div ref={visualizerRef}>
                <JoinVisualizer />
              </div>

              {/* Divider */}
              <div className="max-w-4xl mx-auto px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-cosmos-700 to-transparent" />
              </div>

              <div ref={quizRef}>
                <JoinBattle />
              </div>

              {/* Divider */}
              <div className="max-w-4xl mx-auto px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-cosmos-700 to-transparent" />
              </div>

              <div ref={reallifeRef}>
                <RealLifeJoins />
              </div>

              {/* Divider */}
              <div className="max-w-4xl mx-auto px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-cosmos-700 to-transparent" />
              </div>

              <div ref={askAIRef}>
                <AskAI />
              </div>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
