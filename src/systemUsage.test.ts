// systemUsage.test.ts
import { describe, expect, it } from "vitest";
import {
  canUseSystem,
  getRemainingUsageCount,
  type SystemUsage,
  useSystem,
} from "./systemUsage.js";

describe("canUseSystem - 同値分割", () => {
  describe("有効な同値クラス", () => {
    it("使用可能: 使用回数0、上限10 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 0,
      };
      expect(canUseSystem(usage)).toBe(true);
    });

    it("使用可能: 使用回数5、上限10 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 5,
      };
      expect(canUseSystem(usage)).toBe(true);
    });

    it("使用不可: 使用回数10、上限10 → false", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 10,
      };
      expect(canUseSystem(usage)).toBe(false);
    });
  });

  describe("無効な同値クラス", () => {
    it("使用可能回数が負の値 → エラー", () => {
      const usage: SystemUsage = {
        maxUsageCount: -1,
        currentUsageCount: 0,
      };
      expect(() => canUseSystem(usage)).toThrow(
        "使用可能回数は0以上である必要があります",
      );
    });

    it("使用回数が負の値 → エラー", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: -1,
      };
      expect(() => canUseSystem(usage)).toThrow(
        "使用回数は0以上である必要があります",
      );
    });

    it("使用回数が上限を超過 → エラー", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 11,
      };
      expect(() => canUseSystem(usage)).toThrow(
        "使用回数が使用可能回数を超えています",
      );
    });
  });
});

describe("canUseSystem - 境界値分析", () => {
  describe("使用回数0の境界", () => {
    it("境界の直前: -1 → エラー", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: -1,
      };
      expect(() => canUseSystem(usage)).toThrow();
    });

    it("境界値: 0 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 0,
      };
      expect(canUseSystem(usage)).toBe(true);
    });

    it("境界の直後: 1 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 1,
      };
      expect(canUseSystem(usage)).toBe(true);
    });
  });

  describe("使用可能回数の境界（上限10の場合）", () => {
    it("境界の直前: 使用回数8 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 8,
      };
      expect(canUseSystem(usage)).toBe(true);
    });

    it("境界の直前: 使用回数9 → true", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 9,
      };
      expect(canUseSystem(usage)).toBe(true);
    });

    it("境界値: 使用回数10 → false（使用不可）", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 10,
      };
      expect(canUseSystem(usage)).toBe(false);
    });

    it("境界の直後: 使用回数11 → エラー", () => {
      const usage: SystemUsage = {
        maxUsageCount: 10,
        currentUsageCount: 11,
      };
      expect(() => canUseSystem(usage)).toThrow();
    });
  });

  describe("上限0の特殊ケース", () => {
    it("上限0、使用回数0 → false（即座に使用不可）", () => {
      const usage: SystemUsage = {
        maxUsageCount: 0,
        currentUsageCount: 0,
      };
      expect(canUseSystem(usage)).toBe(false);
    });
  });
});

describe("canUseSystem - デシジョンテーブル", () => {
  // デシジョンテーブル
  // | # | 上限  | 使用回数 | 上限と使用回数の関係 | 期待結果 |
  // |---|------|---------|-------------------|---------|
  // | 1 | >= 0 | >= 0    | 上限 > 使用回数    | true    |
  // | 2 | >= 0 | >= 0    | 上限 = 使用回数    | false   |
  // | 3 | >= 0 | < 0     | -                 | error   |
  // | 4 | < 0  | >= 0    | -                 | error   |
  // | 5 | >= 0 | >= 0    | 上限 < 使用回数    | error   |

  it("ケース1: 上限10、使用回数5 (上限 > 使用回数) → true", () => {
    expect(canUseSystem({ maxUsageCount: 10, currentUsageCount: 5 })).toBe(
      true,
    );
  });

  it("ケース2: 上限10、使用回数10 (上限 = 使用回数) → false", () => {
    expect(canUseSystem({ maxUsageCount: 10, currentUsageCount: 10 })).toBe(
      false,
    );
  });

  it("ケース3: 上限10、使用回数-1 (使用回数が負) → error", () => {
    expect(() =>
      canUseSystem({ maxUsageCount: 10, currentUsageCount: -1 }),
    ).toThrow();
  });

  it("ケース4: 上限-1、使用回数0 (上限が負) → error", () => {
    expect(() =>
      canUseSystem({ maxUsageCount: -1, currentUsageCount: 0 }),
    ).toThrow();
  });

  it("ケース5: 上限10、使用回数15 (上限 < 使用回数) → error", () => {
    expect(() =>
      canUseSystem({ maxUsageCount: 10, currentUsageCount: 15 }),
    ).toThrow();
  });
});

describe("useSystem - システム使用機能", () => {
  it("使用可能な状態でシステムを使用 → 使用回数が1増える", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 5,
    };
    const result = useSystem(usage);

    expect(result.currentUsageCount).toBe(6);
    expect(result.maxUsageCount).toBe(10);
  });

  it("使用回数0からシステムを使用 → 使用回数が1になる", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 0,
    };
    const result = useSystem(usage);

    expect(result.currentUsageCount).toBe(1);
  });

  it("使用不可の状態でシステムを使用 → エラー", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 10,
    };

    expect(() => useSystem(usage)).toThrow("システムは使用できません");
  });

  it("元のオブジェクトは変更されない（イミュータブル）", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 5,
    };
    const result = useSystem(usage);

    expect(usage.currentUsageCount).toBe(5); // 元は変更されない
    expect(result.currentUsageCount).toBe(6); // 新しいオブジェクトが返される
  });
});

describe("getRemainingUsageCount - 残り使用回数の取得", () => {
  it("使用回数0の場合 → 上限と同じ", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 0,
    };
    expect(getRemainingUsageCount(usage)).toBe(10);
  });

  it("使用回数5の場合 → 残り5", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 5,
    };
    expect(getRemainingUsageCount(usage)).toBe(5);
  });

  it("使用回数が上限に達した場合 → 残り0", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 10,
    };
    expect(getRemainingUsageCount(usage)).toBe(0);
  });

  it("境界値: 残り1回", () => {
    const usage: SystemUsage = {
      maxUsageCount: 10,
      currentUsageCount: 9,
    };
    expect(getRemainingUsageCount(usage)).toBe(1);
  });
});

describe("統合テスト - システム使用の流れ", () => {
  it("システムを連続で使用し、上限に達する", () => {
    let usage: SystemUsage = {
      maxUsageCount: 3,
      currentUsageCount: 0,
    };

    // 1回目
    expect(canUseSystem(usage)).toBe(true);
    expect(getRemainingUsageCount(usage)).toBe(3);
    usage = useSystem(usage);

    // 2回目
    expect(canUseSystem(usage)).toBe(true);
    expect(getRemainingUsageCount(usage)).toBe(2);
    usage = useSystem(usage);

    // 3回目
    expect(canUseSystem(usage)).toBe(true);
    expect(getRemainingUsageCount(usage)).toBe(1);
    usage = useSystem(usage);

    // 上限に達した
    expect(canUseSystem(usage)).toBe(false);
    expect(getRemainingUsageCount(usage)).toBe(0);
    expect(() => useSystem(usage)).toThrow("システムは使用できません");
  });
});
