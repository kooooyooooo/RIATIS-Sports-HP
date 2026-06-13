# GenSeki Gothic — Attribution

このディレクトリには、源石ゴシック (GenSeki Gothic) のサブセット版を含む。

- **元フォント**: GenSeki Gothic (源石ゴシック / 源石黑體)
- **作者・配布元**: ButTaiwan — https://github.com/ButTaiwan/genseki-font
- **採用バージョン**: Ver 2.100 (2024-08-22)
- **派生元系統**: Genki Gothic → Source Han Sans V2.0 (Adobe, "Source" は Reserved Font Name)
- **ライセンス**: SIL Open Font License 1.1（同梱 `OFL.txt`）

## 本サイトでの利用範囲

- 用途: オープニング演出「マスクライズ」の `RIATIS` / `SPORTS INC.` 表記のみ
- 抽出文字: `R I A T S P O N C . (space)` の11字（実ファイル `RIATIS-Display-H.subset.woff2`）
- weight: `H` (Heavy / `usWeightClass` 900)
- 配信: 自社ホスティング (WOFF2)

## 改変内容

- pyftsubset (fontTools 4.63.0) によるサブセット化
- WOFF2 化 (brotli/zopfli)
- `--no-hinting` / `--desubroutinize` / 不要テーブル除去（`DSIG/BASE/JSTF/VORG`）
- フォント内部の `name` テーブル (family / PostScript / license) は維持

## CSS上の参照

セルフホストの WOFF2 は CSS 上では internal alias `"RIATIS Display"` で参照する。
これは OFL の Reserved Font Name 規程との衝突を避けるための安全策（実害は無いが、
派生派配布物として明示するための運用）。

## サブセット拡張時の注意

将来、上記11字以外（本文用JP/PJP）を使う場合は、元 OTF から別サブセットを
作り直し、別ファイル名 (例: `RIATIS-Display-H.body.subset.woff2`) として
配置すること。
