# 🌌 JOIN UNIVERSE

> **Where Tables Discover Their Relationships**
> An interactive, gamified SQL JOIN learning experience built for live classroom presentations with 200+ Gen-Z interns.

## 🚀 Features

### 🔬 JOIN Visualizer Simulator
- **TMKOC themed dataset** — Residents (Jethalal, Daya, Taarak, Bhide, Popatlal, Sodhi, Iyer) × Professions
- Supports **7 JOIN types**: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF, NATURAL
- Animated row highlighting — matches (✓), exclusions (✗), NULL fills
- Result table with match/NULL/cross stats
- SQL syntax toggle for each JOIN
- Real-life analogy explanation per JOIN type

### 🧭 JOIN Decision Helper
- Interactive flowchart that asks questions about your data needs
- Recommends the correct JOIN type with explanation
- Visual progress tracking with back navigation

### ⚔️ JOIN Challenge (Quiz)
- 10 scenario-based questions with TMKOC & Gen-Z contexts
- Simulated live class response percentages
- Confetti on correct answers 🎊
- Score tracking with fun completion messages

### 📋 Visual Cheat Sheet
- Animated cards for all 7 JOIN types + UNION vs JOIN
- Quick Memory Hack grid
- Screenshot-friendly design

### 🤖 Ask JOIN Guru (AI Chat)
- Chat interface powered by **Gemini API** via secure serverless function
- Built-in fallback knowledge base works **100% offline**
- Suggested quick questions

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **React 19** | UI Framework |
| **Vite 5** | Build Tool |
| **Tailwind CSS 3** | Styling |
| **Framer Motion** | Animations |
| **Gemini API** | AI Chat (serverless) |
| **Vercel** | Deployment + Serverless |

## 📦 Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173/
npm run build      # Production build
```

## 🌐 Deploy to Vercel

```bash
# Add Gemini API key as environment variable in Vercel dashboard:
# GEMINI_API_KEY=your_key_here

npx vercel --prod
```

Or push to GitHub → Import at [vercel.com/new](https://vercel.com/new)

The AI chat works without the API key using the built-in knowledge base.

## 📁 Structure

```
sql/
├── api/
│   └── ask-ai.js              # Vercel serverless – Gemini proxy
├── src/
│   ├── components/
│   │   ├── AskAI.jsx           # AI chat + fallback
│   │   ├── CheatSheet.jsx      # Visual cheat sheet
│   │   ├── DecisionHelper.jsx  # JOIN decision wizard
│   │   ├── Footer.jsx
│   │   ├── JoinChallenge.jsx   # Quiz mode
│   │   ├── JoinVisualizer.jsx  # Core visualizer (7 types)
│   │   ├── LandingHero.jsx
│   │   ├── Navbar.jsx
│   │   └── Starfield.jsx
│   ├── data/
│   │   └── datasets.js         # TMKOC data, questions, cheat sheet
│   ├── utils/
│   │   └── joinEngine.js       # All 7 JOIN algorithms
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── vercel.json
└── package.json
```

## 📄 License

ISC
