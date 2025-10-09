import { describe, expect, it } from "vitest";
import { calculatePrice } from "./price.js";

describe("calculatePrice - 同値分割", () => {
  describe("有効な同値クラス", () => {
    it("幼児(0-5歳): 無料 - 代表値3歳", () => {
      expect(calculatePrice(3)).toBe(0);
    });

    it("子供(6-17歳): 500円 - 代表値12歳", () => {
      expect(calculatePrice(12)).toBe(500);
    });

    it("大人(18-64歳): 1000円 - 代表値30歳", () => {
      expect(calculatePrice(30)).toBe(1000);
    });

    it("シニア(65歳以上): 800円 - 代表値70歳", () => {
      expect(calculatePrice(70)).toBe(800);
    });
  });

  describe("無効な同値クラス", () => {
    it("負の年齢: エラー - 代表値-1", () => {
      expect(() => calculatePrice(-1)).toThrow(
        "年齢は0以上である必要があります",
      );
    });
  });
});

describe("calculatePrice - 境界値分析", () => {
  describe("幼児と子供の境界 (6歳)", () => {
    it("境界の直前: 5歳 → 0円", () => {
      expect(calculatePrice(5)).toBe(0);
    });

    it("境界値: 6歳 → 500円", () => {
      expect(calculatePrice(6)).toBe(500);
    });
  });

  describe("子供と大人の境界 (18歳)", () => {
    it("境界の直前: 17歳 → 500円", () => {
      expect(calculatePrice(17)).toBe(500);
    });

    it("境界値: 18歳 → 1000円", () => {
      expect(calculatePrice(18)).toBe(1000);
    });
  });

  describe("大人とシニアの境界 (65歳)", () => {
    it("境界の直前: 64歳 → 1000円", () => {
      expect(calculatePrice(64)).toBe(1000);
    });

    it("境界値: 65歳 → 800円", () => {
      expect(calculatePrice(65)).toBe(800);
    });
  });

  describe("最小値の境界 (0)", () => {
    it("境界の直前: -1 → エラー", () => {
      expect(() => calculatePrice(-1)).toThrow();
    });

    it("境界値: 0歳 → 0円", () => {
      expect(calculatePrice(0)).toBe(0);
    });
  });
});
