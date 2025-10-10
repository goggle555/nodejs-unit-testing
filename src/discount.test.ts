// discount.test.ts
import { describe, expect, it } from "vitest";
import {
  calculateDiscountAmount,
  calculateDiscountedAmount,
  calculateDiscountRate,
} from "./discount.js";

describe("calculateDiscountRate - デシジョンテーブル", () => {
  describe("プレミアム会員", () => {
    it("ケース1: 高額購入 + クーポンあり → 30%", () => {
      expect(calculateDiscountRate("premium", 10000, true)).toBe(30);
    });

    it("ケース2: 高額購入 + クーポンなし → 25%", () => {
      expect(calculateDiscountRate("premium", 10000, false)).toBe(25);
    });

    it("ケース3: 通常購入 + クーポンあり → 25%", () => {
      expect(calculateDiscountRate("premium", 5000, true)).toBe(25);
    });

    it("ケース4: 通常購入 + クーポンなし → 20%", () => {
      expect(calculateDiscountRate("premium", 5000, false)).toBe(20);
    });
  });

  describe("一般会員", () => {
    it("ケース5: 高額購入 + クーポンあり → 20%", () => {
      expect(calculateDiscountRate("regular", 10000, true)).toBe(20);
    });

    it("ケース6: 高額購入 + クーポンなし → 15%", () => {
      expect(calculateDiscountRate("regular", 10000, false)).toBe(15);
    });

    it("ケース7: 通常購入 + クーポンあり → 15%", () => {
      expect(calculateDiscountRate("regular", 5000, true)).toBe(15);
    });

    it("ケース8: 通常購入 + クーポンなし → 10%", () => {
      expect(calculateDiscountRate("regular", 5000, false)).toBe(10);
    });
  });

  describe("ゲスト", () => {
    it("ケース9: 高額購入 + クーポンあり → 10%", () => {
      expect(calculateDiscountRate("guest", 10000, true)).toBe(10);
    });

    it("ケース10: 高額購入 + クーポンなし → 5%", () => {
      expect(calculateDiscountRate("guest", 10000, false)).toBe(5);
    });

    it("ケース11: 通常購入 + クーポンあり → 5%", () => {
      expect(calculateDiscountRate("guest", 5000, true)).toBe(5);
    });

    it("ケース12: 通常購入 + クーポンなし → 0%", () => {
      expect(calculateDiscountRate("guest", 5000, false)).toBe(0);
    });
  });
});

describe("calculateDiscountRate - 境界値分析（購入金額）", () => {
  describe("高額購入の境界 (10000円)", () => {
    it("境界の直前: 9999円 → ボーナスなし", () => {
      const rate = calculateDiscountRate("premium", 9999, false);
      expect(rate).toBe(20); // プレミアムの基本割引のみ
    });

    it("境界値: 10000円 → ボーナスあり", () => {
      const rate = calculateDiscountRate("premium", 10000, false);
      expect(rate).toBe(25); // 基本20% + ボーナス5%
    });

    it("境界の直後: 10001円 → ボーナスあり", () => {
      const rate = calculateDiscountRate("premium", 10001, false);
      expect(rate).toBe(25); // 基本20% + ボーナス5%
    });
  });
});

describe("calculateDiscountedAmount - 割引後金額の計算", () => {
  describe("正常系", () => {
    it("10000円の商品に20%割引 → 8000円", () => {
      expect(calculateDiscountedAmount(10000, 20)).toBe(8000);
    });

    it("5000円の商品に10%割引 → 4500円", () => {
      expect(calculateDiscountedAmount(5000, 10)).toBe(4500);
    });

    it("1000円の商品に30%割引 → 700円", () => {
      expect(calculateDiscountedAmount(1000, 30)).toBe(700);
    });

    it("割引率0% → 元の金額と同じ", () => {
      expect(calculateDiscountedAmount(10000, 0)).toBe(10000);
    });

    it("割引率100% → 0円", () => {
      expect(calculateDiscountedAmount(10000, 100)).toBe(0);
    });
  });

  describe("端数処理（切り捨て）", () => {
    it("1000円の商品に15%割引 → 850円（150円引き）", () => {
      // 1000 * 15 / 100 = 150（割引額）
      expect(calculateDiscountedAmount(1000, 15)).toBe(850);
    });

    it("999円の商品に20%割引 → 800円（199.8円 → 199円引き）", () => {
      // 999 * 20 / 100 = 199.8 → 切り捨てで199円割引
      // 999 - 199 = 800
      expect(calculateDiscountedAmount(999, 20)).toBe(800);
    });

    it("100円の商品に3%割引 → 97円（3円引き）", () => {
      // 100 * 3 / 100 = 3
      expect(calculateDiscountedAmount(100, 3)).toBe(97);
    });

    it("99円の商品に10%割引 → 90円（9.9円 → 9円引き）", () => {
      // 99 * 10 / 100 = 9.9 → 切り捨てで9円割引
      // 99 - 9 = 90
      expect(calculateDiscountedAmount(99, 10)).toBe(90);
    });
  });

  describe("異常系", () => {
    it("負の金額 → エラー", () => {
      expect(() => calculateDiscountedAmount(-1000, 20)).toThrow(
        "金額は0以上である必要があります",
      );
    });

    it("負の割引率 → エラー", () => {
      expect(() => calculateDiscountedAmount(1000, -10)).toThrow(
        "割引率は0-100の範囲である必要があります",
      );
    });

    it("100を超える割引率 → エラー", () => {
      expect(() => calculateDiscountedAmount(1000, 101)).toThrow(
        "割引率は0-100の範囲である必要があります",
      );
    });
  });
});

