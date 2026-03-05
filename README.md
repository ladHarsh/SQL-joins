# SQL JOIN Universe 🌌

> **Where Tables Discover Their Relationships**  
> An interactive, gamified web experience for learning SQL JOINs — built for live classroom presentations.

![Landing Page](./screenshots/landing.png)

## 🚀 Features

### 🔬 Interactive JOIN Visualizer
- Two animated data tables (Students & Courses, Heroes & Sidekicks)
- Click INNER, LEFT, RIGHT, or FULL JOIN buttons
- Watch rows animate: match (✓), exclude (✗), or fill with NULL
- Result table shows exactly what each JOIN produces
- Toggle SQL syntax view

### ⚔️ Join Battle Quiz
- 8 interactive quiz questions about SQL JOINs
- Instant feedback with explanations
- Simulated live class response percentages
- Confetti animations on correct answers! 🎊
- Score tracking with fun completion messages

### 😂 Real-Life JOINs
- 6 humorous real-world analogies for each JOIN type
- Dating App (INNER JOIN), Group Project (LEFT JOIN), etc.
- Expandable cards with meme-style quotes
- Color-coded by JOIN type

### 🤖 Ask AI
- Chat interface for SQL JOIN questions
- Supports Gemini API (optional)
- Built-in fallback knowledge base works offline
- Suggested quick questions

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **React 19** | UI framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Gemini API** | AI explanations (optional) |

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — just deploy!

Or use the CLI:
```bash
npx vercel --prod
```

## 📁 Project Structure

```
sql/
├── public/
│   └── vite.svg              # Favicon
├── src/
│   ├── components/
│   │   ├── AskAI.jsx         # AI chat with Gemini integration
│   │   ├── Footer.jsx        # Animated footer
│   │   ├── JoinBattle.jsx    # Quiz mode
│   │   ├── JoinVisualizer.jsx # Core JOIN visualizer
│   │   ├── LandingHero.jsx   # Landing screen
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── RealLifeJoins.jsx # Humorous examples
│   │   └── Starfield.jsx     # Background animation
│   ├── data/
│   │   └── datasets.js       # All data, questions, examples
│   ├── utils/
│   │   └── joinEngine.js     # INNER/LEFT/RIGHT/FULL JOIN logic
│   ├── App.jsx               # Main app orchestrator
│   ├── index.css             # Global styles & design system
│   └── main.jsx              # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

## 🎯 Design Philosophy

- **No databases** — All data is JSON in the frontend
- **No heavy backend** — Pure static site via CDN
- **Mobile responsive** — Works on phones for 200+ concurrent users
- **Presentation-ready** — Bold headings, clear animations, dark cosmic theme
- **Graceful degradation** — AI features work without API key

## 📄 License

ISC
