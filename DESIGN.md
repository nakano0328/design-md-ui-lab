# DESIGN.md — Proposal AI Dashboard デザインシステム(ベースライン)

このファイルは UI 実装の唯一のデザイン基準です。
AI コーディング時は、このファイルの方針を最優先で UI に反映してください。
ただし、可読性とレスポンシブ対応を壊してはいけません。

このベースラインのテーマは **「Calm Indigo」** — 信頼感のある SaaS 管理画面の王道スタイルです。

---

## 1. デザイン原則

1. **静かで信頼できる UI** — 派手さより情報の見やすさ。装飾は控えめに、余白で整理する
2. **一貫性** — 同じ役割の要素は必ず同じ見た目にする(色・角丸・影・余白)
3. **階層は色より余白とタイポグラフィで作る** — 背景色の塗り分けは最小限
4. **アクセントは1色** — プライマリ(インディゴ)以外の色はステータス表現にのみ使う

---

## 2. カラー

実装では CSS 変数(デザイントークン)として `src/styles.css` の `@theme` に定義し、
Tailwind のユーティリティクラス(`bg-primary-600` など)経由で使うこと。ハードコードした hex を JSX に直接書かない。

### ブランドカラー(primary)

インディゴ系。CTA・リンク・アクティブ状態・フォーカスリングに使う。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `primary-50` | `#eef2ff` | アクティブなナビ項目の背景、薄い強調背景 |
| `primary-100` | `#e0e7ff` | ホバー背景、アイコンチップ背景 |
| `primary-200` | `#c7d2fe` | 装飾、グラフの薄い系列 |
| `primary-500` | `#6366f1` | グラフのメイン系列 |
| `primary-600` | `#4f46e5` | **プライマリボタン背景、リンク、アクティブテキスト** |
| `primary-700` | `#4338ca` | プライマリボタンのホバー |
| `primary-900` | `#312e81` | 濃い装飾、LP の見出しグラデーション |

### ニュートラル(slate)

テキスト・背景・境界線はすべて slate 系で統一する。

| 用途 | トークン |
| --- | --- |
| ページ背景(アプリ画面) | `slate-50` (`#f8fafc`) |
| カード・パネル背景 | `white` |
| 境界線 | `slate-200` (`#e2e8f0`) |
| 補助テキスト・アイコン | `slate-500` |
| 本文テキスト | `slate-600`〜`slate-700` |
| 見出し・強調テキスト | `slate-900` (`#0f172a`) |

### セマンティックカラー(ステータス)

バッジ・アラート・進捗にのみ使用。「薄い背景 + 濃い文字」の組み合わせで使う。

| 意味 | 背景 | 文字 | 用途例 |
| --- | --- | --- | --- |
| 成功 / 受注 | `emerald-50` | `emerald-700` | 受注、完了、ポジティブな変化 |
| 進行中 / 情報 | `blue-50` | `blue-700` | 提案中、情報アラート |
| 注意 / 保留 | `amber-50` | `amber-800` | 保留、要確認、期限接近 |
| 危険 / 失注 | `red-50` | `red-700` | 失注、エラー、高リスク |
| 中立 / 下書き | `slate-100` | `slate-600` | 下書き、無効状態 |
| 交渉中 | `violet-50` | `violet-700` | 交渉中ステータス |

---

## 3. タイポグラフィ

- フォント: `"Inter", "Noto Sans JP", system-ui, sans-serif`(数字は Inter、日本語は Noto Sans JP に落ちる)
- 本文サイズ: `text-sm`(14px)を基準にする。管理画面の密度を優先
- 行間: 本文 `leading-relaxed`、見出し `leading-tight`

| 役割 | スタイル |
| --- | --- |
| ページタイトル | `text-2xl font-bold text-slate-900` |
| セクション見出し | `text-lg font-semibold text-slate-900` |
| カードタイトル | `text-sm font-semibold text-slate-900` |
| KPI 数値 | `text-3xl font-bold text-slate-900 tracking-tight` |
| 本文 | `text-sm text-slate-600` |
| 補助テキスト・ラベル | `text-xs text-slate-500` |
| LP の Hero 見出し | `text-4xl〜text-5xl font-bold tracking-tight` |

---

## 4. 余白・レイアウト

- 余白は Tailwind の 4px スケールを使い、**4 / 6 / 8(16px / 24px / 32px)を基本リズム**にする
- カード内パディング: `p-5` または `p-6`
- カード間ギャップ: `gap-4`〜`gap-6`
- セクション間(LP): `py-16`〜`py-24`
- アプリ画面のコンテンツ最大幅: `max-w-7xl mx-auto`、左右 `px-4 sm:px-6 lg:px-8`
- サイドバー幅: `w-64`(デスクトップ固定)。モバイルではドロワーに切り替える

---

## 5. 角丸・影・境界線

