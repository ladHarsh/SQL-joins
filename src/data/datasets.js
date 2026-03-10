// ====================================================
//  JOIN UNIVERSE — TMKOC Story-Based + Gen-Z Datasets
// ====================================================

// ─── PRIMARY DATASET: Gokuldham Society Residents ──────────────────────────
// ResidentID | Name      | Flat | PersonalityRole
export const residents = [
  { id: 1, name: "Jethalal", flat: "A1", role: "Gada Electronics Owner", emoji: "📺" },
  { id: 2, name: "Daya", flat: "A1", role: "Garba Lover", emoji: "💃" },
  { id: 3, name: "Taarak", flat: "A2", role: "Jethalal's Fire Brigade", emoji: "🧠" },
  { id: 4, name: "Bhide", flat: "B1", role: "Society Secretary & Teacher", emoji: "📏" },
  { id: 5, name: "Popatlal", flat: "B2", role: "Toofan Express Reporter", emoji: "📰" },
  { id: 6, name: "Sodhi", flat: "C1", role: "Party Specialist", emoji: "🍻" },
  { id: 7, name: "Iyer", flat: "C2", role: "Scientist", emoji: "🔬" },
];

// ─── SOCIETY ACTIVITIES TABLE ───────────────────────────────────────────────
// ResidentID (FK) | Activity
// Note: ResidentID 2 (Daya) and 6 (Sodhi) have no activity → shows LEFT JOIN NULL
//       ResidentID 8 (ghost: Tappu Sena) has no resident → shows RIGHT JOIN NULL
export const societyEvents = [
  { id: 101, resident_id: 1, activity: "Gada Electronics Sale Festival", icon: "🛍️" },

  { id: 102, resident_id: 3, activity: "Jethalal Problem Solver Meeting", icon: "🧠" },

  { id: 103, resident_id: 4, activity: "Society Maintenance Collection", icon: "📋" },

  { id: 104, resident_id: 5, activity: "Breaking News from Gokuldham", icon: "📰" },

  { id: 105, resident_id: 7, activity: "Science Experiment Presentation", icon: "🧪" },

  { id: 106, resident_id: 8, activity: "Tapu Sena Annual Talent Show", icon: "🎭" }, // no matching resident → RIGHT JOIN example
];

// ─── CROSS-JOIN: Events list (used for Cartesian product) ──────────────────
export const events = [
  { id: 1, event: "Garba Night" },
  { id: 2, event: "Cricket Match" },
  { id: 3, event: "Science Fair" },
];

// ─── SELF-JOIN: Who mentors whom in Gokuldham ───────────────────────────────
export const friendships = [
  { resident_id: 1, best_friend_id: 3, label: "Business advice duo" },
  { resident_id: 3, best_friend_id: 1, label: "Mutual respect" },
  { resident_id: 4, best_friend_id: 6, label: "Neighbours" },
  { resident_id: 5, best_friend_id: 5, label: "Popatlal — self-reliant!" },
  { resident_id: 6, best_friend_id: 4, label: "Party + discipline combo" },
];

