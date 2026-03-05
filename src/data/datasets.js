// ======= FUN DATASETS FOR JOIN DEMONSTRATIONS =======

export const students = [
  { id: 1, name: "Aarav 🧑‍💻", emoji: "🧑‍💻", major: "CS", gpa: 3.8 },
  { id: 2, name: "Priya 👩‍🔬", emoji: "👩‍🔬", major: "Physics", gpa: 3.9 },
  { id: 3, name: "Ravi 🎨", emoji: "🎨", major: "Art", gpa: 3.5 },
  { id: 4, name: "Sneha 📊", emoji: "📊", major: "Stats", gpa: 3.7 },
  { id: 5, name: "Kabir 🎮", emoji: "🎮", major: "GameDev", gpa: 3.6 },
];

export const courses = [
  { id: 101, student_id: 1, course: "Databases 🗃️", grade: "A" },
  { id: 102, student_id: 2, course: "Quantum 🔬", grade: "A+" },
  { id: 103, student_id: 1, course: "Algorithms 🧩", grade: "B+" },
  { id: 104, student_id: 6, course: "Music 🎵", grade: "A" },
  { id: 105, student_id: 3, course: "Painting 🖌️", grade: "A-" },
];

// ======= HEROES & SIDEKICKS (Fun alternate dataset) =======
export const heroes = [
  { id: 1, name: "Iron Man 🦾", power: "Tech Genius", level: 95 },
  { id: 2, name: "Spider-Man 🕷️", power: "Web Slinger", level: 88 },
  { id: 3, name: "Thor ⚡", power: "Thunder God", level: 98 },
  { id: 4, name: "Hulk 💪", power: "Super Strength", level: 99 },
  { id: 5, name: "Black Widow 🕵️", power: "Spy Skills", level: 90 },
];

export const sidekicks = [
  { id: 201, hero_id: 1, name: "JARVIS 🤖", role: "AI Assistant" },
  { id: 202, hero_id: 2, name: "Ned Leeds 🧑", role: "Guy in Chair" },
  { id: 203, hero_id: 1, name: "Pepper Potts 👩‍💼", role: "CEO" },
  { id: 204, hero_id: 6, name: "Robin 🦅", role: "Partner" },
  { id: 205, hero_id: 3, name: "Valkyrie ⚔️", role: "Warrior" },
];

// ======= DATASET METADATA =======
export const datasets = {
  students: {
    leftTable: { name: "Students", data: students, key: "id", displayFields: ["name", "major"] },
    rightTable: { name: "Courses", data: courses, key: "student_id", displayFields: ["course", "grade"] },
    joinKey: { left: "id", right: "student_id" },
  },
  heroes: {
    leftTable: { name: "Heroes", data: heroes, key: "id", displayFields: ["name", "power"] },
    rightTable: { name: "Sidekicks", data: sidekicks, key: "hero_id", displayFields: ["name", "role"] },
    joinKey: { left: "id", right: "hero_id" },
  },
};

// ======= QUIZ QUESTIONS =======
export const quizQuestions = [
  {
    id: 1,
    question: "Which JOIN returns only the rows that have matching values in BOTH tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    correct: 0,
    explanation: "INNER JOIN returns only the matching rows from both tables — like a strict bouncer at a club! 🚪",
    emoji: "🎯",
  },
  {
    id: 2,
    question: "Which JOIN keeps ALL rows from the LEFT table, even without a match?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
    correct: 1,
    explanation: "LEFT JOIN says: 'Everyone from the left table gets in, matches or not!' The unmatched ones get NULLs. 🤷",
    emoji: "⬅️",
  },
  {
    id: 3,
    question: "Student Aarav (id=1) exists in Students but NOT in Courses. After a RIGHT JOIN on Students, Aarav will...",
    options: [
      "Appear with NULL values",
      "Not appear at all",
      "Appear normally",
      "Cause an error",
    ],
    correct: 1,
    explanation: "RIGHT JOIN prioritizes the RIGHT table. Since Aarav is in the LEFT table only, he's excluded! 😢",
    emoji: "🤔",
  },
  {
    id: 4,
    question: "FULL OUTER JOIN is like combining which two JOINs?",
    options: [
      "LEFT JOIN + RIGHT JOIN",
      "INNER JOIN + CROSS JOIN",
      "INNER JOIN + LEFT JOIN",
      "Self JOIN + INNER JOIN",
    ],
    correct: 0,
    explanation: "FULL OUTER JOIN = LEFT JOIN ∪ RIGHT JOIN. Everyone's invited to the party! 🎉",
    emoji: "🔄",
  },
  {
    id: 5,
    question: "What value appears when there's no matching row in a LEFT or RIGHT JOIN?",
    options: ["0", "Empty string", "NULL", "undefined"],
    correct: 2,
    explanation: "NULL is SQL's way of saying 'I got nothing here.' It's not 0, not empty, just... nothing! 👻",
    emoji: "👻",
  },
  {
    id: 6,
    question: "If Table A has 5 rows and Table B has 3 rows with 2 matches, how many rows does INNER JOIN return?",
    options: ["8", "5", "3", "2"],
    correct: 3,
    explanation: "INNER JOIN only returns matching rows. 2 matches = 2 rows. Simple math! 🔢",
    emoji: "🔢",
  },
  {
    id: 7,
    question: "Which real-life scenario is most like a LEFT JOIN?",
    options: [
      "A class register with student grades (some students haven't submitted)",
      "A list of mutual friends",
      "A random seating arrangement",
      "A list of couples at a party",
    ],
    correct: 0,
    explanation: "All students appear on the register, but some have NULL grades — classic LEFT JOIN! 📋",
    emoji: "📋",
  },
  {
    id: 8,
    question: "TRUE or FALSE: INNER JOIN can return more rows than the original tables if there are multiple matches.",
    options: ["TRUE", "FALSE", "Only with DISTINCT", "Only with GROUP BY"],
    correct: 0,
    explanation: "If a row in Table A matches 3 rows in Table B, you get 3 result rows! JOINs can multiply! 📈",
    emoji: "📈",
  },
];

