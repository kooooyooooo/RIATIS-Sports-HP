# RIATIS Sports コーポレートサイト 設計書

ブリーフ「PULSE DRIVEN CORPORATE v3(Visional基軸 × RIATIS Pulse Driven 統合最適化版)」に基づく再設計の設計ドキュメント。
本書は **実装前の設計フェーズ** の成果物であり、実装はここで定義した構成・命名・フェーズ計画に従って行う。

- 対象リポジトリ: `RIATIS-Sports-HP`(ビルドレスの静的サイト / Vercel配信)
- 関連ドキュメント: [REFACTORING.md](./REFACTORING.md)(設計フェーズで実施した既存コードのリファクタリング記録)

---

## 1. コンセプト

| 項目 | 内容 |
| --- | --- |
| コンセプト名 | PULSE DRIVEN CORPORATE |
| 一文定義 | RIATIS Sportsは、スポーツ・ヘルスケア・教育領域の専門知を、学び・実装・AIの力で現場成果へ変える会社です。 |
| 企業としての核 | 知識を、人生が躍動する力に変える。 |
| メインメッセージ | TURN KNOWLEDGE INTO MOMENTUM. / 知識を、社会を前に進む力へ。 |
| サブタグライン | BEAT FOR THOSE WHO BLEED SPORTS.(現行Heroの主役コピーをサブへ降格して継続使用) |
| カルチャー | MOVE FAST. BUILD THE FUTURE.(Join the Pulse セクションで使用) |

Visionalから転用するのは **企業サイトとしての設計思想**(Heroの企業メッセージ、導線整理、MVVの明示、事業群の一覧化、News導線、Company/Contact/Footerでの信頼担保)のみ。ビジュアル・文言は模倣しない。

---

## 2. 現状(as-is)と v3(to-be)のギャップ分析

### 2.1 現状の構成

```
Header(nav: Why / Belief / Services / Contact)
Hero(BEAT FOR THOSE WHO BLEED SPORTS. が主コピー)
ECG装飾バンド(LEARN / GROW / CHALLENGE)
Scroll Theater「Why」(ACT 01 理不尽 → 02 学び → 03 挑戦 → 04 前進)
Belief System(5 Values: Velocity / Pioneer / Foresight / Evolve / Humanity)
Purpose 赤バンド(誰もが学び、成長し、挑戦できるスポーツ界を、共に)
Services(4件: 動画Platform / AI Coaching / チームマッチング / メディア・SNS)
CTA(READY TO MOVE JAPAN? → mailto リンク)
Footer(ロゴ + コピーライトのみ)
```

### 2.2 ギャップ一覧

| # | 項目 | 現状 | v3での扱い | 変更種別 |
| --- | --- | --- | --- | --- |
| 1 | Hero主コピー | BEAT FOR THOSE WHO BLEED SPORTS. | TURN KNOWLEDGE INTO MOMENTUM. に差し替え。BEAT〜はHero内サブタグラインへ | 改修 |
| 2 | Hero説明文 | 情緒コピーのみ | 一文定義(会社が何をしているか)を追加 | 改修 |
| 3 | Why We Exist | Scroll Theater 4幕 | 内容はほぼ同一。`01 / THE UNFAIRNESS` 等の番号見出し形式へ再構成 | 改修 |
| 4 | RIATIS Way(MVV) | **存在しない** | Mission / Vision / Purpose を黒背景セクションとして新設 | 新規 |
| 5 | Belief System | 5 Values(Pioneer含む)、和文のみ | `Ownership / Own the Outcome` 等、英語サブコピー付き5 Valuesへ更新 | 改修 |
| 6 | Services | 4件・名称が旧仕様 | 3件(RIATIS / REGAIN / SAC)+ 対象タグ・CTA付きカードへ。AI Coaching は REGAIN が機能を内包するため独立カード化せず、Matching / Media は不要と判断しカット(2026-06-12 ユーザー決定) | 改修+新規 |
| 7 | Business Structure | **存在しない** | 「How RIATIS Moves」事業構造フロー図を新設 | 新規 |
| 8 | Pulse Journal | **存在しない** | News/Projects/Insights 最新3件表示を新設(一覧ページは将来) | 新規 |
| 9 | Join the Pulse | CTA1ボタンのみ | 募集カテゴリ(講師・パートナー・インターン等)を持つセクションへ拡張 | 改修 |
| 10 | Company Profile | **存在しない** | 会社概要テーブルを新設(正式情報確認後に反映) | 新規 |
| 11 | Contact | mailtoリンクのみ | 問い合わせ種別+フォーム(またはフォームへの導線)へ | 改修 |
| 12 | Footer | ロゴ+コピーライトのみ | サイトマップ + Legal(Privacy / Terms / 特商法)+ サービスリンクへ拡張 | 改修 |
| 13 | 背景色設計 | 全セクション黒基調 | 黒(Hero / RIATIS Way / Contact)と白(Services / Company 等)の交互構成へ | 改修 |
| 14 | カラートークン | red `#d4111c` / bg `#0a0a0a` | red `#D7003A` / black `#0D0D0D` / off-white `#F7F7F4` 等のv3パレットへ | 改修 |
| 15 | SEO / OGP | title・descriptionのみ | v3指定のtitle / description / OGP / Organization構造化データ | 改修+新規 |
| 16 | 法務ページ | **存在しない** | Privacy Policy / Terms / 特商法(正式原稿の確認後に作成) | 新規 |