describe("calculateDiscountAmount - 割引額の計算", () => {
  describe("正常系", () => {
    it("10000円の20%割引 → 2000円", () => {
      expect(calculateDiscountAmount(10000, 20)).toBe(2000);
    });

    it("5000円の10%割引 → 500円", () => {
      expect(calculateDiscountAmount(5000, 10)).toBe(500);
    });

    it("1000円の30%割引 → 300円", () => {
      expect(calculateDiscountAmount(1000, 30)).toBe(300);
    });
  });

  describe("端数処理（切り捨て）", () => {
    it("999円の20%割引 → 199円（199.8円を切り捨て）", () => {
      expect(calculateDiscountAmount(999, 20)).toBe(199);
    });

    it("100円の15%割引 → 15円", () => {
      expect(calculateDiscountAmount(100, 15)).toBe(15);
    });

    it("99円の10%割引 → 9円（9.9円を切り捨て）", () => {
      expect(calculateDiscountAmount(99, 10)).toBe(9);
    });

    it("1円の50%割引 → 0円（0.5円を切り捨て）", () => {
      expect(calculateDiscountAmount(1, 50)).toBe(0);
    });
  });
});

describe("統合テスト - 実際の購入フロー", () => {
  it("プレミアム会員が15000円の商品をクーポン付きで購入", () => {
    const memberType = "premium";
    const amount = 15000;
    const hasCoupon = true;

    // 割引率を計算
    const discountRate = calculateDiscountRate(memberType, amount, hasCoupon);
    expect(discountRate).toBe(30); // 20% + 5% + 5% = 30%

    // 割引額を計算
    const discountAmount = calculateDiscountAmount(amount, discountRate);
    expect(discountAmount).toBe(4500); // 15000 * 30 / 100 = 4500

    // 割引後金額を計算
    const finalAmount = calculateDiscountedAmount(amount, discountRate);
    expect(finalAmount).toBe(10500); // 15000 - 4500 = 10500
  });

  it("ゲストが8000円の商品を購入（クーポンなし）", () => {
    const memberType = "guest";
    const amount = 8000;
    const hasCoupon = false;

    // 割引率を計算
    const discountRate = calculateDiscountRate(memberType, amount, hasCoupon);
    expect(discountRate).toBe(0); // 割引なし

    // 割引後金額を計算
    const finalAmount = calculateDiscountedAmount(amount, discountRate);
    expect(finalAmount).toBe(8000); // 割引なし
  });

  it("一般会員が9999円の商品をクーポン付きで購入（境界値）", () => {
    const memberType = "regular";
    const amount = 9999;
    const hasCoupon = true;

    // 割引率を計算（10000円未満なので高額購入ボーナスなし）
    const discountRate = calculateDiscountRate(memberType, amount, hasCoupon);
    expect(discountRate).toBe(15); // 10% + 5% = 15%

    // 割引額を計算
    const discountAmount = calculateDiscountAmount(amount, discountRate);
    expect(discountAmount).toBe(1499); // 9999 * 15 / 100 = 1499.85 → 1499

    // 割引後金額を計算
    const finalAmount = calculateDiscountedAmount(amount, discountRate);
    expect(finalAmount).toBe(8500); // 9999 - 1499 = 8500
  });
});