// ======= REAL-LIFE JOIN EXAMPLES (HUMOROUS) =======
export const realLifeJoins = [
  {
    id: 1,
    title: "Dating App: The INNER JOIN 💕",
    type: "INNER JOIN",
    color: "#00d4ff",
    scenario: "Only people who BOTH swiped right on each other get matched. No mutual interest? No date!",
    leftTable: "Your Swipes ➡️",
    rightTable: "Their Swipes ➡️",
    result: "Only mutual matches show up! 💑",
    memeText: "When both tables have feelings for each other...",
    emoji: "💕",
  },
  {
    id: 2,
    title: "Group Project: The LEFT JOIN 😅",
    type: "LEFT JOIN",
    color: "#00ff9d",
    scenario: "ALL students are listed in the project group. Some contribute work, some contribute... moral support (NULL contribution).",
    leftTable: "All Students 📚",
    rightTable: "Actual Contributions 📝",
    result: "Everyone's listed, some have NULL work! 😴",
    memeText: "LEFT JOIN: Where freeloaders get NULL and still pass...",
    emoji: "😅",
  },
  {
    id: 3,
    title: "Food Delivery: The RIGHT JOIN 🍕",
    type: "RIGHT JOIN",
    color: "#ff6bcd",
    scenario: "ALL restaurants are shown on the app. If nobody ordered from a restaurant, it still appears with NULL orders.",
    leftTable: "Customer Orders 🛒",
    rightTable: "All Restaurants 🏪",
    result: "Every restaurant shown, some with no orders! 😢",
    memeText: "That sad restaurant with 0 orders but still on the app...",
    emoji: "🍕",
  },
  {
    id: 4,
    title: "College Reunion: The FULL JOIN 🎓",
    type: "FULL JOIN",
    color: "#ff9f43",
    scenario: "Everyone from BOTH graduating classes is invited. Even if someone doesn't know anyone from the other class, they still show up!",
    leftTable: "Class of 2024 🎓",
    rightTable: "Class of 2025 🎓",
    result: "EVERYONE is included, matched or not! 🎉",
    memeText: "FULL JOIN: The party where even NULLs are welcome!",
    emoji: "🎓",
  },
  {
    id: 5,
    title: "Instagram: The INNER JOIN 📸",
    type: "INNER JOIN",
    color: "#00d4ff",
    scenario: "You only see posts from people you follow AND who have posted something. Following a ghost account? Nothing shows up!",
    leftTable: "Your Following List 👥",
    rightTable: "Posted Content 📷",
    result: "Only followed accounts WITH posts appear! 🖼️",
    memeText: "Following 500 people but your feed is empty...",
    emoji: "📸",
  },
  {
    id: 6,
    title: "Netflix & Friends: The LEFT JOIN 🎬",
    type: "LEFT JOIN",
    color: "#00ff9d",
    scenario: "ALL your friends are listed. Some have Netflix recommendations, some just stare at the screen and say 'whatever you want'.",
    leftTable: "All Your Friends 👫",
    rightTable: "Movie Recommendations 🎥",
    result: "All friends listed, some with NULL suggestions! 🤷",
    memeText: "'I don't care, you pick' = NULL recommendation",
    emoji: "🎬",
  },
];

// ======= JOIN TYPE DESCRIPTIONS =======
export const joinDescriptions = {
  INNER: {
    name: "INNER JOIN",
    icon: "🎯",
    color: "#00d4ff",
    shortDesc: "Returns only matching rows from both tables",
    sql: "SELECT * FROM Students INNER JOIN Courses ON Students.id = Courses.student_id",
    analogy: "Like a strict bouncer — you need to be on BOTH lists to get in!",
  },
  LEFT: {
    name: "LEFT JOIN",
    icon: "⬅️",
    color: "#00ff9d",
    shortDesc: "Returns ALL rows from the left table + matches from right",
    sql: "SELECT * FROM Students LEFT JOIN Courses ON Students.id = Courses.student_id",
    analogy: "Left table VIPs get in no matter what. Right table? Only if you match!",
  },
  RIGHT: {
    name: "RIGHT JOIN",
    icon: "➡️",
    color: "#ff6bcd",
    shortDesc: "Returns ALL rows from the right table + matches from left",
    sql: "SELECT * FROM Students RIGHT JOIN Courses ON Students.id = Courses.student_id",
    analogy: "Right table VIPs enter freely. Left table needs a match to tag along!",
  },
  FULL: {
    name: "FULL OUTER JOIN",
    icon: "🔄",
    color: "#ff9f43",
    shortDesc: "Returns ALL rows from both tables, matched or not",
    sql: "SELECT * FROM Students FULL OUTER JOIN Courses ON Students.id = Courses.student_id",
    analogy: "Open-door party! Everyone from both tables is welcome, NULLs and all!",
  },
};
