/**
 * システムの使用状況
 */
export interface SystemUsage {
  /** 使用可能回数 */
  maxUsageCount: number;
  /** 現在の使用回数 */
  currentUsageCount: number;
}

/**
 * システムの使用可否をチェックする
 *
 * @param usage - システムの使用状況
 * @returns true: 使用可能、false: 使用不可
 *
 * @throws {Error} 使用可能回数が負の値の場合
 * @throws {Error} 使用回数が負の値の場合
 * @throws {Error} 使用回数が使用可能回数を超えている場合
 */
export const canUseSystem = (usage: SystemUsage) => {
  // 入力値の検証
  if (usage.maxUsageCount < 0) {
    throw new Error("使用可能回数は0以上である必要があります");
  }

  if (usage.currentUsageCount < 0) {
    throw new Error("使用回数は0以上である必要があります");
  }

  if (usage.currentUsageCount > usage.maxUsageCount) {
    throw new Error("使用回数が使用可能回数を超えています");
  }

  // 使用可能回数が使用回数より大きい場合、使用可能
  return usage.maxUsageCount > usage.currentUsageCount;
};

/**
 * システムを使用する（使用回数をインクリメント）
 *
 * @param usage - システムの使用状況
 * @returns 更新後の使用状況
 *
 * @throws {Error} システムが使用不可の場合
 */
export const useSystem = (usage: SystemUsage) => {
  if (!canUseSystem(usage)) {
    throw new Error("システムは使用できません");
  }

  return {
    ...usage,
    currentUsageCount: usage.currentUsageCount + 1,
  };
};

/**
 * 残り使用可能回数を取得する
 *
 * @param usage - システムの使用状況
 * @returns 残り使用可能回数
 */
export const getRemainingUsageCount = (usage: SystemUsage) => {
  return usage.maxUsageCount - usage.currentUsageCount;
};