// ─── NATURAL JOIN DATASET ────────────────────────────────────────────────────
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
//  STORY DESCRIPTIONS — Per-join contextual narrative
// ====================================================
export const storyDescriptions = {
  INNER: {
    summary: "Only residents who actually signed up for a society activity appear here. Daya and Sodhi didn't volunteer — so they're out of the result!",
    nullStory: null,
  },
  LEFT: {
    summary: "Every resident is listed — even those who didn't sign up for any activity. Daya and Sodhi show NULL in the Activity column. No resident escapes Bhide Sir's attendance register!",
    nullStory: "NULL here means the resident exists but has no activity assigned.",
  },
  RIGHT: {
    summary: "Every activity is listed — even 'Tapu Sena Annual Talent Show' (resident_id=8) which has no matching resident! That's a ghost position — the resident column shows NULL.",
    nullStory: "NULL on the left means this activity has no resident assigned to it. A vacant role in Gokuldham!",
  },
  FULL: {
    summary: "Absolutely everyone and every activity shows up! Daya & Sodhi have NULL activity. Tapu Sena Talent Show has NULL resident. The complete Gokuldham picture — no one and nothing is left out.",
    nullStory: "NULLs fill both sides: unmatched residents AND unmatched activities.",
  },
  CROSS: {
    summary: "Every resident paired with every event — 4 × 3 = 12 rows. It's the full combination schedule. Chaos? Yes. But complete!",
    nullStory: null,
  },
  SELF: {
    summary: "The residents table joins with itself to find best-friend relationships. Popatlal's best friend is... himself. Classic Popatlal.",
    nullStory: null,
  },
  NATURAL: {
    summary: "Both tables share a 'grade' column. SQL automatically detected and matched on it — no ON clause needed! All 10th graders link to Bhide Sir's Maths class.",
    nullStory: null,
  },
  LEFT_EX: {
    summary: "Only residents who have NO matching activity at all. Daya and Sodhi are the only ones — they exist in the society but volunteered for nothing!",
    nullStory: "These rows have NULL on the right because that's the whole point — we're selecting ONLY the unmatched left rows.",
  },
  RIGHT_EX: {
    summary: "Only activities with NO matching resident. The 'Tapu Sena Annual Talent Show' (resident_id=8) is the only orphan activity — nobody in the residents table has that ID!",
    nullStory: "These rows have NULL on the left because the activity has no corresponding resident.",
  },
};


// ====================================================
//  JOIN TYPE INFO — Explanations, Analogies, SQL
// ====================================================
export const joinDescriptions = {
  INNER: {
    name: "INNER JOIN",
    icon: "🎯",
    color: "#06b6d4",
    tagline: "Only the matches survive",
    shortDesc: "Returns rows that have matching values in BOTH tables. No match = excluded from result.",
    realLife: "Only Gokuldham residents who have an assigned society activity appear. Daya and Sodhi didn't sign up — they're out!",
    sql: `SELECT r.name, r.role, s.activity
FROM residents r
INNER JOIN society_events s
ON r.id = s.resident_id;`,
    rule: "Both tables must have a matching key",
  },
  LEFT: {
    name: "LEFT JOIN",
    icon: "⬅️",
    color: "#22c55e",
    tagline: "Left table keeps ALL its rows",
    shortDesc: "Returns ALL rows from the left table. If no match in the right table, that side shows NULL.",
    realLife: "All residents listed. Daya and Sodhi have no activity — their activity column shows NULL.",
    sql: `SELECT r.name, r.role, s.activity
FROM residents r
LEFT JOIN society_events s
ON r.id = s.resident_id;`,
    rule: "Left table → ALL rows; right → only matches",
  },
  RIGHT: {
    name: "RIGHT JOIN",
    icon: "➡️",
    color: "#ec4899",
    tagline: "Right table keeps ALL its rows",
    shortDesc: "Returns ALL rows from the right table. If no match in the left table, that side shows NULL.",
    realLife: "All activity roles shown — including 'Tapu Sena Annual Talent Show' (resident_id=8). Nobody's claimed it, so resident = NULL!",
    sql: `SELECT r.name, s.activity
FROM residents r
RIGHT JOIN society_events s
ON r.id = s.resident_id;`,
    rule: "Right table → ALL rows; left → only matches",
  },
  FULL: {
    name: "FULL OUTER JOIN",
    icon: "🔄",
    color: "#f59e0b",
    tagline: "Everyone is included",
    shortDesc: "Returns ALL rows from BOTH tables. NULLs fill gaps on whichever side has no match.",
    realLife: "Every resident AND every role shows up. Unmatched? NULL fills the gap. The ultimate Gokuldham reunion!",
    sql: `SELECT r.name, s.activity
FROM residents r
FULL OUTER JOIN society_events s
ON r.id = s.resident_id;`,
    rule: "Both tables → ALL rows; gaps filled with NULL",
  },
  CROSS: {
    name: "CROSS JOIN",
    icon: "✖️",
    color: "#8b5cf6",
    tagline: "Every possible combination",
    shortDesc: "Returns the Cartesian product — every row from A paired with every row from B. No condition needed.",
    realLife: "Every resident × every event = all possible assignment combos. 4 × 3 = 12 rows.",
    sql: `SELECT r.name, e.event
FROM residents r
CROSS JOIN events e;`,
    rule: "Result rows = Left count × Right count",
  },
  SELF: {
    name: "SELF JOIN",
    icon: "🪞",
    color: "#f43f5e",
    tagline: "Table meets itself",
    shortDesc: "A table joins with itself using aliases. Useful for finding internal relationships.",
    realLife: "Who is whose best friend in Gokuldham? Join residents with itself using aliases A and B. Popatlal's best friend is himself!",
    sql: `SELECT a.name AS person, b.name AS best_friend
FROM residents a
JOIN friendships f ON a.id = f.resident_id
JOIN residents b ON f.best_friend_id = b.id;`,
    rule: "Same table, aliased as A & B",
  },
  NATURAL: {
    name: "NATURAL JOIN",
    icon: "🌿",
    color: "#14b8a6",
    tagline: "Auto-match common columns",
    shortDesc: "Automatically joins on columns with the SAME name in both tables. No ON clause needed.",
    realLife: "Student records and grade info both have a 'grade' column — SQL auto-matches them without you writing ON!",
    sql: `SELECT *
FROM student_records
NATURAL JOIN grade_info;`,
    rule: "Auto-match on shared column names",
  },
  LEFT_EX: {
    name: "LEFT EXCLUSIVE",
    icon: "🚫⬅️",
    color: "#10b981",
    tagline: "Only unmatched left rows",
    shortDesc: "Returns rows from the left table that have NO match in the right table. It's a LEFT JOIN filtered with WHERE right.key IS NULL.",
    realLife: "Residents who didn't volunteer for ANY activity. Only Daya and Sodhi — everyone else has a role!",
    sql: `SELECT r.name, r.role, s.activity
FROM residents r
LEFT JOIN society_events s
ON r.id = s.resident_id
WHERE s.resident_id IS NULL;`,
    rule: "LEFT JOIN + WHERE right_key IS NULL",
  },
  RIGHT_EX: {
    name: "RIGHT EXCLUSIVE",
    icon: "➡️🚫",
    color: "#f97316",
    tagline: "Only unmatched right rows",
    shortDesc: "Returns rows from the right table that have NO match in the left table. It's a RIGHT JOIN filtered with WHERE left.key IS NULL.",
    realLife: "Activities with no resident assigned. Only the 'Tapu Sena Talent Show' — a ghost event with resident_id = 8!",
    sql: `SELECT r.name, s.activity
FROM residents r
RIGHT JOIN society_events s
ON r.id = s.resident_id
WHERE r.id IS NULL;`,
    rule: "RIGHT JOIN + WHERE left_key IS NULL",
  },
};


