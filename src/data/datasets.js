// ====================================================
//  JOIN UNIVERSE — TMKOC Story-Based + Gen-Z Datasets
// ====================================================

// ─── PRIMARY DATASET: Gokuldham Society Residents ──────
export const residents = [
  { id: 1, name: "Jethalal",   emoji: "🤵", flat: "A1" },
  { id: 2, name: "Daya",       emoji: "💃", flat: "A1" },
  { id: 3, name: "Taarak",     emoji: "🧠", flat: "A2" },
  { id: 4, name: "Bhide",      emoji: "📏", flat: "B1" },
  { id: 5, name: "Popatlal",   emoji: "📰", flat: "B2" },
  { id: 6, name: "Sodhi",      emoji: "🎉", flat: "C1" },
  { id: 7, name: "Iyer",       emoji: "🔬", flat: "C2" },
];

// ─── NEW: Society Events with Roles ──────
export const societyEvents = [
  { id: 201, resident_id: 1, event_role: "Garba Night Sponsor",      icon: "💰" },
  { id: 202, resident_id: 3, event_role: "Debate Competition Judge",  icon: "⚖️" },
  { id: 203, resident_id: 4, event_role: "Society Secretary",         icon: "📋" },
  { id: 204, resident_id: 5, event_role: "Event Photographer",        icon: "📸" },
  { id: 205, resident_id: 7, event_role: "Science Fair Organizer",    icon: "🧪" },
  { id: 206, resident_id: 8, event_role: "Cricket Team Captain",      icon: "🏏" },
];

// ─── Storyline descriptions for each join result ──────
export const storyDescriptions = {
  INNER: {
    summary: "Only residents who actually signed up for an event role appear here. If you didn't volunteer, you're not on the list!",
    perRow: {
      1: "Jethalal is sponsoring Garba Night — obviously he's paying for everything.",
      3: "Taarak Mehta is judging the debate — who else could argue so well?",
      4: "Bhide is the Society Secretary — rules and discipline are his thing.",
      5: "Popatlal is the photographer — still hoping to find a match at the event.",
      7: "Iyer is organizing the science fair — rockets and atoms, his comfort zone.",
    },
    nullStory: null,
  },
  LEFT: {
    summary: "Every resident is shown, even if they didn't sign up for any event. No one escapes the attendance register!",
    perRow: {
      1: "Jethalal — sponsoring Garba Night, wallet ready.",
      2: "Daya — no event role assigned. She's busy preparing for Garba on her own!",
      3: "Taarak — judging the debate competition.",
      4: "Bhide — managing everything as Society Secretary.",
      5: "Popatlal — clicking photos, hoping to impress someone.",
      6: "Sodhi — no event role. Probably decorating his own flat instead.",
      7: "Iyer — in charge of the science fair.",
    },
    nullStory: "No event role? That's NULL. They exist in the society but didn't volunteer for anything.",
  },
  RIGHT: {
    summary: "Every event role is listed, even if no resident is assigned to it. The Cricket Team Captain slot exists but nobody claimed it!",
    perRow: {
      1: "Jethalal matched → Garba Night Sponsor.",
      3: "Taarak matched → Debate Judge.",
      4: "Bhide matched → Society Secretary.",
      5: "Popatlal matched → Event Photographer.",
      7: "Iyer matched → Science Fair Organizer.",
    },
    nullStory: "The Cricket Team Captain role (resident_id = 8) has no matching resident — it's a ghost position! NULL on the left side.",
  },
  FULL: {
    summary: "Absolutely everyone and every role shows up. Residents without roles get NULL for event. Roles without residents get NULL for name. The ultimate Gokuldham reunion!",
    perRow: {
      1: "Jethalal ↔ Garba Sponsor — matched!",
      2: "Daya — present but no role (NULL event).",
      3: "Taarak ↔ Debate Judge — matched!",
      4: "Bhide ↔ Secretary — matched!",
      5: "Popatlal ↔ Photographer — matched!",
      6: "Sodhi — present but no role (NULL event).",
      7: "Iyer ↔ Science Fair — matched!",
    },
    nullStory: "Both unmatched residents AND unmatched roles appear. NULL fills whatever side is missing.",
  },
  CROSS: {
    summary: "Every resident is paired with every event — like assigning everyone to every possible role. Chaos, but complete!",
    perRow: {},
    nullStory: null,
  },
  SELF: {
    summary: "The residents table joins itself to find who is whose best friend. Some friendships go both ways, and one is hilariously one-sided.",
    perRow: {
      1: "Jethalal's best friend is Taarak — business buddies through thick and thin.",
      3: "Taarak's best friend is Jethalal — intellectual rivals who can't live apart.",
      4: "Bhide's best friend is Sodhi — discipline meets party.",
      5: "Popatlal's best friend is... Popatlal. Self-referencing at its finest.",
      6: "Sodhi's best friend is Bhide — the party + discipline combo.",
    },
    nullStory: null,
  },
  NATURAL: {
    summary: "Both tables share a 'grade' column. SQL auto-detects and matches rows where grade values are equal — no ON clause needed!",
    perRow: {},
    nullStory: null,
  },
};


