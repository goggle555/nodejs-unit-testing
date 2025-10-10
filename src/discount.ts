// discount.ts
export type MemberType = "premium" | "regular" | "guest";

/**
 * 割引率を計算する（整数で返す: 20% → 20）
 *
 * @param memberType - 会員タイプ
 * @param purchaseAmount - 購入金額
 * @param hasCoupon - クーポンの有無
 * @returns 割引率（パーセント、整数）
 */
export const calculateDiscountRate = (
  memberType: MemberType,
  purchaseAmount: number,
  hasCoupon: boolean,
) => {
  let discountRate = 0;

  // 会員タイプによる基本割引
  if (memberType === "premium") {
    discountRate = 20; // 20%割引
  } else if (memberType === "regular") {
    discountRate = 10; // 10%割引
  }

  // 高額購入ボーナス
  if (purchaseAmount >= 10000) {
    discountRate += 5; // 追加5%割引
  }

  // クーポン使用
  if (hasCoupon) {
    discountRate += 5; // 追加5%割引
  }

  // 最大割引率は30%
  return Math.min(discountRate, 30);
};

/**
 * 割引後の金額を計算する
 *
 * @param originalAmount - 元の金額
 * @param discountRate - 割引率（パーセント、整数）
 * @returns 割引後の金額（整数）
 */
export const calculateDiscountedAmount = (
  originalAmount: number,
  discountRate: number,
) => {
  if (originalAmount < 0) {
    throw new Error("金額は0以上である必要があります");
  }

  if (discountRate < 0 || discountRate > 100) {
    throw new Error("割引率は0-100の範囲である必要があります");
  }

  // 整数演算で計算: 割引額 = 元の金額 × 割引率 / 100
  const discountAmount = Math.floor((originalAmount * discountRate) / 100);

  return originalAmount - discountAmount;
};

/**
 * 割引額を計算する
 *
 * @param originalAmount - 元の金額
 * @param discountRate - 割引率（パーセント、整数）
 * @returns 割引額（整数）
 */
export const calculateDiscountAmount = (
  originalAmount: number,
  discountRate: number,
) => {
  if (originalAmount < 0) {
    throw new Error("金額は0以上である必要があります");
  }

  if (discountRate < 0 || discountRate > 100) {
    throw new Error("割引率は0-100の範囲である必要があります");
  }

  // 整数演算で計算: 割引額 = 元の金額 × 割引率 / 100（切り捨て）
  return Math.floor((originalAmount * discountRate) / 100);
};