// ====================================================
//  QUIZ QUESTIONS — 5 Realistic Scenarios for Challenge
// ====================================================
export const quizQuestions = [
  {
    id: 1,
    emoji: "🎓",
    scenario: "You have a Students table and a Clubs table. You want to see only students who have actually joined a club.",
    question: "Which JOIN should you use?",
    options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
    correct: 0,
    explanation: "INNER JOIN — returns only rows that match in BOTH tables. Students not in any club are excluded from the result.",
  },
  {
    id: 2,
    emoji: "🛒",
    scenario: "A business wants to see ALL customers, including those who have never placed an order. For customers with no order, the order columns should show NULL.",
    question: "Which JOIN ensures every customer appears in the result?",
    options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "SELF JOIN"],
    correct: 2,
    explanation: "LEFT JOIN — all rows from the left table (Customers) are kept. Unmatched customers show NULL in the Order columns.",
  },
  {
    id: 3,
    emoji: "📸",
    scenario: "An Instagram feature shows only accounts that appear in BOTH your 'Following' list AND the 'Posted a Story Today' list.",
    question: "This 'mutual filter' logic uses which JOIN type?",
    options: ["LEFT JOIN", "INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "INNER JOIN — only accounts present in both tables (you follow AND they posted) appear. No match = not shown.",
  },
  {
    id: 4,
    emoji: "🎮",
    scenario: "A gaming platform lists all teams — even teams that currently have zero players assigned. Teams with no players should show NULL for the player name.",
    question: "Which JOIN keeps ALL teams visible regardless of player assignment?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "NATURAL JOIN"],
    correct: 2,
    explanation: "RIGHT JOIN — all rows from the right table (Teams) are kept. If no players match, the player column shows NULL.",
  },
  {
    id: 5,
    emoji: "🏢",
    scenario: "A company's HR database has one Employees table containing both managers and their subordinates. You want to list every employee alongside their manager's name — all from the same table.",
    question: "Which JOIN type is needed here?",
    options: ["LEFT JOIN", "INNER JOIN", "SELF JOIN", "FULL OUTER JOIN"],
    correct: 2,
    explanation: "SELF JOIN — the Employees table joins with itself using two aliases (Employee and Manager). Perfect for hierarchical relationships within a single table.",
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
      { label: "Only records that match in BOTH tables", next: "q2" },
      { label: "ALL records from one specific table (+ matches)", next: "q3" },
      { label: "Records that exist in only ONE table (no match)", next: "q4" },
      { label: "ALL records from BOTH tables combined", result: "FULL" },
      { label: "Every possible row combination", result: "CROSS" },
      { label: "Relationships within the SAME table", result: "SELF" },
    ],
  },
  {
    id: "q2",
    question: "How should the matching work?",
    options: [
      { label: "I'll specify exact columns to match with ON", result: "INNER" },
      { label: "Let SQL auto-detect shared column names", result: "NATURAL" },
    ],
  },
  {
    id: "q3",
    question: "Which table should keep ALL its rows (even unmatched)?",
    options: [
      { label: "The LEFT (first) table — it drives the result", result: "LEFT" },
      { label: "The RIGHT (second) table — keep all its rows", result: "RIGHT" },
    ],
  },
  {
    id: "q4",
    question: "Which table's unmatched rows do you want?",
    options: [
      { label: "Rows only in the LEFT table (no match in right)", result: "LEFT_EX" },
      { label: "Rows only in the RIGHT table (no match in left)", result: "RIGHT_EX" },
    ],
  },
];