// ─── SELF-JOIN: Friendships within residents ──────
export const friendships = [
  { resident_id: 1, best_friend_id: 3, label: "Business buddies" },
  { resident_id: 3, best_friend_id: 1, label: "Intellectual rivals" },
  { resident_id: 4, best_friend_id: 6, label: "Neighbours" },
  { resident_id: 5, best_friend_id: 5, label: "Popatlal is his own best friend" },
  { resident_id: 6, best_friend_id: 4, label: "Party + Discipline combo" },
];

// ─── CROSS-JOIN: Society Events (for pairing) ──────
export const events = [
  { id: 1, event: "Garba Night" },
  { id: 2, event: "Cricket Match" },
  { id: 3, event: "Holi Party" },
];

// ─── NATURAL JOIN DATASET ──────
export const studentRecords = [
  { student_name: "Tapu",  grade: "10th", score: 45 },
  { student_name: "Goli",  grade: "10th", score: 72 },
  { student_name: "Sonu",  grade: "10th", score: 95 },
];

export const gradeInfo = [
  { grade: "10th", teacher: "Bhide Sir", subject: "Maths" },
  { grade: "11th", teacher: "New Teacher", subject: "Physics" },
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
    shortDesc: "Returns rows that have matching values in BOTH tables. If a resident didn't sign up for an event role, they won't appear.",
    realLife: "Only Gokuldham residents with an assigned event role show up. Daya and Sodhi didn't volunteer — they're out!",
    sql: "SELECT r.name, e.event_role\nFROM residents r\nINNER JOIN society_events e\nON r.id = e.resident_id;",
    rule: "Both tables must have a matching key",
  },
  LEFT: {
    name: "LEFT JOIN",
    icon: "⬅️",
    color: "#22c55e",
    tagline: "Left table keeps all its rows",
    shortDesc: "Returns ALL rows from the left table + matched rows from the right. Unmatched right side = NULL.",
    realLife: "All residents are listed. No event role? That column shows NULL — Daya's too busy with Garba to volunteer!",
    sql: "SELECT r.name, e.event_role\nFROM residents r\nLEFT JOIN society_events e\nON r.id = e.resident_id;",
    rule: "Left table → ALL rows, right → only matches",
  },
  RIGHT: {
    name: "RIGHT JOIN",
    icon: "➡️",
    color: "#ec4899",
    tagline: "Right table keeps all its rows",
    shortDesc: "Returns ALL rows from the right table + matched rows from the left. Unmatched left side = NULL.",
    realLife: "All event roles are listed, even 'Cricket Team Captain' (resident_id = 8). Nobody claimed it — resident shows NULL!",
    sql: "SELECT r.name, e.event_role\nFROM residents r\nRIGHT JOIN society_events e\nON r.id = e.resident_id;",
    rule: "Right table → ALL rows, left → only matches",
  },
  FULL: {
    name: "FULL OUTER JOIN",
    icon: "🔄",
    color: "#f59e0b",
    tagline: "Everyone's included",
    shortDesc: "Returns ALL rows from BOTH tables. Where there's no match, NULLs fill the gaps on either side.",
    realLife: "Every resident AND every role shows up. Unmatched? NULL fills the gap. It's the complete Gokuldham picture.",
    sql: "SELECT r.name, e.event_role\nFROM residents r\nFULL OUTER JOIN society_events e\nON r.id = e.resident_id;",
    rule: "Both tables → ALL rows, gaps filled with NULL",
  },
  CROSS: {
    name: "CROSS JOIN",
    icon: "✖️",
    color: "#8b5cf6",
    tagline: "Every possible combination",
    shortDesc: "Returns the Cartesian product — every row from A paired with every row from B. No condition needed.",
    realLife: `Every resident × every event. 4 residents × 3 events = 12 rows. Everyone goes everywhere.`,
    sql: "SELECT r.name, e.event\nFROM residents r\nCROSS JOIN events e;",
    rule: "Result rows = Left count × Right count",
  },
  SELF: {
    name: "SELF JOIN",
    icon: "🪞",
    color: "#f43f5e",
    tagline: "Table meets itself",
    shortDesc: "A table joins with itself using aliases. Useful for finding relationships within the same dataset.",
    realLife: "Who is whose best friend in Gokuldham? Join the residents table with itself. Popatlal's best friend is... Popatlal.",
    sql: "SELECT a.name, b.name AS best_friend\nFROM residents a\nJOIN friendships f ON a.id = f.resident_id\nJOIN residents b ON f.best_friend_id = b.id;",
    rule: "Same table, aliased as A & B",
  },
  NATURAL: {
    name: "NATURAL JOIN",
    icon: "🌿",
    color: "#14b8a6",
    tagline: "Auto-match common columns",
    shortDesc: "Automatically joins on columns with the SAME name in both tables. No ON clause needed — SQL figures it out.",
    realLife: "Students and grade info share a 'grade' column. SQL automatically matches them — Tapu, Goli, Sonu all link to Bhide Sir!",
    sql: "SELECT *\nFROM student_records\nNATURAL JOIN grade_info;",
    rule: "Auto-match on shared column names",
  },
};


