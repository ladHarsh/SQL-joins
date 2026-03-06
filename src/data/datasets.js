// ====================================================
//  JOIN UNIVERSE — TMKOC + Gen-Z Themed Datasets
// ====================================================

// ─── PRIMARY DATASET: Taarak Mehta Residents ──────
export const residents = [
  { id: 1, name: "Jethalal",   emoji: "🤵", flat: "A1", society: "Gokuldham" },
  { id: 2, name: "Daya",       emoji: "💃", flat: "A1", society: "Gokuldham" },
  { id: 3, name: "Taarak",     emoji: "🧠", flat: "A2", society: "Gokuldham" },
  { id: 4, name: "Bhide",      emoji: "📏", flat: "B1", society: "Gokuldham" },
  { id: 5, name: "Popatlal",   emoji: "📰", flat: "B2", society: "Gokuldham" },
  { id: 6, name: "Sodhi",      emoji: "🎉", flat: "C1", society: "Gokuldham" },
  { id: 7, name: "Iyer",       emoji: "🔬", flat: "C2", society: "Gokuldham" },
];

export const professions = [
  { id: 101, resident_id: 1, profession: "Electronics Shop Owner", icon: "🏪" },
  { id: 102, resident_id: 3, profession: "Patent Lawyer",         icon: "⚖️" },
  { id: 103, resident_id: 4, profession: "School Teacher",        icon: "🏫" },
  { id: 104, resident_id: 5, profession: "Newspaper Reporter",    icon: "📰" },
  { id: 105, resident_id: 7, profession: "Scientist at ISRO",     icon: "🚀" },
  { id: 106, resident_id: 8, profession: "Doctor (Unknown)",      icon: "🩺" },
];

// ─── SELF-JOIN: Friendships within residents ──────
export const friendships = [
  { resident_id: 1, best_friend_id: 3, label: "Business buddies" },
  { resident_id: 3, best_friend_id: 1, label: "Intellectual rivals" },
  { resident_id: 4, best_friend_id: 6, label: "Neighbours" },
  { resident_id: 5, best_friend_id: 5, label: "Popatlal is his own best friend 😢" },
  { resident_id: 6, best_friend_id: 4, label: "Party + Discipline combo" },
];

// ─── CROSS-JOIN: Society Events ──────
export const events = [
  { id: 1, event: "Garba Night 💃" },
  { id: 2, event: "Cricket Match 🏏" },
  { id: 3, event: "Holi Party 🎨" },
];

// ─── NATURAL JOIN DATASET ──────
export const studentRecords = [
  { student_name: "Tapu",  grade: "10th", score: 45 },
  { student_name: "Goli",  grade: "10th", score: 72 },
  { student_name: "Sonu",  grade: "10th", score: 95 },
];

export const gradeInfo = [
  { grade: "10th", teacher: "Bhide Sir 📏", subject: "Maths" },
  { grade: "11th", teacher: "New Teacher 🧑‍🏫", subject: "Physics" },
];


