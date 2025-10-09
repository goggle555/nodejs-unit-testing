import { describe, expect, it } from "vitest";
import { calculateDiscount } from "./discount.js";

describe("calculateDiscount - デシジョンテーブル", () => {
  describe("プレミアム会員", () => {
    it("ケース1: 高額購入 + クーポンあり → 30%", () => {
      expect(calculateDiscount("premium", 10000, true)).toBe(0.3);
    });

    it("ケース2: 高額購入 + クーポンなし → 25%", () => {
      expect(calculateDiscount("premium", 10000, false)).toBe(0.25);
    });

    it("ケース3: 通常購入 + クーポンあり → 25%", () => {
      expect(calculateDiscount("premium", 5000, true)).toBe(0.25);
    });

    it("ケース4: 通常購入 + クーポンなし → 20%", () => {
      expect(calculateDiscount("premium", 5000, false)).toBe(0.2);
    });
  });

  describe("一般会員", () => {
    it("ケース5: 高額購入 + クーポンあり → 20%", () => {
      expect(calculateDiscount("regular", 10000, true)).toBe(0.2);
    });

    it("ケース6: 高額購入 + クーポンなし → 15%", () => {
      expect(calculateDiscount("regular", 10000, false)).toBe(0.15);
    });

    it("ケース7: 通常購入 + クーポンあり → 15%", () => {
      expect(calculateDiscount("regular", 5000, true)).toBe(0.15);
    });

    it("ケース8: 通常購入 + クーポンなし → 10%", () => {
      expect(calculateDiscount("regular", 5000, false)).toBe(0.1);
    });
  });

  describe("ゲスト", () => {
    it("ケース9: 高額購入 + クーポンあり → 10%", () => {
      expect(calculateDiscount("guest", 10000, true)).toBe(0.1);
    });

    it("ケース10: 高額購入 + クーポンなし → 5%", () => {
      expect(calculateDiscount("guest", 10000, false)).toBe(0.05);
    });

    it("ケース11: 通常購入 + クーポンあり → 5%", () => {
      expect(calculateDiscount("guest", 5000, true)).toBe(0.05);
    });

    it("ケース12: 通常購入 + クーポンなし → 0%", () => {
      expect(calculateDiscount("guest", 5000, false)).toBe(0);
    });
  });
});