// ====================================================
//  QUIZ QUESTIONS — TMKOC + Gen-Z Scenarios
// ====================================================
export const quizQuestions = [
  {
    id: 1,
    emoji: "🎯",
    scenario: "You have a Residents table and a SocietyEvents table. You want to see only residents who have an assigned event role.",
    question: "Which JOIN should you use?",
    options: ["INNER JOIN", "LEFT JOIN", "FULL JOIN", "CROSS JOIN"],
    correct: 0,
    explanation: "INNER JOIN returns only rows where both tables have a matching key. If a resident has no event role, they're excluded.",
  },
  {
    id: 2,
    emoji: "⬅️",
    scenario: "Bhide is taking society attendance. He wants ALL residents listed, even if some haven't volunteered for any event.",
    question: "Which JOIN ensures no resident is missed?",
    options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "SELF JOIN"],
    correct: 2,
    explanation: "LEFT JOIN keeps all rows from the left table (residents). Those without a matching event role get NULL in the event column.",
  },
  {
    id: 3,
    emoji: "📸",
    scenario: "You follow 500 people on Instagram. Some have posted stories, some haven't. You only see stories from people who posted.",
    question: "This behavior is like which JOIN?",
    options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "INNER JOIN — your feed shows only followed accounts that also have stories. No story = not shown.",
  },
  {
    id: 4,
    emoji: "✖️",
    scenario: "Gokuldham is making a schedule. Every resident must be paired with every event for planning purposes.",
    question: "Which JOIN creates ALL possible resident-event pairs?",
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "NATURAL JOIN"],
    correct: 2,
    explanation: "CROSS JOIN produces the Cartesian product — every row from A paired with every row from B.",
  },
  {
    id: 5,
    emoji: "🪞",
    scenario: "You have a single Employees table and want to find which employee reports to which manager (from the same table).",
    question: "Which JOIN type works here?",
    options: ["LEFT JOIN", "RIGHT JOIN", "SELF JOIN", "FULL JOIN"],
    correct: 2,
    explanation: "SELF JOIN — the table joins with itself using aliases. Perfect for hierarchies and same-table relationships.",
  },
  {
    id: 6,
    emoji: "🔄",
    scenario: "You have Students and Clubs tables. You want to see ALL students (even those in no club) AND all clubs (even empty ones).",
    question: "Which JOIN keeps everything from both sides?",
    options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
    correct: 2,
    explanation: "FULL OUTER JOIN keeps all rows from both tables. Unmatched rows get NULL on the missing side.",
  },
  {
    id: 7,
    emoji: "🌿",
    scenario: "Two tables share a column called 'grade'. You want SQL to auto-detect it and join without writing an ON clause.",
    question: "Which JOIN does this automatically?",
    options: ["INNER JOIN", "NATURAL JOIN", "SELF JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "NATURAL JOIN auto-matches columns with the same name. No ON clause needed — just make sure column names are intentional.",
  },
  {
    id: 8,
    emoji: "➡️",
    scenario: "A company HR has a list of job roles. Some roles are vacant — no employee assigned. They want ALL roles visible.",
    question: "Which JOIN keeps all rows from the right table?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "SELF JOIN"],
    correct: 1,
    explanation: "RIGHT JOIN keeps all rows from the right table. Vacant roles appear with NULL in the employee column.",
  },
  {
    id: 9,
    emoji: "🔢",
    scenario: "Table A has 5 rows, Table B has 4 rows, and 3 rows match between them.",
    question: "How many rows does INNER JOIN return?",
    options: ["9", "5", "3", "20"],
    correct: 2,
    explanation: "INNER JOIN returns only matching rows. 3 matches = 3 rows. It doesn't add or multiply — just filters to matches.",
  },
  {
    id: 10,
    emoji: "📊",
    scenario: "You want to combine results from two separate SELECT queries that have the same columns, removing duplicates.",
    question: "This is a use case for...",
    options: ["INNER JOIN", "UNION", "CROSS JOIN", "LEFT JOIN"],
    correct: 1,
    explanation: "UNION stacks rows vertically (same columns required). JOIN merges horizontally (combines tables by key). Different operations!",
  },
];