// ====================================================
//  JOIN TYPE INFO — Explanations, Analogies, SQL
// ====================================================
export const joinDescriptions = {
  INNER: {
    name: "INNER JOIN",
    icon: "🎯",
    color: "#06b6d4",
    tagline: "Only the matches survive",
    shortDesc: "Returns rows that have matching values in BOTH tables.",
    realLife: "Only Gokuldham residents who have a known profession show up. Daya & Sodhi? Sorry, no profession entry — they're OUT!",
    sql: "SELECT * FROM residents\nINNER JOIN professions\nON residents.id = professions.resident_id;",
    rule: "Both tables must agree ✅",
    vennHighlight: "intersection",
  },
  LEFT: {
    name: "LEFT JOIN",
    icon: "⬅️",
    color: "#22c55e",
    tagline: "Left table is the boss",
    shortDesc: "Returns ALL rows from left table + matches from right. Unmatched = NULL.",
    realLife: "ALL residents are shown, even if we don't know their profession. Daya shows up with profession = NULL (she's busy with Garba 💃).",
    sql: "SELECT * FROM residents\nLEFT JOIN professions\nON residents.id = professions.resident_id;",
    rule: "Left table → ALL rows, right → only matches",
    vennHighlight: "left",
  },
  RIGHT: {
    name: "RIGHT JOIN",
    icon: "➡️",
    color: "#ec4899",
    tagline: "Right table is the boss",
    shortDesc: "Returns ALL rows from right table + matches from left. Unmatched = NULL.",
    realLife: "ALL professions listed, even 'Doctor (id=8)' who has no matching resident. The mystery doctor shows with resident = NULL! 🩺👻",
    sql: "SELECT * FROM residents\nRIGHT JOIN professions\nON residents.id = professions.resident_id;",
    rule: "Right table → ALL rows, left → only matches",
    vennHighlight: "right",
  },
  FULL: {
    name: "FULL OUTER JOIN",
    icon: "🔄",
    color: "#f59e0b",
    tagline: "Everyone's invited!",
    shortDesc: "Returns ALL rows from BOTH tables. NULLs fill the gaps.",
    realLife: "Every resident AND every profession shows up. No match? Fill with NULL. It's the Gokuldham reunion — nobody gets left behind! 🎉",
    sql: "SELECT * FROM residents\nFULL OUTER JOIN professions\nON residents.id = professions.resident_id;",
    rule: "Both tables → ALL rows, gaps filled with NULL",
    vennHighlight: "full",
  },
  CROSS: {
    name: "CROSS JOIN",
    icon: "✖️",
    color: "#8b5cf6",
    tagline: "Every possible combo!",
    shortDesc: "Returns the Cartesian product — every row from A paired with every row from B.",
    realLife: `Every resident × every society event. Jethalal at Garba? ✅ Bhide at Cricket? ✅ That's ${7} × ${3} = ${7*3} rows! Everyone goes everywhere.`,
    sql: "SELECT * FROM residents\nCROSS JOIN events;",
    rule: "Rows = Left count × Right count",
    vennHighlight: "cross",
  },
  SELF: {
    name: "SELF JOIN",
    icon: "🪞",
    color: "#f43f5e",
    tagline: "Table meets itself",
    shortDesc: "A table is joined with itself — useful for hierarchies & relationships within the same data.",
    realLife: "Who is whose best friend in Gokuldham? Join the residents table with ITSELF! Popatlal's best friend is... Popatlal 😢",
    sql: "SELECT a.name, b.name AS best_friend\nFROM residents a\nJOIN friendships f ON a.id = f.resident_id\nJOIN residents b ON f.best_friend_id = b.id;",
    rule: "Same table, aliased as A & B",
    vennHighlight: "self",
  },
  NATURAL: {
    name: "NATURAL JOIN",
    icon: "🌿",
    color: "#14b8a6",
    tagline: "Auto-match common columns",
    shortDesc: "Automatically joins on columns with the SAME name in both tables. No ON clause needed!",
    realLife: "Students and grade info share a 'grade' column. SQL automatically matches them — Tapu, Goli, Sonu all link to Bhide Sir!",
    sql: "SELECT * FROM studentRecords\nNATURAL JOIN gradeInfo;",
    rule: 'Auto-match on shared column names',
    vennHighlight: "natural",
  },
};


