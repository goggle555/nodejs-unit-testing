// loan.test.ts
import { describe, expect, it } from "vitest";
import { judgeLoanApplication, type LoanApplication } from "./loan.js";

describe("judgeLoanApplication - デシジョンテーブル", () => {
  describe("信用スコア: excellent", () => {
    it("ケース1: 正社員 + 高収入 → approved", () => {
      const app: LoanApplication = {
        creditScore: "excellent",
        employmentStatus: "fulltime",
        hasCollateral: false,
        annualIncome: 6000000,
      };
      expect(judgeLoanApplication(app)).toBe("approved");
    });

    it("ケース2: 正社員 + 低収入 → conditional", () => {
      const app: LoanApplication = {
        creditScore: "excellent",
        employmentStatus: "fulltime",
        hasCollateral: false,
        annualIncome: 4000000,
      };
      expect(judgeLoanApplication(app)).toBe("conditional");
    });

    it("ケース3: パート + 高収入 → approved", () => {
      const app: LoanApplication = {
        creditScore: "excellent",
        employmentStatus: "parttime",
        hasCollateral: false,
        annualIncome: 5000000,
      };
      expect(judgeLoanApplication(app)).toBe("approved");
    });

    it("ケース4: パート + 低収入 → conditional", () => {
      const app: LoanApplication = {
        creditScore: "excellent",
        employmentStatus: "parttime",
        hasCollateral: false,
        annualIncome: 3000000,
      };
      expect(judgeLoanApplication(app)).toBe("conditional");
    });
  });

  describe("信用スコア: good", () => {
    it("ケース5: 正社員 + 高収入 → approved", () => {
      const app: LoanApplication = {
        creditScore: "good",
        employmentStatus: "fulltime",
        hasCollateral: false,
        annualIncome: 4000000,
      };
      expect(judgeLoanApplication(app)).toBe("approved");
    });

    it("ケース6: 正社員 + 担保あり + 低収入 → conditional", () => {
      const app: LoanApplication = {
        creditScore: "good",
        employmentStatus: "fulltime",
        hasCollateral: true,
        annualIncome: 3000000,
      };
      expect(judgeLoanApplication(app)).toBe("conditional");
    });

    it("ケース7: 正社員 + 担保なし + 低収入 → rejected", () => {
      const app: LoanApplication = {
        creditScore: "good",
        employmentStatus: "fulltime",
        hasCollateral: false,
        annualIncome: 3000000,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });

    it("ケース8: パート + 担保あり → conditional", () => {
      const app: LoanApplication = {
        creditScore: "good",
        employmentStatus: "parttime",
        hasCollateral: true,
        annualIncome: 2000000,
      };
      expect(judgeLoanApplication(app)).toBe("conditional");
    });

    it("ケース9: パート + 担保なし → rejected", () => {
      const app: LoanApplication = {
        creditScore: "good",
        employmentStatus: "parttime",
        hasCollateral: false,
        annualIncome: 2000000,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });
  });

  describe("信用スコア: fair", () => {
    it("ケース10: 正社員 + 担保あり + 高収入 → conditional", () => {
      const app: LoanApplication = {
        creditScore: "fair",
        employmentStatus: "fulltime",
        hasCollateral: true,
        annualIncome: 6000000,
      };
      expect(judgeLoanApplication(app)).toBe("conditional");
    });

    it("ケース11: 正社員 + 低収入 → rejected", () => {
      const app: LoanApplication = {
        creditScore: "fair",
        employmentStatus: "fulltime",
        hasCollateral: true,
        annualIncome: 4000000,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });

    it("ケース12: パート → rejected", () => {
      const app: LoanApplication = {
        creditScore: "fair",
        employmentStatus: "parttime",
        hasCollateral: true,
        annualIncome: 3000000,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });
  });

  describe("その他のケース", () => {
    it("ケース13: 信用スコアpoor → rejected", () => {
      const app: LoanApplication = {
        creditScore: "poor",
        employmentStatus: "fulltime",
        hasCollateral: true,
        annualIncome: 8000000,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });

    it("ケース14: 無職 → rejected", () => {
      const app: LoanApplication = {
        creditScore: "excellent",
        employmentStatus: "unemployed",
        hasCollateral: true,
        annualIncome: 0,
      };
      expect(judgeLoanApplication(app)).toBe("rejected");
    });
  });
});
