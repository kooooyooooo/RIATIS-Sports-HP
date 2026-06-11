# リファクタリング記録(設計フェーズ / Phase 0)

ブリーフv3の実装(Phase 1〜6)に着手する前の準備として、**見た目・挙動を変えない**リファクタリングを実施した。変更内容と意図の記録。設計本体は [DESIGN.md](./DESIGN.md) を参照。

## 方針

- 視覚・挙動への影響ゼロ(コピー・色・レイアウト・アニメーションは一切変更しない)
- ビルドレス構成(HTML + CSS + JS 各1ファイル、Vercel配信)は維持
- 今後の実装で必要になる「トークン層」「コンポーネント単位の構造」を先に用意する

## styles.css

1. **設計トークン層の導入**(`:root`)
   - フォントスタックを `--font-display` / `--font-display-jp` / `--font-serif` / `--font-sans` / `--font-mono` に集約し、全使用箇所を変数参照へ置換。
   - 頻出イージング `cubic-bezier(0.77, 0, 0.175, 1)` / `cubic-bezier(0.22, 1, 0.36, 1)` を `--ease-power` / `--ease-soft` に集約。
   - カラートークンは**現行値のまま**。v3パレット(`#D7003A` 等)への差し替えは実装フェーズ2で行う(DESIGN.md §6)。
2. **目次コメントとセクション見出し**を追加(1. Design tokens 〜 16. Reduced motion)。各セクション名は DESIGN.md §5 のコンポーネント名と対応付けた。
3. **`.cursor-pulse` のスタイルを移管**: 従来 `script.js` が `<style>` タグを動的注入していたものを、スタイルシート本体(3. Overlays)へ移動。

## script.js

1. 平置きのスクリプトを機能単位の関数に分割: `initMobileMenu()` / `initReveal()` / `initScrollTheater()` / `initCursorPulse()`。今後の新規コンポーネント(`initContactForm()` 等)も同パターンで追加する。
2. `prefers-reduced-motion` の MediaQueryList を `reducedMotionQuery` として一度だけ生成(従来は mousemove のたびに `matchMedia` を呼んでいた)。
3. CSS動的注入コード(`document.head.appendChild(pulseStyle)`)を削除(styles.css へ移管済み)。

## 変更していないもの

- `index.html`(コンテンツ・構造ともに無変更。v3の構成変更は Phase 1 で実施)
- `vercel.json` / `assets/`
- カラー値・コピー・アニメーション挙動

## 検証

- `node --check script.js` で構文確認
- CSSの波括弧バランス・変数参照の整合を機械チェック
- ローカルHTTPサーバーで全アセットが200で配信されることを確認
