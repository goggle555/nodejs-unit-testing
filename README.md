# Node.js Unit Testing

TypeScriptとvitestを使用したユニットテストの実践例プロジェクトです。同値分割、境界値分析、デシジョンテーブルなどのテスト技法を学ぶことができます。

## 🔧 必要な環境

- Node.js >= 22

## 🚀 セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd nodejs-unit-testing

# 依存関係のインストール
npm install
```

## 💻 使い方

### テストの実行

```bash
# すべてのテストを実行（ウォッチモード）
npm test

# テストを1回だけ実行
npm run test -- --run

# カバレッジレポートの生成
npm run coverage

# カバレッジレポートをブラウザで見る
npx vitest --ui
```

Bunでもテストを実行できます。
Bunのほうが速いです。

```bash
# すべてのテストを実行
bun test

# カバレッジレポートの生成
bun test --coverage
```

### コード品質

```bash
# リント（チェックのみ）
npm run lint

# フォーマット（自動修正）
npm run format
```

## 📚 テスト技法の例

このプロジェクトでは、以下のテスト技法の実装例を提供しています。

### 1. 同値分割（Equivalence Partitioning）

同じ動作をする入力値のグループから代表値を選んでテストする技法です。

**例: 年齢による料金計算**
- 幼児（0-5歳）→ 無料
- 子供（6-17歳）→ 500円
- 大人（18-64歳）→ 1000円
- シニア（65歳以上）→ 800円

```typescript
// 各クラスから代表値を選択
it('幼児(0-5歳): 無料 - 代表値3歳', () => {
  expect(calculatePrice(3)).toBe(0);
});
```

### 2. 境界値分析（Boundary Value Analysis）

各同値クラスの境界値とその前後をテストする技法です。

**例: グレード判定の境界**
- 59点 → F
- 60点 → D（境界値）
- 61点 → D

```typescript
describe('FとDの境界 (60点)', () => {
  it('境界の直前: 59点 → F', () => {
    expect(judgeGrade(59)).toBe('F');
  });
  it('境界値: 60点 → D', () => {
    expect(judgeGrade(60)).toBe('D');
  });
  it('境界の直後: 61点 → D', () => {
    expect(judgeGrade(61)).toBe('D');
  });
});
```

### 3. デシジョンテーブル（Decision Table）

複数の条件の組み合わせを表形式で整理し、すべてのパターンをテストする技法です。

**例: 割引計算**

| 会員タイプ | 購入金額 | クーポン | 割引率 |
|---------|---------|---------|--------|
| premium | >= 10000 | あり | 30% |
| premium | >= 10000 | なし | 25% |
| regular | >= 10000 | あり | 20% |
| ... | ... | ... | ... |

```typescript
it('ケース1: プレミアム + 高額 + クーポン → 30%', () => {
  expect(calculateDiscount('premium', 10000, true)).toBe(0.3);
});
```

## 🛠️ 開発ツール

### Vitest

高速で現代的なテストフレームワーク。以下の機能を提供します：

- 高速なテスト実行
- ウォッチモード
- カバレッジレポート
- TypeScriptネイティブサポート

### Biome

高速なリンター＆フォーマッター。以下の特徴があります：

- ESLintとPrettierの代替
- 超高速な動作
- 統一された設定

### Husky + lint-staged

Git コミット前に自動的にコード品質チェックを実行します：

- コミット前にBiomeでフォーマット
- 品質の高いコードベースを維持

## 📄 ライセンス

ISC
