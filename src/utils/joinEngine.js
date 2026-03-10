// ====================================================
//  JOIN ENGINE — All 9 Join Types with Full Logic
// ====================================================

/** INNER JOIN: Only matching rows */
export function innerJoin(left, right, lKey, rKey) {
  const results = [];
  left.forEach(l => {
    right.forEach(r => {
      if (l[lKey] === r[rKey]) {
        results.push({ left: { ...l }, right: { ...r }, type: "matched" });
      }
    });
  });
  return results;
}

/** LEFT JOIN: All left + matching right (NULL if no match) */
export function leftJoin(left, right, lKey, rKey) {
  const results = [];
  left.forEach(l => {
    const matches = right.filter(r => r[rKey] === l[lKey]);
    if (matches.length > 0) {
      matches.forEach(r => results.push({ left: { ...l }, right: { ...r }, type: "matched" }));
    } else {
      results.push({ left: { ...l }, right: null, type: "null-fill" });
    }
  });
  return results;
}

/** RIGHT JOIN: All right + matching left */
export function rightJoin(left, right, lKey, rKey) {
  const results = [];
  right.forEach(r => {
    const matches = left.filter(l => l[lKey] === r[rKey]);
    if (matches.length > 0) {
      matches.forEach(l => results.push({ left: { ...l }, right: { ...r }, type: "matched" }));
    } else {
      results.push({ left: null, right: { ...r }, type: "null-fill" });
    }
  });
  return results;
}

/** FULL OUTER JOIN: All rows from both */
export function fullJoin(left, right, lKey, rKey) {
  const results = [];
  const matchedRightIds = new Set();
  left.forEach(l => {
    const matches = right.filter(r => r[rKey] === l[lKey]);
    if (matches.length > 0) {
      matches.forEach(r => {
        results.push({ left: { ...l }, right: { ...r }, type: "matched" });
        matchedRightIds.add(r.id);
      });
    } else {
      results.push({ left: { ...l }, right: null, type: "null-fill" });
    }
  });
  right.forEach(r => {
    if (!matchedRightIds.has(r.id)) {
      results.push({ left: null, right: { ...r }, type: "null-fill" });
    }
  });
  return results;
}

/** LEFT EXCLUSIVE JOIN: Only left rows with NO match in right */
export function leftExclusiveJoin(left, right, lKey, rKey) {
  const results = [];
  left.forEach(l => {
    const hasMatch = right.some(r => r[rKey] === l[lKey]);
    if (!hasMatch) {
      results.push({ left: { ...l }, right: null, type: "exclusive" });
    }
  });
  return results;
}

/** RIGHT EXCLUSIVE JOIN: Only right rows with NO match in left */
export function rightExclusiveJoin(left, right, lKey, rKey) {
  const results = [];
  right.forEach(r => {
    const hasMatch = left.some(l => l[lKey] === r[rKey]);
    if (!hasMatch) {
      results.push({ left: null, right: { ...r }, type: "exclusive" });
    }
  });
  return results;
}

/** CROSS JOIN: Cartesian product */
export function crossJoin(left, right) {
  const results = [];
  left.forEach(l => {
    right.forEach(r => {
      results.push({ left: { ...l }, right: { ...r }, type: "cross" });
    });
  });
  return results;
}

/** SELF JOIN: Join table with itself using friendship data */
export function selfJoin(residents, friendships) {
  const results = [];
  friendships.forEach(f => {
    const person = residents.find(r => r.id === f.resident_id);
    const friend = residents.find(r => r.id === f.best_friend_id);
    if (person && friend) {
      results.push({
        left: { ...person },
        right: { ...friend, label: f.label },
        type: person.id === friend.id ? "self-ref" : "matched",
      });
    } else if (person) {
      results.push({ left: { ...person }, right: null, type: "null-fill" });
    }
  });
  return results;
}

/** NATURAL JOIN: Auto-match on shared column names */
export function naturalJoin(left, right) {
  const leftKeys = Object.keys(left[0] || {});
  const rightKeys = Object.keys(right[0] || {});
  const sharedKeys = leftKeys.filter(k => rightKeys.includes(k));

  if (sharedKeys.length === 0) return [];

  const results = [];
  left.forEach(l => {
    right.forEach(r => {
      const match = sharedKeys.every(k => l[k] === r[k]);
      if (match) {
        const merged = { ...l, ...r };
        results.push({ left: { ...l }, right: { ...r }, type: "matched", merged });
      }
    });
  });
  return results;
}

/** Master executor */
export function executeJoin(type, config) {
  switch (type) {
    case "INNER":    return innerJoin(config.left, config.right, config.lKey, config.rKey);
    case "LEFT":     return leftJoin(config.left, config.right, config.lKey, config.rKey);
    case "RIGHT":    return rightJoin(config.left, config.right, config.lKey, config.rKey);
    case "FULL":     return fullJoin(config.left, config.right, config.lKey, config.rKey);
    case "LEFT_EX":  return leftExclusiveJoin(config.left, config.right, config.lKey, config.rKey);
    case "RIGHT_EX": return rightExclusiveJoin(config.left, config.right, config.lKey, config.rKey);
    case "CROSS":    return crossJoin(config.crossLeft || config.left, config.crossRight || config.right);
    case "SELF":     return selfJoin(config.selfTable, config.friendships);
    case "NATURAL":  return naturalJoin(config.natLeft, config.natRight);
    default:         return [];
  }
}