| 要素 | 角丸 | 影 | 境界線 |
| --- | --- | --- | --- |
| カード | `rounded-xl` | `shadow-sm` | `border border-slate-200` |
| ボタン | `rounded-lg` | なし(primary は `shadow-sm` 可) | variant による |
| 入力欄 | `rounded-lg` | なし | `border-slate-300` |
| バッジ | `rounded-full` | なし | なし |
| モーダル・ドロワー | `rounded-2xl` | `shadow-xl` | なし |

- 影は `shadow-sm` を基本とし、ホバーで `shadow-md` まで。大きい影を常用しない
- 境界線 + 薄い影の組み合わせでカードを浮かせる(境界線なしの影だけのカードは作らない)

---

## 6. ボタン

高さ: sm=32px / md=40px / lg=48px 相当。`font-medium`、`rounded-lg`、`transition-colors` を必ず付ける。

| variant | 見た目 | 用途 |
| --- | --- | --- |
| `primary` | `bg-primary-600 text-white hover:bg-primary-700` | 主要 CTA(1画面に原則1つ) |
| `secondary` | `bg-white text-slate-700 border border-slate-300 hover:bg-slate-50` | 副次アクション |
| `ghost` | `text-slate-600 hover:bg-slate-100` | ツールバー、控えめな操作 |
| `danger` | `bg-red-600 text-white hover:bg-red-700` | 破壊的操作 |

- フォーカス: `focus-visible:ring-2 ring-primary-500 ring-offset-2` で統一
- アイコン付きボタンはアイコン 16px、`gap-2`

---

## 7. カード

- 基本形: `bg-white border border-slate-200 rounded-xl shadow-sm p-6`
- カードタイトルは上、本文・数値は下。タイトル行に補助アクション(ghost ボタンやリンク)を右寄せしてよい
- クリック可能なカードは `hover:shadow-md hover:border-slate-300 transition` を付ける
- KPI カード: ラベル(`text-xs text-slate-500`)→ 数値(`text-3xl font-bold`)→ 前月比(セマンティックカラーの小さいテキスト + 矢印アイコン)の縦積み。右上に `primary-50` 背景の丸いアイコンチップ

---

## 8. フォーム

- ラベル: `text-sm font-medium text-slate-700`、入力欄の上に配置、`mb-1.5`
- 入力欄: `h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm`
  - フォーカス: `focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`
  - プレースホルダ: `placeholder:text-slate-400`
- 補助説明: 入力欄の下に `text-xs text-slate-500`
- トグルスイッチ: ON = `bg-primary-600`、OFF = `bg-slate-200`。丸いノブが滑らかに移動する
- フォームのグルーピングはカード単位。カード見出し + 説明文 + フィールド群 + 右下に保存ボタン

---

## 9. ナビゲーション

### アプリ画面(サイドバー + ヘッダー)

- サイドバー: 白背景 `bg-white border-r border-slate-200`、幅 `w-64`
  - ロゴ部: プライマリカラーのアイコン + サービス名(`font-bold text-slate-900`)
  - ナビ項目: `rounded-lg px-3 py-2 text-sm font-medium text-slate-600`、アイコン 18px + `gap-3`
  - アクティブ: `bg-primary-50 text-primary-700`(左ボーダーではなく背景塗り)
  - ホバー: `hover:bg-slate-100 hover:text-slate-900`
- ヘッダー: 白背景、下境界線 `border-b border-slate-200`、高さ 64px。左にページタイトル、右に検索・通知ベル・アバター
- モバイル: サイドバーはハンバーガーからのドロワー表示。オーバーレイは `bg-slate-900/50`

### LP

- 上部固定ナビ: 白背景 + `backdrop-blur` + 下境界線。ロゴ左、リンク中央〜右、CTA ボタン右端
- フッター: `bg-slate-900 text-slate-400`、リンクは `hover:text-white`

---

## 10. データ表示

- テーブル: ヘッダー行 `bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wider`、
  行は `border-b border-slate-100 hover:bg-slate-50`、セルは `px-4 py-3 text-sm`
- バッジ: `rounded-full px-2.5 py-0.5 text-xs font-medium` + セマンティックカラー
- グラフ風パーツ(ライブラリ不使用):
  - 棒グラフ: `primary-500`/`primary-200` の縦棒、`rounded-t`、ホバーで濃く
  - 折れ線: SVG polyline、線は `primary-500`、下側に薄いグラデーション塗り
  - 進捗バー: 高さ `h-2`、背景 `bg-slate-100`、`rounded-full`
- 空状態: 中央寄せのアイコン + 説明 + アクションボタン

---

## 11. モーション

- `transition-colors duration-150` を対話要素の基本にする
- ホバーでの持ち上げは `shadow` の変化のみ。`scale` は使わない
- ドロワー・アコーディオンは `duration-200 ease-out`

---

## 12. レスポンシブ

- ブレークポイント: モバイル(〜640px)/ タブレット(640〜1024px)/ デスクトップ(1024px〜)
- KPI カード: モバイル 1〜2列 → デスクトップ 4列
- テーブルはモバイルでカード表示に切り替えるか、横スクロールを許容する
- タップターゲットは最低 40px 四方を確保する