---

## 3. 情報設計(IA)

### 3.1 ページ構成

フェーズ1ではワンページ(`index.html`)構成を維持し、将来の拡張に備えてアンカーIDをページ化可能な命名にする。

```
/                  … トップ(全セクション)
/journal/          … Pulse Journal 一覧(将来追加。トップは最新3件のみ)
/privacy/ /terms/ /tokushoho/ … 法務ページ(正式原稿確認後に追加)
```

IRやSustainability等は現時点では作らないが、ナビとフッターのリスト構造を増設可能な形で実装する。

### 3.2 トップページのセクション順序とテーマ

| # | セクション | アンカーID | 背景テーマ | 対応コンポーネント |
| --- | --- | --- | --- | --- |
| 1 | Header | – | 透過(blend) | `Header` / `MobileMenu` |
| 2 | Hero | `#top` | **黒** | `Hero` |
| 3 | Why We Exist | `#why` | **黒**(Scroll Theater継続) | `StatementBlock` |
| 4 | RIATIS Way(MVV) | `#way` | **黒** + 赤番号 | `RiatisWay` |
| 5 | Belief System | `#belief` | **黒** | `ValueList` |
| 6 | Services | `#services` | **白**(`#F7F7F4`) | `ServiceGrid` |
| 7 | Business Structure | `#structure` | **白** | `BusinessFlow` |
| 8 | Pulse Journal | `#journal` | **白** | `JournalList` |
| 9 | Join the Pulse | `#join` | **黒** | `PartnerCTA` |
| 10 | Company Profile | `#company` | **白** | `CompanyTable` |
| 11 | Contact | `#contact` | **黒**(熱量高く締める) | `ContactForm` |
| 12 | Footer | – | **黒**(Deep Gray区切り) | `Footer` |

黒→白→黒のリズムで「熱量」と「信頼感」を交互に作る。Purpose赤バンドは RIATIS Way セクションの締めとして統合する(独立セクションとしては廃止)。

### 3.3 ナビゲーション

```
RIATIS Sports(ロゴ → #top)
About(#why)
RIATIS Way(#way)
Services(#services)
Journal(#journal)
Careers(#join)
Company(#company)
Contact(#contact)※右上CTAボタン
```

- ヘッダー右上CTAは **`Contact`**(法人感優先)。最終CTAセクションでは **`Join the Pulse`** を使う(ブリーフ3.2の推奨どおり)。
- モバイルはハンバーガー(現行の `MobileMenu` 実装を継続。フルスクリーンオーバーレイ)。

---

## 4. セクション別設計

各セクションの確定コピーはブリーフv3の該当章をそのまま正とする(本書では構成だけ定義し、コピーの二重管理をしない)。

### 4.1 Hero(ブリーフ §4)

