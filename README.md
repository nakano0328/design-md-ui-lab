# Proposal AI Dashboard — DESIGN.md UI 実験サイト

`DESIGN.md` を AI コーディングに読ませたときに、UI の品質・一貫性がどれくらい変わるかを検証するためのフロントエンド実験サイトです。
題材は「AI導入提案ダッシュボード」の静的モックサイト(SaaS 風 UI)。

- バックエンド / DB / API 連携 / 認証は **なし**(すべて `src/data/mock.ts` のモックデータ)
- 実装仕様は [requirements.md](requirements.md)(Phase 1〜7)
- デザイン基準は [DESIGN.md](DESIGN.md)(ベースラインは「Calm Indigo」テーマ)

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開くと LP が表示されます。

## GitHub Pages

`main` ブランチに push すると GitHub Actions で本番ビルドされ、GitHub Pages に公開されます。

- 公開 URL: https://nakano0328.github.io/design-md-ui-lab/
- Pages 配信用ビルドでは `npm run build:pages` により `vite.config.ts` の `base` が `/design-md-ui-lab/` になります
- SPA の直接アクセス対策として、デプロイ時に `dist/index.html` を `dist/404.html` にコピーします

その他のコマンド:

```bash
npm run build      # 型チェック + 本番ビルド(dist/)
npm run build:pages # GitHub Pages 用ビルド
npm run preview    # ビルド結果のプレビュー
npm run typecheck  # 型チェックのみ
```

## 実装済みの画面

| 画面 | URL | 内容 |
| --- | --- | --- |
| LP / トップページ | `/` | Hero、課題(Problem)、機能(Solution)、導入の流れ(Workflow)、ダッシュボードプレビュー、フッター |
| ダッシュボード | `/dashboard` | KPI カード4枚、想定売上・ROI のグラフ風カード、案件ステータス一覧、注目案件、アクティビティ、優先対応リスト |
| 提案詳細 | `/proposals/:id`(例: `/proposals/p-001`) | 提案概要、導入ステップ、想定効果、リスク・確認事項のタブ UI、次回アクション、コメント欄風 UI |
| 案件一覧 | `/projects` | 検索・ステータスフィルタ(動作します)、案件テーブル(モバイルはカード表示)、ステータス / 優先度バッジ |
| 設定 | `/settings` | プロフィール、通知トグル、提案テンプレート、デザインモード設定風 UI、保存ボタン |
| コンポーネント一覧 | `/components` | カラー、タイポグラフィ、ボタン、バッジ、カード、フォーム、アラート、テーブル、ナビ、グラフ風パーツのカタログ |

LP 以外の画面は共通シェル(サイドバー + ヘッダー)の中に表示されます。モバイルではサイドバーがドロワーになります。

## 技術スタック

- Vite + React 19 + TypeScript
- Tailwind CSS v4(`@tailwindcss/vite`)
- react-router-dom(画面遷移)
- lucide-react(アイコン)
- グラフはライブラリ不使用(CSS / インライン SVG のモック表現)

## ディレクトリ構成

```text
.
├── DESIGN.md               # デザイン基準(差し替え対象)
├── requirements.md         # 実装仕様(Phase 1〜7)
├── src
│   ├── styles.css          # ★ デザイントークン(@theme)— DESIGN.md の色・フォントを集約
│   ├── App.tsx             # ルーティング
│   ├── data/mock.ts        # 全モックデータ
│   ├── components
│   │   ├── ui.tsx          # ★ Button / Card / Badge / Input / Toggle / Alert などの基礎部品
│   │   ├── Layout.tsx      # アプリ共通シェル(サイドバー + ヘッダー)
│   │   ├── Header.tsx / Sidebar.tsx
│   │   ├── StatCard.tsx / ProposalCard.tsx / StatusBadge.tsx
│   │   ├── ChartMock.tsx   # 棒 / 折れ線 / 進捗バーのグラフ風パーツ
│   │   └── SectionTitle.tsx
│   └── pages               # 6画面
└── README.md
```

`★` の 2 ファイルにデザイン上の決定が集約されているため、DESIGN.md 差し替え時の変更もここに集中します。

## DESIGN.md を差し替えて再調整する手順

このリポジトリの目的は「同じ requirements.md のまま、DESIGN.md だけを差し替えたときの UI の変化」を見比べることです。

1. **比較用ブランチを切る**(現状のベースラインを残すため)

   ```bash
   git checkout -b design/<新テーマ名>
   ```

2. **`DESIGN.md` を差し替える**(丸ごと置き換えて OK)。
   ベースラインと同じ章立て(カラー / タイポグラフィ / 余白 / 角丸・影 / ボタン / カード / フォーム / ナビゲーション / データ表示)で書くと、AI が反映しやすくなります。

3. **AI コーディングに再調整を依頼する**。プロンプト例:

   > DESIGN.md を差し替えました。requirements.md の仕様と各画面の構成は変えずに、
   > 新しい DESIGN.md の色・余白・タイポグラフィ・角丸・影・ボタン・カード・フォーム・
   > ナビゲーションの方針を全画面に反映してください。
   > まず `src/styles.css` のデザイントークンと `src/components/ui.tsx` を更新し、
   > その後、各コンポーネント・ページのスタイルを調整してください。
   > 可読性とレスポンシブ対応は壊さないでください。

4. **差分を確認する**。
   - `http://localhost:5173/components`(コンポーネント一覧)を開くと、ボタン・カード・バッジ・フォームなど全部品の変化を 1 ページで確認できます
   - ブランチを切り替えれば同じ URL で before / after を見比べられます

   ```bash
   git switch main                # ベースライン
   git switch design/<新テーマ名>  # 新デザイン
   ```

### 差し替え時に AI が触るべき場所(目安)

| 変更したい内容 | 触る場所 |
| --- | --- |
| ブランドカラー・フォント | `src/styles.css` の `@theme` |
| ボタン / バッジ / フォームの形 | `src/components/ui.tsx` |
| カードの角丸・影・境界線 | `src/components/ui.tsx` の `Card` |
| ステータス色の割り当て | `src/components/StatusBadge.tsx` |
| ナビゲーションの見た目 | `src/components/Sidebar.tsx` / `Header.tsx` |
| グラフの配色 | `src/components/ChartMock.tsx` |
| 画面ごとの余白・レイアウト | `src/pages/*.tsx` |

## モックデータについて

案件・KPI・アクティビティ・テンプレートなどはすべて [src/data/mock.ts](src/data/mock.ts) にあります。
件数や数値を変えたい場合はこのファイルだけを編集してください(画面側は自動で追従します)。