// ====================================================
//  DECISION HELPER — refined flowchart logic
// ====================================================
export const decisionTree = [
  {
    id: "q1",
    question: "What do you need from the two tables?",
    options: [
      { label: "Only records that exist in both tables", next: "q2" },
      { label: "All records from one specific table", next: "q3" },
      { label: "All records from both tables combined", result: "FULL" },
      { label: "Every possible combination of rows", result: "CROSS" },
      { label: "Find relationships within the same table", result: "SELF" },
    ],
  },
  {
    id: "q2",
    question: "How should the matching work?",
    options: [
      { label: "I'll specify the exact columns to match with ON", result: "INNER" },
      { label: "Let SQL auto-detect shared column names", result: "NATURAL" },
    ],
  },
  {
    id: "q3",
    question: "Which table should keep ALL its rows (even unmatched ones)?",
    options: [
      { label: "The LEFT (first) table — keep all its rows", result: "LEFT" },
      { label: "The RIGHT (second) table — keep all its rows", result: "RIGHT" },
    ],
  },
];

// Explanation text shown after a result in the Decision Helper
export const decisionExplanations = {
  INNER: "You chose INNER JOIN because you only want rows where both tables have a matching key. No match = excluded.",
  LEFT: "You chose LEFT JOIN because the left table is your priority — all its rows stay, and unmatched right-side values become NULL.",
  RIGHT: "You chose RIGHT JOIN because the right table is your priority — all its rows stay, and unmatched left-side values become NULL.",
  FULL: "You chose FULL OUTER JOIN because you want all records from both tables, with NULLs filling in where there's no match on either side.",
  CROSS: "You chose CROSS JOIN because you need every row from one table paired with every row from the other — the Cartesian product.",
  SELF: "You chose SELF JOIN because you need to compare rows within the same table — useful for hierarchies and internal relationships.",
  NATURAL: "You chose NATURAL JOIN because both tables share identically-named columns and you want SQL to auto-match without an explicit ON clause.",
};


