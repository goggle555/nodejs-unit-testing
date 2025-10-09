import { describe, expect, it } from "vitest";
import { judgeGrade } from "./grade.js";

describe("judgeGrade - 同値分割", () => {
  describe("有効な同値クラス", () => {
    it("グレードA (90-100点) - 代表値95", () => {
      expect(judgeGrade(95)).toBe("A");
    });

    it("グレードB (80-89点) - 代表値85", () => {
      expect(judgeGrade(85)).toBe("B");
    });

    it("グレードC (70-79点) - 代表値75", () => {
      expect(judgeGrade(75)).toBe("C");
    });

    it("グレードD (60-69点) - 代表値65", () => {
      expect(judgeGrade(65)).toBe("D");
    });

    it("グレードF (0-59点) - 代表値30", () => {
      expect(judgeGrade(30)).toBe("F");
    });
  });

  describe("無効な同値クラス", () => {
    it("範囲外(負の値) - 代表値-10", () => {
      expect(() => judgeGrade(-10)).toThrow();
    });

    it("範囲外(100超) - 代表値150", () => {
      expect(() => judgeGrade(150)).toThrow();
    });
  });
});

describe("judgeGrade - 境界値分析", () => {
  describe("最小値の境界 (0点)", () => {
    it("境界の直前: -1点 → エラー", () => {
      expect(() => judgeGrade(-1)).toThrow();
    });

    it("境界値: 0点 → F", () => {
      expect(judgeGrade(0)).toBe("F");
    });

    it("境界の直後: 1点 → F", () => {
      expect(judgeGrade(1)).toBe("F");
    });
  });

  describe("FとDの境界 (60点)", () => {
    it("境界の直前: 59点 → F", () => {
      expect(judgeGrade(59)).toBe("F");
    });

    it("境界値: 60点 → D", () => {
      expect(judgeGrade(60)).toBe("D");
    });

    it("境界の直後: 61点 → D", () => {
      expect(judgeGrade(61)).toBe("D");
    });
  });

  describe("DとCの境界 (70点)", () => {
    it("境界の直前: 69点 → D", () => {
      expect(judgeGrade(69)).toBe("D");
    });

    it("境界値: 70点 → C", () => {
      expect(judgeGrade(70)).toBe("C");
    });

    it("境界の直後: 71点 → C", () => {
      expect(judgeGrade(71)).toBe("C");
    });
  });

  describe("CとBの境界 (80点)", () => {
    it("境界の直前: 79点 → C", () => {
      expect(judgeGrade(79)).toBe("C");
    });

    it("境界値: 80点 → B", () => {
      expect(judgeGrade(80)).toBe("B");
    });

    it("境界の直後: 81点 → B", () => {
      expect(judgeGrade(81)).toBe("B");
    });
  });

  describe("BとAの境界 (90点)", () => {
    it("境界の直前: 89点 → B", () => {
      expect(judgeGrade(89)).toBe("B");
    });

    it("境界値: 90点 → A", () => {
      expect(judgeGrade(90)).toBe("A");
    });

    it("境界の直後: 91点 → A", () => {
      expect(judgeGrade(91)).toBe("A");
    });
  });

  describe("最大値の境界 (100点)", () => {
    it("境界の直前: 99点 → A", () => {
      expect(judgeGrade(99)).toBe("A");
    });

    it("境界値: 100点 → A", () => {
      expect(judgeGrade(100)).toBe("A");
    });

    it("境界の直後: 101点 → エラー", () => {
      expect(() => judgeGrade(101)).toThrow();
    });
  });
});
