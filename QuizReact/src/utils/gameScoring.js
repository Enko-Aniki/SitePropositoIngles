const CATEGORY_MAX_SCORES = [
  { pattern: /\ba1\b|\beasy\b|\bfacil\b/, maxScore: 10 },
  { pattern: /\bb1\b|\bmedium\b|\bmedio\b/, maxScore: 100 },
  { pattern: /\bc1\b|\bhard\b|\bdificil\b/, maxScore: 500 },
];

export const getMaxScoreForCategory = (category) => {
  const normalizedCategory = String(category)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const match = CATEGORY_MAX_SCORES.find(({ pattern }) =>
    pattern.test(normalizedCategory),
  );

  if (!match) {
    throw new Error(`Unsupported game difficulty: ${category}`);
  }

  return match.maxScore;
};