// ====================================================
//  CHEAT SHEET — Gen-Z Relatable Examples
// ====================================================
export const cheatSheetItems = [
  { type: "INNER",   rule: "Only matches",          icon: "🎯", color: "#06b6d4", mnemonic: "Both tables must agree" },
  { type: "LEFT",    rule: "Left table keeps all",   icon: "⬅️", color: "#22c55e", mnemonic: "All left + matches from right" },
  { type: "RIGHT",   rule: "Right table keeps all",  icon: "➡️", color: "#ec4899", mnemonic: "All right + matches from left" },
  { type: "FULL",    rule: "Keep everything",         icon: "🔄", color: "#f59e0b", mnemonic: "All rows, NULLs fill gaps" },
  { type: "CROSS",   rule: "All combos (A × B)",      icon: "✖️", color: "#8b5cf6", mnemonic: "Every row paired with every row" },
  { type: "SELF",    rule: "Table joins itself",      icon: "🪞", color: "#f43f5e", mnemonic: "Same table, different aliases" },
  { type: "NATURAL", rule: "Auto-match columns",      icon: "🌿", color: "#14b8a6", mnemonic: "No ON clause needed" },
];

export const genZExamples = [
  {
    title: "Students & Clubs",
    joinType: "LEFT JOIN",
    color: "#22c55e",
    leftTable: "Students",
    rightTable: "Clubs",
    explanation: "Show all students, even those who joined no club. Non-members get NULL for the club column.",
    diagram: { left: ["Alice", "Bob", "Charlie"], right: ["Art Club", "Chess Club"], matched: [["Alice", "Art Club"], ["Bob", "Chess Club"]], nullLeft: ["Charlie"] },
  },
  {
    title: "Instagram Users & Mutual Follows",
    joinType: "INNER JOIN",
    color: "#06b6d4",
    leftTable: "User A Follows",
    rightTable: "User B Follows",
    explanation: "Show only users who follow each other — mutual followers. No mutual follow = not in the result.",
    diagram: { left: ["@priya", "@rahul", "@neha"], right: ["@rahul", "@neha", "@amit"], matched: [["@rahul", "@rahul"], ["@neha", "@neha"]], nullLeft: [] },
  },
  {
    title: "Online Orders & Customers",
    joinType: "LEFT JOIN",
    color: "#22c55e",
    leftTable: "Customers",
    rightTable: "Orders",
    explanation: "Show all customers even if they never placed an order. Customers with zero orders appear with NULL order data.",
    diagram: { left: ["Ravi", "Sneha", "Karan"], right: ["Order #101", "Order #102"], matched: [["Ravi", "Order #101"], ["Sneha", "Order #102"]], nullLeft: ["Karan"] },
  },
  {
    title: "Game Players & Teams",
    joinType: "RIGHT JOIN",
    color: "#ec4899",
    leftTable: "Players",
    rightTable: "Teams",
    explanation: "Show all teams, even if some have no players assigned yet. Empty teams appear with NULL player data.",
    diagram: { left: ["Player1", "Player2"], right: ["Team Alpha", "Team Beta", "Team Gamma"], matched: [["Player1", "Team Alpha"], ["Player2", "Team Beta"]], nullRight: ["Team Gamma"] },
  },
  {
    title: "Playlist Songs & Liked Songs",
    joinType: "FULL OUTER JOIN",
    color: "#f59e0b",
    leftTable: "Playlist",
    rightTable: "Liked",
    explanation: "Show all playlist songs AND all liked songs. Songs only in one list get NULL on the other side.",
    diagram: { left: ["Song A", "Song B", "Song C"], right: ["Song B", "Song D"], matched: [["Song B", "Song B"]], nullLeft: ["Song A", "Song C"], nullRight: ["Song D"] },
  },
  {
    title: "Hackathon Participants & Project Ideas",
    joinType: "CROSS JOIN",
    color: "#8b5cf6",
    leftTable: "Participants",
    rightTable: "Ideas",
    explanation: "Pair every participant with every idea to explore all possible assignments. 3 people × 3 ideas = 9 combinations.",
    diagram: { left: ["Dev", "Sana", "Arjun"], right: ["AI Bot", "Game", "App"], matched: "all", nullLeft: [] },
  },
];
