export type MemberType = "premium" | "regular" | "guest";

export const calculateDiscount = (
  memberType: MemberType,
  purchaseAmount: number,
  hasCoupon: boolean,
) => {
  let discountRate = 0;

  // 会員タイプによる基本割引
  if (memberType === "premium") {
    discountRate = 0.2; // 20%割引
  } else if (memberType === "regular") {
    discountRate = 0.1; // 10%割引
  }

  // 高額購入ボーナス
  if (purchaseAmount >= 10000) {
    discountRate += 0.05; // 追加5%割引
  }

  // クーポン使用
  if (hasCoupon) {
    discountRate += 0.05; // 追加5%割引
  }

  // 最大割引率は30%
  return Math.min(discountRate, 0.3);
};
