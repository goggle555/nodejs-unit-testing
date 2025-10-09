export const judgeGrade = (score: number) => {
  if (score < 0 || score > 100) {
    throw new Error("スコアは0-100の範囲である必要があります");
  }

  if (score >= 90) return "A";

  if (score >= 80) return "B";

  if (score >= 70) return "C";

  if (score >= 60) return "D";

  return "F";
};
