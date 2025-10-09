export const calculatePrice = (age: number) => {
  if (age < 0) {
    throw new Error("年齢は0以上である必要があります");
  }

  // 幼児: 無料
  if (age < 6) {
    return 0;
  }

  // 子供: 500円
  if (age < 18) {
    return 500;
  }

  // 大人: 1000円
  if (age < 65) {
    return 1000;
  }

  // シニア: 800円
  return 800;
};
