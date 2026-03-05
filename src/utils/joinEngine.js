// ======= JOIN LOGIC ENGINE =======
// Performs actual SQL-like JOIN operations on datasets

/**
 * INNER JOIN: Returns only rows where both tables have matching keys
 */
export function innerJoin(leftTable, rightTable, leftKey, rightKey) {
  const results = [];
  leftTable.forEach((leftRow) => {
    rightTable.forEach((rightRow) => {
      if (leftRow[leftKey] === rightRow[rightKey]) {
        results.push({
          left: { ...leftRow },
          right: { ...rightRow },
          type: "matched",
        });
      }
    });
  });
  return results;
}

/**
 * LEFT JOIN: Returns all left rows + matching right rows (NULL for unmatched)
 */
export function leftJoin(leftTable, rightTable, leftKey, rightKey) {
  const results = [];
  leftTable.forEach((leftRow) => {
    const matches = rightTable.filter((r) => r[rightKey] === leftRow[leftKey]);
    if (matches.length > 0) {
      matches.forEach((rightRow) => {
        results.push({
          left: { ...leftRow },
          right: { ...rightRow },
          type: "matched",
        });
      });
    } else {
      results.push({
        left: { ...leftRow },
        right: null,
        type: "null-fill",
      });
    }
  });
  return results;
}

/**
 * RIGHT JOIN: Returns all right rows + matching left rows (NULL for unmatched)
 */
export function rightJoin(leftTable, rightTable, leftKey, rightKey) {
  const results = [];
  rightTable.forEach((rightRow) => {
    const matches = leftTable.filter((l) => l[leftKey] === rightRow[rightKey]);
    if (matches.length > 0) {
      matches.forEach((leftRow) => {
        results.push({
          left: { ...leftRow },
          right: { ...rightRow },
          type: "matched",
        });
      });
    } else {
      results.push({
        left: null,
        right: { ...rightRow },
        type: "null-fill",
      });
    }
  });
  return results;
}

/**
 * FULL OUTER JOIN: Returns all rows from both tables, matched and unmatched
 */
export function fullJoin(leftTable, rightTable, leftKey, rightKey) {
  const results = [];
  const matchedRightIds = new Set();

  // First, iterate left table (like LEFT JOIN)
  leftTable.forEach((leftRow) => {
    const matches = rightTable.filter((r) => r[rightKey] === leftRow[leftKey]);
    if (matches.length > 0) {
      matches.forEach((rightRow) => {
        results.push({
          left: { ...leftRow },
          right: { ...rightRow },
          type: "matched",
        });
        matchedRightIds.add(rightRow.id);
      });
    } else {
      results.push({
        left: { ...leftRow },
        right: null,
        type: "null-fill",
      });
    }
  });

  // Then add unmatched right rows
  rightTable.forEach((rightRow) => {
    if (!matchedRightIds.has(rightRow.id)) {
      results.push({
        left: null,
        right: { ...rightRow },
        type: "null-fill",
      });
    }
  });

  return results;
}

/**
 * Execute a join based on type string
 */
export function executeJoin(type, leftTable, rightTable, leftKey, rightKey) {
  switch (type) {
    case "INNER":
      return innerJoin(leftTable, rightTable, leftKey, rightKey);
    case "LEFT":
      return leftJoin(leftTable, rightTable, leftKey, rightKey);
    case "RIGHT":
      return rightJoin(leftTable, rightTable, leftKey, rightKey);
    case "FULL":
      return fullJoin(leftTable, rightTable, leftKey, rightKey);
    default:
      return [];
  }
}
