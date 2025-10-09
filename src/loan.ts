// loan.ts
export type CreditScore = "excellent" | "good" | "fair" | "poor";
export type EmploymentStatus = "fulltime" | "parttime" | "unemployed";

export interface LoanApplication {
  creditScore: CreditScore;
  employmentStatus: EmploymentStatus;
  hasCollateral: boolean;
  annualIncome: number;
}

export type LoanDecision = "approved" | "conditional" | "rejected";

export const judgeLoanApplication = (app: LoanApplication) => {
  // 無職は即却下
  if (app.employmentStatus === "unemployed") {
    return "rejected";
  }

  // 信用スコアが優秀
  if (app.creditScore === "excellent") {
    if (app.annualIncome >= 5000000) {
      return "approved";
    }
    return "conditional";
  }

  // 信用スコアが良好
  if (app.creditScore === "good") {
    if (app.employmentStatus === "fulltime" && app.annualIncome >= 4000000) {
      return "approved";
    }
    if (app.hasCollateral) {
      return "conditional";
    }
    return "rejected";
  }

  // 信用スコアが普通
  if (app.creditScore === "fair") {
    if (
      app.employmentStatus === "fulltime" &&
      app.hasCollateral &&
      app.annualIncome >= 6000000
    ) {
      return "conditional";
    }
    return "rejected";
  }

  // 信用スコアが悪い
  return "rejected";
};
