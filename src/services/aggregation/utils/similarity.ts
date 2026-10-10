/**
 * Calculates string similarity ratio between 0 and 1
 */
export function calculateStringSimilarity(strA: string, strB: string): number {
  if (!strA || !strB) return 0;
  if (strA.toLowerCase() === strB.toLowerCase()) return 1.0;

  const normalize = (s: string) => 
    s.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);

  const tokensA = new Set(normalize(strA));
  const tokensB = new Set(normalize(strB));

  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let intersection = 0;
  tokensA.forEach(t => {
    if (tokensB.has(t)) intersection++;
  });

  const union = new Set([...tokensA, ...tokensB]).size;
  return union > 0 ? intersection / union : 0;
}

export function isFuzzyDuplicate(
  titleA: string, 
  titleB: string, 
  orgA: string, 
  orgB: string, 
  threshold = 0.72
): { isDuplicate: boolean; score: number } {
  const titleScore = calculateStringSimilarity(titleA, titleB);
  const orgScore = calculateStringSimilarity(orgA, orgB);

  // If organization matches closely, title similarity requires lower threshold
  const weightedScore = (orgScore > 0.6)
    ? (titleScore * 0.75 + orgScore * 0.25)
    : titleScore;

  return {
    isDuplicate: weightedScore >= threshold,
    score: Math.round(weightedScore * 100) / 100
  };
}