export const decisionExplanations = {
  INNER:   "You want only matching records — INNER JOIN is perfect. Rows with no match in either table are completely excluded.",
  LEFT:    "The left table is your anchor — LEFT JOIN keeps all its rows. Unmatched right-side values become NULL.",
  RIGHT:   "The right table is your anchor — RIGHT JOIN keeps all its rows. Unmatched left-side values become NULL.",
  FULL:    "You need everything from both sides — FULL OUTER JOIN returns all rows, filling NULLs where matches don't exist.",
  CROSS:   "You need every combination — CROSS JOIN creates the Cartesian product (A × B rows). No join condition required.",
  SELF:    "The relationship is within the same table — SELF JOIN uses table aliases (A and B) to compare rows internally.",
  NATURAL: "Both tables share a column name — NATURAL JOIN auto-detects and matches on it. No ON clause needed.",
  LEFT_EX: "You want rows that exist ONLY in the left table with no match in the right. LEFT EXCLUSIVE = LEFT JOIN + WHERE right.key IS NULL.",
  RIGHT_EX: "You want rows that exist ONLY in the right table with no match in the left. RIGHT EXCLUSIVE = RIGHT JOIN + WHERE left.key IS NULL.",
};


// ====================================================
//  REAL WORLD EXAMPLES — Gen-Z Relatable Scenarios
// ====================================================
export const realWorldExamples = [
  {
    joinType: "INNER JOIN",
    color: "#06b6d4",
    icon: "🎯",
    leftTable: "Students",
    rightTable: "Clubs",
    title: "Students & Clubs",
    explanation: "Only students who have joined a club appear. Students with no club membership are excluded entirely.",
    leftRows: ["Alice ✓", "Bob ✓", "Charlie ✗"],
    rightRows: ["Art Club ✓", "Chess Club ✓"],
    resultRows: ["Alice → Art Club", "Bob → Chess Club"],
    resultType: "Only matched rows",
  },
  {
    joinType: "LEFT JOIN",
    color: "#22c55e",
    icon: "⬅️",
    leftTable: "Customers",
    rightTable: "Orders",
    title: "Customers & Orders",
    explanation: "All customers appear — even Karan who never ordered. His order columns show NULL.",
    leftRows: ["Ravi ✓", "Sneha ✓", "Karan →"],
    rightRows: ["Order #101 ✓", "Order #102 ✓"],
    resultRows: ["Ravi → Order #101", "Sneha → Order #102", "Karan → NULL"],
    resultType: "All left rows, NULLs for unmatched",
  },
  {
    joinType: "RIGHT JOIN",
    color: "#ec4899",
    icon: "➡️",
    leftTable: "Players",
    rightTable: "Teams",
    title: "Game Players & Teams",
    explanation: "All teams appear — even Team Gamma that has no players. The player column shows NULL for empty teams.",
    leftRows: ["Player A ✓", "Player B ✓"],
    rightRows: ["Team Alpha ✓", "Team Beta ✓", "Team Gamma →"],
    resultRows: ["Player A → Team Alpha", "Player B → Team Beta", "NULL → Team Gamma"],
    resultType: "All right rows, NULLs for unmatched",
  },
  {
    joinType: "FULL OUTER JOIN",
    color: "#f59e0b",
    icon: "🔄",
    leftTable: "Freelancers",
    rightTable: "Projects",
    title: "Freelancers & Projects",
    explanation: "Every freelancer AND every project appears. Unmatched entries show NULL on the missing side.",
    leftRows: ["Dev A ✓", "Dev B →", "Dev C ✓"],
    rightRows: ["Project X ✓", "Project Y →", "Project Z ✓"],
    resultRows: ["Dev A → Project X", "Dev B → NULL", "NULL → Project Y", "Dev C → Project Z"],
    resultType: "All rows from both, NULLs fill gaps",
  },
  {
    joinType: "CROSS JOIN",
    color: "#8b5cf6",
    icon: "✖️",
    leftTable: "Menu Items",
    rightTable: "Drink Options",
    title: "Menu × Drinks",
    explanation: "Every menu item is paired with every drink. 3 items × 2 drinks = 6 combinations. All possible pairings.",
    leftRows: ["Burger", "Pizza", "Pasta"],
    rightRows: ["Coke", "Juice"],
    resultRows: ["Burger + Coke", "Burger + Juice", "Pizza + Coke", "Pizza + Juice", "Pasta + Coke", "Pasta + Juice"],
    resultType: "A × B rows (Cartesian product)",
  },
  {
    joinType: "SELF JOIN",
    color: "#f43f5e",
    icon: "🪞",
    leftTable: "Employees (A)",
    rightTable: "Employees (B)",
    title: "Employees & Their Managers",
    explanation: "The Employees table joins with itself! Alias A is the employee, Alias B is their manager — same table, different roles.",
    leftRows: ["Alice (reports to Bob)", "Charlie (reports to Bob)", "Bob (reports to Alice)"],
    rightRows: ["Bob (Manager)", "Alice (Manager)"],
    resultRows: ["Alice → Manager: Bob", "Charlie → Manager: Bob", "Bob → Manager: Alice"],
    resultType: "Same table, aliased as A & B",
  },
];

// Keep cheatSheetItems for backwards compat (not used in new UI)
export const cheatSheetItems = [
  { type: "INNER",   rule: "Only matches",          icon: "🎯", color: "#06b6d4", mnemonic: "Both tables must agree" },
  { type: "LEFT",    rule: "Left table keeps all",   icon: "⬅️", color: "#22c55e", mnemonic: "All left + matches from right" },
  { type: "RIGHT",   rule: "Right table keeps all",  icon: "➡️", color: "#ec4899", mnemonic: "All right + matches from left" },
  { type: "FULL",    rule: "Keep everything",         icon: "🔄", color: "#f59e0b", mnemonic: "All rows, NULLs fill gaps" },
  { type: "CROSS",   rule: "All combos (A × B)",      icon: "✖️", color: "#8b5cf6", mnemonic: "Every row paired with every row" },
  { type: "SELF",    rule: "Table joins itself",      icon: "🪞", color: "#f43f5e", mnemonic: "Same table, different aliases" },
  { type: "NATURAL", rule: "Auto-match columns",      icon: "🌿", color: "#14b8a6", mnemonic: "No ON clause needed" },
];
