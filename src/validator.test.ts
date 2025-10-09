import { describe, expect, it } from "vitest";
import { validateUsername } from "./validator.js";

describe("validateUsername - 境界値分析", () => {
  describe("最小長の境界 (3文字)", () => {
    it("境界の直前: 2文字 → false", () => {
      expect(validateUsername("ab")).toBe(false);
    });

    it("境界値: 3文字 → true", () => {
      expect(validateUsername("abc")).toBe(true);
    });

    it("境界の直後: 4文字 → true", () => {
      expect(validateUsername("abcd")).toBe(true);
    });
  });

  describe("最大長の境界 (20文字)", () => {
    it("境界の直前: 19文字 → true", () => {
      expect(validateUsername("a".repeat(19))).toBe(true);
    });

    it("境界値: 20文字 → true", () => {
      expect(validateUsername("a".repeat(20))).toBe(true);
    });

    it("境界の直後: 21文字 → false", () => {
      expect(validateUsername("a".repeat(21))).toBe(false);
    });
  });

  describe("特殊ケース", () => {
    it("空文字 → false", () => {
      expect(validateUsername("")).toBe(false);
    });
  });
});