- 構成: メタ行(`RIATIS SPORTS / EST. 2025`)→ 大見出し `TURN KNOWLEDGE / INTO MOMENTUM.` → 和文リード → 一文定義 → サブタグライン `BEAT FOR THOSE WHO BLEED SPORTS.` → CTA 2つ(`Explore RIATIS` → #services / `Contact us` → #contact)。
- ビジュアル: 案A+C のハイブリッド。「黒背景 + 大英字 + 一本の赤Pulseライン」。現行のヒーロー背景画像(`riatis-pulse-hero.png`)は彩度・コントラストを落として継続利用可。BPM表示は装飾として控えめに残す。
- 禁止: 炎・稲妻・過度な筋肉表現・重い動画背景・グリッチ。
- 既存の行ごとスライドインアニメーションは継続(reduced-motion時は無効)。

### 4.2 Why We Exist(ブリーフ §5)

- セクション名は `Why We Exist`。現行 Scroll Theater(sticky 4幕)は v3 の `01 THE UNFAIRNESS 〜 04 JAPAN FORWARD` と内容が一致しているため**演出ごと継続**し、見出しラベルだけ v3 表記(`01 / THE UNFAIRNESS` 形式)へ更新する。
- 冒頭に statement(「スポーツを愛し、〜共に押し上げます。」)を固定表示ブロックとして追加。
- モバイル / reduced-motion 時は sticky 演出をやめ、番号付き縦積みリストにフォールバックする。

### 4.3 RIATIS Way(ブリーフ §6)— 新設

- タイトル: `RIATIS Way` / サブ `Mission / Vision / Value` / リード「知識を人の力に変え、挑戦のそばに届ける。」
- 黒背景 + 赤い大型番号(01 Mission / 02 Vision / 03 Purpose)。各項目は「英ラベル → 日本語ステートメント(大) → 補足文」の3層。
- Purpose(「誰もが学び、成長し、挑戦できるスポーツ界を、共に。」)は本セクション末尾の赤バンドとして現行 `band` の見た目を継承する。

### 4.4 Belief System(ブリーフ §7)

- タイトル: `Belief System / Five fires that keep us running.`(現行踏襲)。
- 5 Valuesを v3 の統合版へ更新:

| # | Value | 英サブ | 日本語 |
| --- | --- | --- | --- |
| 01 | Velocity | Empower Faster | 誰よりも速く、誰かの力になる。 |
| 02 | Ownership(旧 Pioneer) | Own the Outcome | 自ら引き受け、自ら切り開く。 |
| 03 | Foresight | Build Now | 未来を予測し、今つくる。 |
| 04 | Evolve | Learn Deep | 学び続け、学問を愛する。 |
| 05 | Humanity | Lead with Love | 人を起点に、誠実に導く。 |

- `Own or Die` は外部サイトでは使用しない(ブリーフ7.3)。
- カードUI(グリッド線 + ホバーで赤面スライド)は現行実装を継続。各カードに詳細文(ブリーフ7.3)を追加し、ホバー/タップで表示するか常時表示かは実装時にモバイル可読性で判断(初期実装は常時表示を推奨)。

### 4.5 Services(ブリーフ §8 / 2026-06-12 改訂)

- 白背景(`#F7F7F4`)へ変更し信頼感を出す。タイトル `Services / What we are building.`
- 3カード(2026-06-12にユーザー判断で6→3へ縮約):
  - `S/01 RIATIS`(Knowledge Platform)
  - `S/02 REGAIN`(AI Implementation)— ブリーフv3でAI Coachingに分かれていた機能を内包
  - `S/03 SAC`(Smart Athlete Class / 若年層育成)
- カード構造: `番号(S/0n) → カテゴリ → サービス名 → 一行コピー → 説明 → 対象タグ → CTA`。
- 現行のリスト型(行ホバーで赤が走る)を白背景用に反転調整して継続。CTAリンク先は当面 `#contact`(各サービスの個別ページは将来)。
- 注意: RIATISを単なる動画学習サービスに、REGAINを単なるAI研修に見せない(カテゴリ表記とコピーで担保)。
- 削除した旧カード:`AI Coaching`(REGAINに吸収)/ `Matching`(コアコンピタンス外)/ `Media / SNS`(コアコンピタンス外)。将来の復活はユーザー再確認後。

### 4.6 Business Structure(ブリーフ §9)— 新設

- タイトル: `How RIATIS Moves` / リード「知識を集め、届け、実装し、前進へ変える。」
- 4段の縦フロー: `Experts / Research / Practice` →(Convert)→ `Contents / AI / Tools / Programs` →(Deliver)→ `Athletes / Coaches / Teams / Schools / Businesses` →(Momentum)→ `Learning / Growth / Challenge / Japan Forward`。
- 実装はHTML+CSSのみで図解(SVG画像にしない。レスポンシブで縦積みに自然に崩れる構造)。矢印部に赤のPulseライン装飾。

### 4.7 Pulse Journal(ブリーフ §10)— 新設

- タイトル: `Pulse Journal / News / Projects / Insights`。
- カテゴリ: News / Projects / Insights / Media / Events(カテゴリバッジで表現)。
- トップには最新3件のみ。データは当面 `index.html` 内のマークアップ(または `journal.json` を fetch しない静的記述)で管理し、CMS導入はスコープ外。
- 記事が未供給の間は「準備中」プレースホルダーを置かず、ローンチ告知等の実在エントリを最低1件入れてから公開する(要・記事原稿)。

### 4.8 Join the Pulse(ブリーフ §11)

- タイトル: `Join the Pulse` / リード「共に学び、現場を動かす仲間へ。」+ 本文(ブリーフ11.3)。
- `MOVE FAST. BUILD THE FUTURE.` をこのセクションの英字大コピーとして使用。
- 募集カテゴリ8種(講師・専門家パートナー / コンテンツ監修者 / REGAIN開発・実装パートナー / AI・IT活用支援メンバー / 営業・マーケ / 学生インターン / 協業企業 / スポンサー・PR)をタグリストで表示。
- CTAボタン `Join the Pulse` → #contact(問い合わせ種別をプリセット)。
- 現行の `READY TO MOVE JAPAN?` 大コピーは Contact セクション側へ移す。

### 4.9 Company Profile(ブリーフ §12)— 新設

- 白背景の定義リスト型テーブル(`dl`)。項目: 会社名 / 英語表記 / 代表者 / 設立 / 資本金 / 事業内容 / 主要サービス / 所在地。
- **所在地・電話・メール等は正式情報の確認が取れるまで実装しない**(プレースホルダーの固定値を入れることを禁止。確認前は項目ごと非表示)。

### 4.10 Contact(ブリーフ §13)

- 黒背景。サブコピー `READY TO MOVE JAPAN?` を大英字で使用し、熱量高く締める。
- 問い合わせ種別10種(ブリーフ13.2)をセレクトまたはラジオで提示。
- フォーム項目: 名前 / 会社名・所属 / メールアドレス / 問い合わせ種別 / 問い合わせ内容。全項目に `label` 明示。
- **送信先バックエンドが未確定**のため、フェーズ1では「種別付き `mailto:` リンク + フォームUIの静的実装(送信は外部フォームサービス決定後に接続)」とする。→ §8 要確認事項。

### 4.11 Footer(ブリーフ §14)

- 最上部に `TURN KNOWLEDGE INTO MOMENTUM.`、最下部に小さく `DIRECTION 01 - PULSE DRIVEN`(現行表記を継承)。
- 3カラムのリンク群: サイトマップ(About〜Contact)/ Legal(Privacy Policy / Terms / 特商法 ※ページ完成まではリンク無効化ではなく**掲載自体を保留**)/ Services(6サービス)。
- コピーライト: `© 2026 RIATIS Sports Inc. All rights reserved.`

---

## 5. コンポーネント設計

ビルドレス構成のため「コンポーネント」は **HTMLセクション + BEM風クラス名 + 対応するCSSレイヤ + JSイニシャライザ** の単位で定義する。

| コンポーネント | ルートクラス | JS | 備考 |
| --- | --- | --- | --- |
| Header | `.site-header` | – | mix-blend-modeで背景に追従 |
| MobileMenu | `.nav-links` + `.menu-btn` | `initMobileMenu()` | 実装済み(継続) |
| Hero | `.hero` | – (CSSアニメーション) | コピー差し替え |
| StatementBlock | `.statement`(現 `.scroll-theater` を改名) | `initScrollTheater()` | reduced-motionフォールバック追加 |
| RiatisWay | `.way` | `initReveal()` 共用 | 新規 |
| ValueList | `.values` / `.value` | `initReveal()` 共用 | 実装済み(コピー更新) |
| ServiceGrid | `.svc-list` / `.svc-item` | `initReveal()` 共用 | 白背景バリアント追加 |
| BusinessFlow | `.flow` | `initReveal()` 共用 | 新規 |
| JournalList | `.journal` | – | 新規 |
| PartnerCTA | `.join` | – | 新規(現 `.cta-final` から分離) |
| CompanyTable | `.company` | – | 新規 |
| ContactForm | `.contact` | `initContactForm()`(送信先決定後) | 新規 |
| Footer | `.site-footer`(現 `footer` 直指定を改名) | – | 拡張 |

### JS構成方針

`script.js` は機能単位の `init*()` 関数に分割済み(リファクタリング実施済み、REFACTORING.md参照)。新規コンポーネントも同パターンで追加する。外部ライブラリは導入しない(Vanilla JS継続)。

### セクションテーマの実装方針

背景の黒/白切り替えは、セクションごとの個別CSSではなく `data-theme="dark" | "light"` 属性 + CSSカスタムプロパティの再定義で行う:

```css
[data-theme="light"] {
  --bg: var(--color-off-white);
  --fg: var(--color-black);
  --muted: rgba(13, 13, 13, 0.55);
  --line: rgba(13, 13, 13, 0.12);
}
```

これにより既存コンポーネント(eyebrow / stitle / svc-item等)を両テーマで再利用できる。

---

## 6. デザイントークン(v3)

実装フェーズで `:root` を以下へ更新する。**現時点ではコードに適用しない**(見た目変更は開発フェーズの作業)。

```css
:root {
  /* v3 カラーパレット(ブリーフ §15.3) */
  --color-red: #D7003A;        /* 現 #d4111c から変更 */
  --color-black: #0D0D0D;      /* 現 #0a0a0a から変更 */
  --color-white: #FFFFFF;
  --color-off-white: #F7F7F4;  /* 白背景セクションのベース */
  --color-light-gray: #E8E8E8; /* 白背景セクションの罫線・面 */
  --color-deep-gray: #171717;  /* 黒背景セクションの面・カード */

  /* タイポグラフィ(現行を踏襲) */
  --font-display: "Anton", sans-serif;            /* 英字大見出し */
  --font-display-jp: "Anton", "Noto Sans JP", sans-serif;
  --font-serif: "Shippori Mincho", serif;          /* 和文の情緒コピー */
  --font-sans: "Noto Sans JP", sans-serif;         /* 本文 */
  --font-mono: "JetBrains Mono", monospace;        /* メタ情報・番号 */

  /* モーション */
  --ease-power: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### 色の使い方(ブリーフ §15.4)

- 赤は**アクセント専用**(番号・ライン・ホバー面・Purpose帯)。面積の広い使用はPurpose帯とECG帯のみに制限し「赤を使いすぎない」を守る。
- 赤だけで情報を伝えない(必ずテキストラベルを併記)。コントラスト比は白背景上の赤テキストを含め WCAG AA を確認する。

---

## 7. モーション / アクセシビリティ / SEO

### 7.1 モーション(ブリーフ §16)

採用: **オープニング演出(後述)** → Hero英字フェードイン(既存)/ 赤Pulseラインのスクロール連動 / Serviceカードホバーで赤線伸長(既存)/ RIATIS Way番号のスクロール浮上(`initReveal()` 共用)/ BPM数字の静かな変化(既存)。
不採用: 重い動画背景・派手なグリッチ・読みにくいパララックス・スマホで重い3D。

`prefers-reduced-motion: reduce` では全アニメーション無効(既存の包括ルールを継続)+ Scroll Theaterを静的リストにフォールバック。

#### 7.1.1 オープニング演出「マスクライズ」(Phase 1.5 / 2026-06-12 追加要件)

ページロード時にHeroより前に独立したオープニングオーバーレイを表示する。「線が伸びる＝成長・躍動」をキーモチーフに、黒からブランドレッドへ転換する5段階シーケンスで構成する。

**コンセプト**

黒背景に「RIATIS」の各文字が見えない切り欠き(マスク)から下から立ち上がり、ブランドレッドの細線が引かれたあと、その線が画面全体へ拡張して赤背景+タグライン表示へ転換する。

**画面構成**

- フルスクリーンオーバーレイ(`position: fixed; inset: 0; z-index: 9999`)を1枚配置。
- 内部は縦中央揃え(flex column / gap 16px)で上から順に:
  1. メインロゴ「RIATIS」
     - フォント: 太いサンセリフ(font-weight: 700)、letter-spacing: 0.04em
     - サイズ: `clamp(40px, 9vw, 96px)` / white-space: nowrap
     - 文字色(Phase 1〜3): `#C8C8C8`
  2. サブテキスト「SPORTS INC.」
     - サイズ: `clamp(13px, 2.4vw, 18px)` / letter-spacing: 0.42em
     - 文字色(Phase 1〜3): `#8A8A8A`
  3. アクセントライン(width: 140px / height: 2px / background: `#D71200`)
  4. タグライン「知識を社会が躍動する力へ。」
     - サイズ: `clamp(14px, 2.4vw, 18px)` / letter-spacing: 0.08em
     - 文字色: `#FFFFFF`(Phase 5でのみ可視)

**アニメーションタイムライン**

| Phase | 区間 | 内容 |
| --- | --- | --- |
| 1 文字立ち上がり | 0〜約1100ms | 黒背景。「RIATIS」各文字をマスク構造(`overflow: hidden` の親 + 子 `<span>`)で包み、`translateY(110%)` → `translateY(0)` で立ち上げる。duration 620ms / easing `cubic-bezier(0.16, 1, 0.3, 1)` / R→I→A→T→I→Sの順に65msずつstagger。マスク外では文字が完全に不可視であること(opacityフェードではなく切り欠きから現れる表現) |
| 2 サブテキスト+ライン | 約840〜1500ms | 最後の文字立ち上がりに重ねて開始。「SPORTS INC.」は opacity 0→1(duration 450ms / ease-out)。その120ms後にアクセントラインを `scaleX(0)` → `scaleX(1)`(duration 520ms / easing `cubic-bezier(0.77, 0, 0.18, 1)` / transform-origin: center)で中央から左右に伸長 |
| 3 ホールド | 約1500〜2400ms | 全要素表示のまま約900ms静止。タグラインはまだ非表示 |
| 4 赤拡張による転換 | 約2400〜3000ms | `#D71200` のフルスクリーンレイヤを文字より背面・黒背景より前面に配置し、`scaleY(0.006)` → `scaleY(1)`(transform-origin: `50% 62%` / duration 560ms / easing `cubic-bezier(0.77, 0, 0.18, 1)`)で拡張。拡張開始と同時にアクセントラインは opacity 0(線そのものが画面に拡張したように見せる)。拡張開始から300ms後(赤が文字を覆ったタイミング)に、transitionなしで「RIATIS」を `#FFFFFF`、「SPORTS INC.」を `rgba(255, 255, 255, 0.85)` へ瞬間切替 |
| 5 タグライン | 約3000〜3550ms | タグラインを opacity 0 / `translateY(16px)` → opacity 1 / `translateY(0)`(duration 550ms / easing `cubic-bezier(0.16, 1, 0.3, 1)`)で表示 |
| 5b 立体押し出しシャドウ | 約3200〜3540ms | 「RIATIS」(`.opening__logo`)に押し出しシャドウを伸長(下記「立体押し出しシャドウ」節参照) |
| 6 ホールド+終了 | 3540ms〜 + 800ms ホールド + 600ms フェード | シャドウ定着から約800ms静止後、オーバーレイ全体を opacity 0(duration 600ms)でフェードアウトし `display: none` で本体コンテンツを露出(このオーバーレイをヒーローとして残す構成にする場合はフェードアウトを省略可) |

**技術要件**

- 純粋なCSSアニメーション(`@keyframes` + `animation-delay`)または Web Animations API で実装。外部ライブラリは使用しない。
- 文字分割はJSで行ってよいが、JS無効時にも「RIATIS」がテキストとして読める構造にする。アクセシビリティはコンテナに `aria-label` を付与し、分割した個別spanは `aria-hidden="true"` とする。
- `prefers-reduced-motion: reduce` では全アニメーションをスキップし、最終状態(赤背景+白文字+タグライン)を即時表示して1秒後にフェードアウト。
- オーバーレイ表示中は `body` のスクロールをロック(`overflow: hidden`)し、終了時に解除する。
- 1セッション1回のみ再生する `sessionStorage` 制御をオプションとして実装しやすい構造にしておく(デフォルトは毎回再生)。
- 全体所要時間は約4.5〜5秒。タイムラインの数値(各Phaseの開始時刻 / duration / easing / 色値)は定数としてまとめて定義し、後から調整しやすくする。
- 完了時に `body` から `opening-active` クラスを外し、Heroの `animation-delay` 連携で英字フェードインへ接続する。

**修正指示(2026-06-12 追加・実装中フィードバック反映)**

- 赤レイヤーの初期不可視化: Phase 4 で使う `#D71200` フルスクリーンレイヤは、転換開始まで画面に一切見えてはならない。初期状態を `transform: scaleY(0)` + `visibility: hidden` とし、Phase 4 のキーフレーム 0% で `visibility: visible` に切り替えてから `scaleY(1)` へ拡張する(あるいはJSで Phase 4 開始時に動的生成・appendでもよい)。「SPORTS INC.」直下のアクセントライン(width 140px)は仕様どおり残す。
- フォント差し替え: 縦長コンデンス系を廃し、欧文は **Inter**(weight 700/800)、和文タグラインは **Noto Sans JP**(weight 400) を使用する。HTMLの `<head>` で `https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=Noto+Sans+JP:wght@400;700&display=swap` を読み込む(既存リンクへの統合可)。適用は以下:
  - 「RIATIS」: `font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: 0.04em;`
  - 「SPORTS INC.」: `font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 0.42em;`
  - 「知識を社会が躍動する力へ。」: `font-family: 'Noto Sans JP', sans-serif; font-weight: 400; letter-spacing: 0.08em;`
- フォント読み込み完了待機: `document.fonts.ready` が解決するまでアニメーションを開始しない。実装は `.opening__*` の `animation-play-state` を初期 `paused` にし、`.opening--ready` クラスが付いたとき `running` に切り替える方式とする(待機中は最終状態を見せない・チラつかない・幅ズレも起きない)。

**フォント変更: GenSeki Gothic H 採用(2026-06-12)**

「RIATIS」と「SPORTS INC.」の表示フォントを Inter から **源石ゴシック H (GenSeki Gothic H)** へ差し替える。和文タグラインは Noto Sans JP のまま継続。

- **採用フォント**: GenSeki Gothic v2.100 / weight `H` (Heavy)
- **配布元**: [ButTaiwan/genseki-font](https://github.com/ButTaiwan/genseki-font) (Ver 2.100, 2024-08-22)
- **ライセンス**: SIL Open Font License 1.1（同梱 OFL に明示された Reserved Font Name は Adobe の `Source` のみ。`GenSekiGothic` 自体は RFN 宣言なし）
- **検証済みメタデータ**(元 `GenSekiGothic2JP-H.otf`):
  - name[1] family: `GenSekiGothic2 JP H`
  - name[6] PostScript: `GenSekiGothic2JP-H`
  - name[16] typographic family: `GenSekiGothic2 JP`
  - name[17] typographic subfamily: `H`
  - OS/2.usWeightClass: `900` (Heavy 確定)
  - fsType: `0` (installable embedding 可)
  - 全必要文字（`R I A T S P O N C . ␠`）を cmap に含む
- **配信方式**: セルフホスト WOFF2（CDN/外部参照なし）
- **サブセット**: Hero見出し専用に必要11字のみ抽出（`R I A T S P O N C . ␠`）。本文用にこのフォントを使う予定が出た時点で別サブセットを作る方針。
- **CSS internal alias**: `"RIATIS Display"`（フォント内部の RFN 系統名と切り離して、派生派配布物と分かりやすくする運用）
- **ファイル配置**: `assets/fonts/genseki/RIATIS-Display-H.subset.woff2` / 同階層に `OFL.txt` と `ATTRIBUTION.md`
- **preload**: 上記 WOFF2 を `<link rel="preload" as="font" type="font/woff2" crossorigin>` で先読み（preload は本ファイル1点のみに限定）
- **font-display**: `block`（FOITで源石ゴシックの確定待ち。マスクライズ自体が `document.fonts.ready` 待機をしているので FOIT による遅延は実害なし）

**サイズ・読み込みレポート**

| 項目 | サイズ | 備考 |
| --- | --- | --- |
| 元 OTF (`GenSekiGothic2JP-H.otf`) | 14,659,888 B (約14.0 MiB) | 全グリフ27,077字 |
| サブセット WOFF2 (本サイト配信) | **1,772 B (約1.73 KiB)** | 必要11字のみ |
| 削減率 | **99.988%** | OTF比 |
| 既存 Inter (Google Fonts) | 約 5〜10 KiB 程度のWOFF2/サブセット | 引き続きフォールバック先として利用 |
| 既存 Noto Sans JP (Google Fonts) | タグライン用に既存読み込みを継続 | 変更なし |

差し引きで本サイトへの追加転送量は約 +1.7 KiB（gzip後変動なし。WOFF2 は brotli 内包）。preload 1本のみ追加、ネットワークラウンドトリップは1往復増。

サブセットは `pyftsubset` (fontTools 4.63.0) を以下で実行:

```bash
pyftsubset GenSekiGothic2JP-H.otf \
  --text="RIATIS SPORTS INC." \
  --flavor=woff2 --with-zopfli \
  --no-hinting --desubroutinize \
  --layout-features='kern' \
  --name-IDs='1,2,3,4,6,13,14,16,17' \
  --drop-tables+=DSIG,BASE,JSTF,VORG \
  --output-file=RIATIS-Display-H.subset.woff2
```

将来文字を追加する場合は `--text` を更新してこのコマンドを再実行する。

**立体押し出しシャドウ(Extrude Shadow / 2026-06-12 追加)**

転換完了後、白い「RIATIS」に右斜め上方向のレトロな立体押し出しシャドウを伸ばす。これがオープニングの最終形となる。

- **発動**: Phase 4 の色切替(2700ms)から **500ms 後** → `--t-shadow-start: 3200ms`
- **方向**: 右斜め上(`--shadow-dx: 1`, `--shadow-dy: -1`)
- **最終深さ**: **7px**(`--shadow-depth: 7`)
- **色**: `#7F0B00`(背景 `#D71200` に馴染む不透明な暗赤、`--shadow-color`)
- **アニメーション**: 深さ 0 → 7px、duration **340ms**(`--t-shadow-dur`)、easing **ease-out cubic**(`1 - (1-t)^3`)
- **対象**: `.opening__logo` のみ(SPORTS INC.・タグラインには付与しない)
- **構造**: 連続した塗り潰しに見せるため、**0.5px 刻みの text-shadow 多段**を重ねる(深さ7px時 = 14層+末尾)。例: `0.5px -0.5px 0 #7F0B00, 1px -1px 0 #7F0B00, ..., 7px -7px 0 #7F0B00`
- **補間**: `text-shadow` は段数変動の CSS transition で補間できないため、`requestAnimationFrame` で毎フレーム深さを計算し文字列を再生成する(`script.js` の `animateExtrudeShadow()`)
- **マスク開放**: `.opening__mask` の `overflow: hidden` は文字立ち上げ用。シャドウが箱外に伸びるため `--t-mask-open: 1100ms` 経過後に `overflow: visible` へ step-end で切替(立ち上がりは既に終わっているので視覚影響なし)
- **タイムライン整合**: シャドウ定着(3540ms)から **800ms ホールド** → フェード開始 `--t-overlay-fade-start: 4340ms`(従来 4550ms から短縮)。総尺は約 **4.94 秒**で当初目標(4.5〜5秒)内
- **reduced-motion**: アニメーションせず最初から深さ7pxの最終影を `.opening--reduced` 状態で適用する。マスクも即 `overflow: visible`

### 7.2 アクセシビリティ

- 文字コントラスト確保(特に白背景 × 赤テキスト、黒背景 × muted文字)。
- フォーカスリングを消さない。`:focus-visible` スタイルを全インタラクティブ要素に定義。
- フォームは全項目 `label` 明示、エラーは色+テキストで通知。
- 装飾要素(ECG・grain・Pulseライン)は `aria-hidden="true"` を維持。

### 7.3 SEO / OGP / 構造化データ(ブリーフ §17)

- `title`: `株式会社RIATIS Sports｜知識を、社会を前に進む力へ`
- `meta description` / OGP title / OGP description はブリーフ §17 の文言をそのまま使用。
- OGP画像: 黒背景 + `TURN KNOWLEDGE INTO MOMENTUM.` + 赤ライン(1200×630、要制作)。
- `Organization` JSON-LD を追加(name / legalName / url / logo / foundingDate: 2025-05 / sameAs)。**住所は正式確認後に追加**。
- `lang="ja"` 維持、見出し階層は h1(Hero)→ h2(各セクション)→ h3(カード)で統一。

---

## 8. 要確認事項(実装前にユーザー確認が必要)

| # | 項目 | 現状 | 必要なアクション |
| --- | --- | --- | --- |
| 1 | 所在地・電話番号 | 未取得 | 正式情報の提供を受けてから Company Profile / JSON-LD に反映 |
| 2 | 問い合わせメールアドレス | 現行コードに `hello@riatis-sports.jp` がハードコード | 実在・正式なアドレスか確認(未確認のまま新サイトへ引き継がない) |
| 3 | フォーム送信バックエンド | なし | Formspree等の外部サービス採用可否、または当面mailto運用かを決定 |
| 4 | Privacy / Terms / 特商法 | ページなし | 正式原稿の提供後にページ作成。それまでFooterに掲載しない |
| 5 | Pulse Journal 初期記事 | なし | 公開時に掲載する実在エントリ(最低1〜3件)の原稿 |
| 6 | 資本金の公開可否 | ブリーフには「150万円」 | コーポレートサイトに掲載するか最終確認 |
| 7 | OGP画像 | なし | 制作(実装フェーズ内で生成可、トーンは§7.3) |
| 8 | 公開ドメイン | 未確認 | OGP `og:url` / JSON-LD `url` に必要 |

---

## 9. 実装フェーズ計画

ブリーフ §18 の Phase 1〜6 を、このリポジトリの実情に合わせて以下の順で実施する。

| Phase | 内容 | 完了条件 |
| --- | --- | --- |
| 0(完了) | 設計 + 既存コードのリファクタリング(本書 + REFACTORING.md) | 挙動・見た目が変わらないことを確認しpush |
| 1 Structure | §3.2 の12セクションの骨組みをHTMLで構築(新規セクションは仮コピーでなくブリーフ確定コピーを投入)。ナビ更新 | 全セクションがアンカー遷移可能 |
| **1.5 Opening** | §7.1.1 オープニング演出「マスクライズ」+ 立体押し出しシャドウの実装。文字マスク立ち上げ→ライン→赤拡張→タグライン→RIATIS押し出しシャドウの6フェーズ。スキップ条件(reduced-motion即時最終状態)とsessionStorage制御を含む(2026-06-12 追加) | reduced-motion 時は最終状態(影付き)を即表示して1秒後フェードアウト、通常時はPC・モバイル共に約4.9〜5秒で完了し本体コンテンツへ遷移 |
| 2 Design | v3トークン適用(red/black差し替え)、`data-theme` による黒白交互テーマ、白背景バリアントのCSS | 黒白リズムが §3.2 どおり、赤の使用箇所が §6 の制限内 |
| 3 Copy | Hero差し替え、Belief更新(Pioneer→Ownership)、Services 3カードのコピー反映 | ブリーフのコピー + 2026-06-12 改訂と完全一致 |
| 4 Components | BusinessFlow / JournalList / PartnerCTA / CompanyTable / ContactForm の実装 | §5 の命名・構成と一致 |
| 5 Responsive | スマホファースト検証(Hero英字の折返し、Serviceカード縦積み、CTAタップ領域) | 360px〜で崩れなし、reduced-motionフォールバック動作 |
| 6 SEO & Legal | title/OGP/JSON-LD、確認済みの正式情報反映、法務ページ作成とFooter導線 | §8 の確認事項がすべて解消されてから完了 |

### やってはいけないこと(ブリーフ §19 再掲・実装時チェックリスト)

- Visionalのデザインをそのままコピーしない
- RIATISを単なる動画学習サービス、REGAINを単なるAI研修に見せない
- スポーツ根性論に寄せすぎない / AI企業っぽく冷たくしすぎない
- 赤を使いすぎない / 黒背景だけで全ページを重くしない
- 会社概要・法務情報を仮情報のまま固定しない
- スマホで読みにくい英字レイアウトにしない