// ====================================================
//  QUIZ QUESTIONS — TMKOC + Gen-Z Scenarios
// ====================================================
export const quizQuestions = [
  {
    id: 1,
    emoji: "🎯",
    scenario: "Jethalal wants to see ONLY residents who have a profession listed.",
    question: "Which JOIN should he use?",
    options: ["INNER JOIN", "LEFT JOIN", "FULL JOIN", "CROSS JOIN"],
    correct: 0,
    explanation: "INNER JOIN! Only rows matching in BOTH tables show up. No profession = no entry. 🎯",
  },
  {
    id: 2,
    emoji: "⬅️",
    scenario: "Bhide Sir is taking attendance. He wants ALL residents listed, even if their profession is unknown.",
    question: "Which JOIN ensures no resident is missed?",
    options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "SELF JOIN"],
    correct: 2,
    explanation: "LEFT JOIN! All residents (left table) appear. Unknown profession? That's a NULL, not absence! 📋",
  },
  {
    id: 3,
    emoji: "📸",
    scenario: "You follow 500 people on Instagram. Some have posted stories, some haven't.",
    question: "To see your feed (only people who posted), which JOIN matches?",
    options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "INNER JOIN! Your feed shows only followed accounts that also have posts. No post = no show! 📱",
  },
  {
    id: 4,
    emoji: "✖️",
    scenario: "Gokuldham is planning events. They need every resident paired with every event for the schedule.",
    question: "Which JOIN creates ALL possible resident-event pairs?",
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "NATURAL JOIN"],
    correct: 2,
    explanation: "CROSS JOIN! Every resident × every event = all possible combos. 7 residents × 3 events = 21 rows! 🎪",
  },
  {
    id: 5,
    emoji: "🪞",
    scenario: "Popatlal wants to know who is whose best friend within Gokuldham residents.",
    question: "Which JOIN can find relationships WITHIN the same table?",
    options: ["LEFT JOIN", "RIGHT JOIN", "SELF JOIN", "FULL JOIN"],
    correct: 2,
    explanation: "SELF JOIN! The table joins itself with aliases. Spoiler: Popatlal's best friend is... himself. 😅",
  },
  {
    id: 6,
    emoji: "🎮",
    scenario: "In your college, ALL students are listed. Some have joined clubs, some haven't. You want the COMPLETE picture.",
    question: "Which JOIN keeps everyone from BOTH tables?",
    options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
    correct: 2,
    explanation: "FULL OUTER JOIN! Every student AND every club shows up. No match? NULL fills the gap. Nobody's left out! 🎓",
  },
  {
    id: 7,
    emoji: "🌿",
    scenario: "Two tables share a column called 'grade'. You want SQL to auto-detect and join on it.",
    question: "Which JOIN does this automatically?",
    options: ["INNER JOIN", "NATURAL JOIN", "SELF JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "NATURAL JOIN! It auto-matches columns with the same name. No ON clause needed — SQL figures it out! 🧠",
  },
  {
    id: 8,
    emoji: "➡️",
    scenario: "A company HR has a list of job roles. Some roles are vacant (no employee). They want ALL roles visible.",
    question: "Which JOIN ensures all roles from the right table appear?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "SELF JOIN"],
    correct: 1,
    explanation: "RIGHT JOIN! All roles (right table) appear, even vacant ones. Employee column = NULL for unfilled roles. 💼",
  },
  {
    id: 9,
    emoji: "🔢",
    scenario: "Table A has 5 rows, Table B has 4 rows, and 3 rows match between them.",
    question: "How many rows does INNER JOIN return?",
    options: ["9", "5", "3", "20"],
    correct: 2,
    explanation: "INNER JOIN returns ONLY matching rows. 3 matches = 3 rows. Not adding, not multiplying — just matching! 🎯",
  },
  {
    id: 10,
    emoji: "💡",
    scenario: "You want to combine results from two queries that have the same columns, removing duplicates.",
    question: "This sounds like…",
    options: ["INNER JOIN", "UNION", "CROSS JOIN", "LEFT JOIN"],
    correct: 1,
    explanation: "UNION! It stacks results vertically and removes duplicates. JOIN combines horizontally. Big difference! 📊",
  },
];


// ====================================================
//  DECISION HELPER — flowchart logic
// ====================================================
export const decisionTree = [
  {
    id: "q1",
    question: "Do you want rows from BOTH tables or just ONE?",
    options: [
      { label: "Both tables", next: "q2" },
      { label: "Mainly one table", next: "q3" },
      { label: "All possible combos", result: "CROSS" },
      { label: "Relationships within same table", result: "SELF" },
    ],
  },
  {
    id: "q2",
    question: "Should ONLY matching rows appear, or ALL rows (with NULLs for gaps)?",
    options: [
      { label: "Only matching rows", result: "INNER" },
      { label: "ALL rows from both, fill gaps with NULL", result: "FULL" },
      { label: "Auto-match by shared column names", result: "NATURAL" },
    ],
  },
  {
    id: "q3",
    question: "Which table should show ALL its rows?",
    options: [
      { label: "The LEFT (first) table", result: "LEFT" },
      { label: "The RIGHT (second) table", result: "RIGHT" },
    ],
  },
];


// ====================================================
//  CHEAT SHEET DATA
// ====================================================
export const cheatSheetItems = [
  { type: "INNER",   rule: "Only matches",          icon: "🎯", color: "#06b6d4", mnemonic: "Both tables must agree" },
  { type: "LEFT",    rule: "Left table = boss",      icon: "⬅️", color: "#22c55e", mnemonic: "All left + matches from right" },
  { type: "RIGHT",   rule: "Right table = boss",     icon: "➡️", color: "#ec4899", mnemonic: "All right + matches from left" },
  { type: "FULL",    rule: "Keep everything",         icon: "🔄", color: "#f59e0b", mnemonic: "All rows, NULLs fill gaps" },
  { type: "CROSS",   rule: "All combos (A × B)",      icon: "✖️", color: "#8b5cf6", mnemonic: "Every row paired with every row" },
  { type: "SELF",    rule: "Table joins itself",      icon: "🪞", color: "#f43f5e", mnemonic: "Same table, different aliases" },
  { type: "NATURAL", rule: "Auto-match columns",      icon: "🌿", color: "#14b8a6", mnemonic: "No ON clause needed" },
];
