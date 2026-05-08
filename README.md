# RIATIS-Sports-HP

株式会社RIATIS Sports向けの静的コーポレートサイトです。`01-pulse.html` の方向性をベースに、黒・赤・白のPulse Drivenデザインと生成背景画像を組み込んでいます。


## ローカル確認

`index.html` をブラウザで直接開くか、以下で簡易サーバーを起動してください。

```bash
python3 -m http.server 8080
```

## Vercel デプロイ手順

1. GitHub にこのリポジトリを push
2. Vercel にログインし、`Add New... > Project` から対象リポジトリを選択
3. Framework Preset は `Other` のまま、Build Command は空欄、Output Directory も空欄
4. `Deploy` を押して公開
5. 独自ドメインを使う場合は `Settings > Domains` から追加

`vercel.json` はセキュリティヘッダー設定に使用しています。

## Assets

- `assets/riatis-pulse-hero.png`: 生成したHero/CTA用背景画像
- `assets/favicon.svg`: サイトアイコン
