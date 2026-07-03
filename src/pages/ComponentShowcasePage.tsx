/**
 * コンポーネント確認ページ(requirements.md Phase 7)
 * DESIGN.md 差し替え時に、全 UI 部品の見た目の差分をここで一括確認する。
 */
import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Download,
  FileText,
  Plus,
  Search,
  Wallet,
} from "lucide-react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Select,
  Textarea,
  Toggle,
  cx,
} from "../components/ui";
import { PriorityBadge, StatusBadge } from "../components/StatusBadge";
import { StatCard } from "../components/StatCard";
import {
  BarChartMock,
  LineChartMock,
  ProgressBar,
} from "../components/ChartMock";
import { SectionTitle } from "../components/SectionTitle";
import { ProposalCard } from "../components/ProposalCard";
import {
  formatAmount,
  kpis,
  monthlyRevenue,
  proposals,
  roiTrend,
  teamMembers,
} from "../data/mock";

/* ---------- ページ内リンク(アンカー) ---------- */

const sections = [
  { id: "colors", label: "カラー" },
  { id: "typography", label: "タイポグラフィ" },
  { id: "buttons", label: "ボタン" },
  { id: "badges", label: "バッジ" },
  { id: "cards", label: "カード" },
  { id: "forms", label: "フォーム" },
  { id: "alerts", label: "アラート" },
  { id: "table", label: "テーブル" },
  { id: "navigation", label: "ナビゲーション" },
  { id: "charts", label: "グラフ風パーツ" },
  { id: "avatars", label: "アバター" },
];

/* ---------- カラーパレット用データ(クラス名は静的に列挙する) ---------- */

const primarySwatches = [
  { name: "50", cls: "bg-primary-50" },
  { name: "100", cls: "bg-primary-100" },
  { name: "200", cls: "bg-primary-200" },
  { name: "300", cls: "bg-primary-300" },
  { name: "400", cls: "bg-primary-400" },
  { name: "500", cls: "bg-primary-500" },
  { name: "600", cls: "bg-primary-600" },
  { name: "700", cls: "bg-primary-700" },
  { name: "800", cls: "bg-primary-800" },
  { name: "900", cls: "bg-primary-900" },
];

const semanticColors = [
  { label: "成功 / 受注", cls: "bg-emerald-50 text-emerald-700", token: "emerald-50 / emerald-700" },
  { label: "進行中 / 情報", cls: "bg-blue-50 text-blue-700", token: "blue-50 / blue-700" },
  { label: "注意 / 保留", cls: "bg-amber-50 text-amber-800", token: "amber-50 / amber-800" },
  { label: "危険 / 失注", cls: "bg-red-50 text-red-700", token: "red-50 / red-700" },
];

const badgeToneSamples = [
  { tone: "gray", label: "下書き" },
  { tone: "blue", label: "提案中" },
  { tone: "green", label: "受注" },
  { tone: "amber", label: "保留" },
  { tone: "red", label: "失注" },
  { tone: "violet", label: "交渉中" },
  { tone: "primary", label: "注目案件" },
] as const;

const statusSamples = [
  "draft",
  "proposing",
  "negotiating",
  "won",
  "lost",
  "on_hold",
] as const;

const prioritySamples = ["high", "medium", "low"] as const;

const buttonVariants = ["primary", "secondary", "ghost", "danger"] as const;

const tabItems = ["概要", "効果試算", "コメント"] as const;

/** サンプル脇に添える variant 名などの小さなラベル */
function SampleLabel({ children }: { children: ReactNode }) {
  return <span className="text-xs text-slate-400">{children}</span>;
}

/** セクションの共通ラッパー(アンカー + 見出し + カード) */
function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <SectionTitle title={title} description={description} />
      <Card className="p-6">{children}</Card>
    </section>
  );
}

export function ComponentShowcasePage() {
  const [emailNotify, setEmailNotify] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabItems)[number]>("概要");

  return (
    <div className="space-y-8">
      {/* 0. 冒頭の説明 + アンカーリンク */}
      <div className="space-y-4">
        <Alert tone="info" title="コンポーネントカタログ">
          このページは DESIGN.md
          の反映結果を確認するためのカタログです。DESIGN.md
          を差し替えて再調整すると、ここで全コンポーネントの差分を確認できます。
        </Alert>
        <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* 1. カラーパレット */}
      <ShowcaseSection
        id="colors"
        title="カラーパレット"
        description="DESIGN.md §2 — ブランドカラー(primary)とセマンティックカラー"
      >
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-medium text-slate-500">
              ブランドカラー(primary-50〜900)
            </p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {primarySwatches.map((s) => (
                <div key={s.name} className="min-w-0">
                  <div
                    className={cx(
                      "h-10 rounded-lg ring-1 ring-inset ring-slate-900/5",
                      s.cls,
                    )}
                  />
                  <p className="mt-1 text-center text-[10px] text-slate-400">
                    {s.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium text-slate-500">
              セマンティックカラー(薄い背景 + 濃い文字)
            </p>
            <div className="flex flex-wrap gap-3">
              {semanticColors.map((c) => (
                <div key={c.token}>
                  <span
                    className={cx(
                      "inline-flex rounded-lg px-3 py-2 text-xs font-medium",
                      c.cls,
                    )}
                  >
                    {c.label}
                  </span>
                  <p className="mt-1 text-[10px] text-slate-400">{c.token}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 2. タイポグラフィ */}
      <ShowcaseSection
        id="typography"
        title="タイポグラフィ"
        description="DESIGN.md §3 — 役割ごとの文字スタイル"
      >
        <div className="divide-y divide-slate-100">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
            <p className="text-2xl font-bold text-slate-900">
              AI導入提案ダッシュボード
            </p>
            <SampleLabel>ページタイトル / text-2xl font-bold</SampleLabel>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <p className="text-lg font-semibold text-slate-900">
              進行中の提案案件
            </p>
            <SampleLabel>セクション見出し / text-lg font-semibold</SampleLabel>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <p className="text-sm font-semibold text-slate-900">
              今月の想定売上
            </p>
            <SampleLabel>カードタイトル / text-sm font-semibold</SampleLabel>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <p className="text-3xl font-bold tracking-tight text-slate-900">
              8,400万円
            </p>
            <SampleLabel>KPI数値 / text-3xl font-bold tracking-tight</SampleLabel>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              定型的な問い合わせ対応をAIチャットボットで自動化し、オペレーターは複雑な案件に集中できる体制を作ります。
            </p>
            <SampleLabel>本文 / text-sm text-slate-600</SampleLabel>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-3">
            <p className="text-xs text-slate-500">最終更新: 2026-07-01 / 担当: 佐藤 陽</p>
            <SampleLabel>補助テキスト / text-xs text-slate-500</SampleLabel>
          </div>
        </div>
      </ShowcaseSection>

      {/* 3. ボタン */}
      <ShowcaseSection
        id="buttons"
        title="ボタン"
        description="DESIGN.md §6 — variant 4種 × サイズ3種、アイコン付き・disabled"
      >
        <div className="space-y-6">
          {buttonVariants.map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <Button variant={variant} size="sm">
                案件を確認
              </Button>
              <Button variant={variant} size="md">
                案件を確認
              </Button>
              <Button variant={variant} size="lg">
                案件を確認
              </Button>
              <SampleLabel>{variant} / sm・md・lg</SampleLabel>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
            <Button>
              <Plus className="h-4 w-4" />
              新規案件
            </Button>
            <Button variant="secondary">
              <Download className="h-4 w-4" />
              提案書を出力
            </Button>
            <SampleLabel>アイコン付き(16px + gap-2)</SampleLabel>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>新規案件</Button>
            <Button variant="secondary" disabled>
              提案書を出力
            </Button>
            <SampleLabel>disabled 状態</SampleLabel>
          </div>
        </div>
      </ShowcaseSection>

      {/* 4. バッジ */}
      <ShowcaseSection
        id="badges"
        title="バッジ"
        description="DESIGN.md §2, §10 — Badge の全トーンとステータス・優先度バッジ"
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">
              Badge(全7トーン)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {badgeToneSamples.map((b) => (
                <span key={b.tone} className="inline-flex items-center gap-1.5">
                  <Badge tone={b.tone}>{b.label}</Badge>
                  <SampleLabel>{b.tone}</SampleLabel>
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">
              StatusBadge(案件ステータス6種)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {statusSamples.map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">
              PriorityBadge(優先度3種)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {prioritySamples.map((p) => (
                <PriorityBadge key={p} priority={p} />
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 5. カード */}
      <ShowcaseSection
        id="cards"
        title="カード"
        description="DESIGN.md §7 — 基本カード・KPIカード・提案カード"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-slate-400">基本 Card(p-6)</p>
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-slate-900">
                提案のポイント
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                白背景 + slate-200 の境界線 + shadow-sm
                が基本形です。カード内の余白は p-5 または p-6 を使います。
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">
              CardHeader 付き(右上に ghost アクション)
            </p>
            <Card className="p-6">
              <CardHeader
                title="最近の活動"
                description="チームの更新履歴を表示します"
                action={
                  <Button variant="ghost" size="sm">
                    すべて見る
                  </Button>
                }
              />
              <p className="mt-4 text-sm text-slate-600">
                高橋 恵 がコメントを追加 — ECサイト レコメンドエンジン刷新
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">
              interactive Card(ホバーで影が強まる)
            </p>
            <Card interactive className="p-6">
              <h3 className="text-sm font-semibold text-slate-900">
                クリック可能なカード
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                hover:shadow-md と hover:border-slate-300 が付与されます。
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">
              ProposalCard(proposals[0])
            </p>
            <ProposalCard proposal={proposals[0]} />
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">StatCard(kpis[0])</p>
            <StatCard
              label={kpis[0].label}
              value={kpis[0].value}
              change={kpis[0].change}
              trend={kpis[0].trend}
              positive={kpis[0].positive}
              hint={kpis[0].hint}
              icon={FileText}
            />
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">StatCard(kpis[1])</p>
            <StatCard
              label={kpis[1].label}
              value={kpis[1].value}
              change={kpis[1].change}
              trend={kpis[1].trend}
              positive={kpis[1].positive}
              hint={kpis[1].hint}
              icon={Wallet}
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* 6. フォーム */}
      <ShowcaseSection
        id="forms"
        title="フォーム"
        description="DESIGN.md §8 — 入力欄・セレクト・テキストエリア・トグル"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="会社名" htmlFor="sc-company">
            <Input id="sc-company" placeholder="例: 株式会社ミツバ物流" />
          </Field>
          <Field
            label="案件タイトル"
            htmlFor="sc-title"
            hint="顧客に表示される提案書の題名になります"
          >
            <Input
              id="sc-title"
              defaultValue="問い合わせ対応AIチャットボット導入"
            />
          </Field>
          <Field label="案件ID(自動採番)" htmlFor="sc-id">
            <Input id="sc-id" value="p-001" disabled readOnly />
          </Field>
          <Field label="メールアドレス" htmlFor="sc-email">
            <Input
              id="sc-email"
              type="email"
              defaultValue="haru.sato@example"
              className="border-red-300 focus:border-red-500 focus:ring-red-500/20"
            />
            <p className="mt-1.5 text-xs text-red-600">
              メールアドレスの形式が正しくありません
            </p>
          </Field>
          <Field label="担当者" htmlFor="sc-owner">
            <Select id="sc-owner" defaultValue={teamMembers[0].id}>
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}({m.role})
                </option>
              ))}
            </Select>
          </Field>
          <Field label="検索" htmlFor="sc-search" hint="アイコン内包の入力欄">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="sc-search"
                type="search"
                placeholder="案件名・企業名で検索"
                className="pl-9"
              />
            </div>
          </Field>
          <Field label="提案概要" htmlFor="sc-summary" className="sm:col-span-2">
            <Textarea
              id="sc-summary"
              placeholder="課題の背景と提案するAIソリューションの概要を記入してください"
            />
          </Field>
          <div className="space-y-4 sm:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">メール通知</p>
                <p className="text-xs text-slate-500">
                  案件のステータス変更をメールで受け取ります
                </p>
              </div>
              <span className="flex items-center gap-2">
                <Toggle
                  checked={emailNotify}
                  onChange={setEmailNotify}
                  label="メール通知"
                />
                <SampleLabel>{emailNotify ? "ON" : "OFF"}</SampleLabel>
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  週次サマリーレポート
                </p>
                <p className="text-xs text-slate-500">
                  毎週月曜にチームの進捗サマリーを配信します
                </p>
              </div>
              <span className="flex items-center gap-2">
                <Toggle
                  checked={weeklyReport}
                  onChange={setWeeklyReport}
                  label="週次サマリーレポート"
                />
                <SampleLabel>{weeklyReport ? "ON" : "OFF"}</SampleLabel>
              </span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 7. アラート */}
      <ShowcaseSection
        id="alerts"
        title="アラート"
        description="DESIGN.md §2 — セマンティックカラー4種の通知"
      >
        <div className="space-y-3">
          <Alert tone="info" title="情報">
            サクラ製菓株式会社の契約条件レビューが 7/7(火)に予定されています。
          </Alert>
          <Alert tone="success" title="受注が確定しました">
            東海精密工業株式会社「製造ライン外観検査AIの導入」が受注になりました。
          </Alert>
          <Alert tone="warning" title="対応期限が近づいています">
            株式会社ミツバ物流への効果試算資料の送付期限は 7/4(土)です。
          </Alert>
          <Alert tone="danger" title="失注として記録されました">
            株式会社ヤマブキ不動産「契約書レビューAIの試験導入」は予算凍結により失注となりました。
          </Alert>
        </div>
      </ShowcaseSection>

      {/* 8. テーブル */}
      <ShowcaseSection
        id="table"
        title="テーブル"
        description="DESIGN.md §10 — ヘッダー行 + ホバー行のデータテーブル"
      >
        <div className="overflow-x-auto">
          <table className="min-w-[480px] w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="rounded-l-lg px-4 py-3">案件</th>
                <th className="px-4 py-3">ステータス</th>
                <th className="rounded-r-lg px-4 py-3 text-right">想定売上</th>
              </tr>
            </thead>
            <tbody>
              {proposals.slice(0, 3).map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm">
                    <p className="font-medium text-slate-900">{p.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{p.company}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                    {formatAmount(p.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* 9. ナビゲーション */}
      <ShowcaseSection
        id="navigation"
        title="ナビゲーション"
        description="タブ・ページネーション・パンくずリストのパターン"
      >
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs text-slate-400">タブ(下線式・クリックで切替)</p>
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex gap-6" aria-label="タブ">
                {tabItems.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-current={activeTab === tab ? "page" : undefined}
                    className={cx(
                      "border-b-2 pb-3 text-sm font-medium transition-colors",
                      activeTab === tab
                        ? "border-primary-600 text-primary-700"
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              「{activeTab}」タブの内容がここに表示されます。
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs text-slate-400">
              ページネーション(ダミー・「2」がアクティブ)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm">
                前へ
              </Button>
              <Button variant="secondary" size="sm">
                1
              </Button>
              <Button variant="primary" size="sm" aria-current="page">
                2
              </Button>
              <Button variant="secondary" size="sm">
                3
              </Button>
              <Button variant="secondary" size="sm">
                次へ
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs text-slate-400">パンくずリスト</p>
            <nav aria-label="パンくずリスト">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-slate-500 transition-colors hover:text-slate-900"
                  >
                    ホーム
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-slate-500 transition-colors hover:text-slate-900"
                  >
                    案件一覧
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </li>
                <li className="font-medium text-slate-900">提案詳細</li>
              </ol>
            </nav>
          </div>
        </div>
      </ShowcaseSection>

      {/* 10. グラフ風パーツ */}
      <ShowcaseSection
        id="charts"
        title="グラフ風パーツ"
        description="DESIGN.md §10 — ライブラリ不使用の棒グラフ・折れ線・進捗バー"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs text-slate-400">
              BarChartMock(月次想定売上・ホバーで数値表示)
            </p>
            <BarChartMock
              data={monthlyRevenue.map((m) => ({
                label: m.month,
                value: m.value,
              }))}
              formatValue={formatAmount}
            />
          </div>
          <div>
            <p className="mb-3 text-xs text-slate-400">
              LineChartMock(平均ROIの推移)
            </p>
            <LineChartMock
              labels={roiTrend.labels}
              values={roiTrend.values}
              unit="%"
            />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs text-slate-400">ProgressBar(トーン4種)</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                  <span>primary</span>
                  <span>25%</span>
                </div>
                <ProgressBar value={25} tone="primary" label="進捗 25%" />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                  <span>green</span>
                  <span>50%</span>
                </div>
                <ProgressBar value={50} tone="green" label="進捗 50%" />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                  <span>amber</span>
                  <span>75%</span>
                </div>
                <ProgressBar value={75} tone="amber" label="進捗 75%" />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                  <span>red</span>
                  <span>100%</span>
                </div>
                <ProgressBar value={100} tone="red" label="進捗 100%" />
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 11. アバター */}
      <ShowcaseSection
        id="avatars"
        title="アバター"
        description="イニシャル表示の丸アバター(sm / md)と重ね表示"
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <Avatar initials={teamMembers[0].initials} size="sm" />
              <SampleLabel>sm(28px)</SampleLabel>
            </span>
            <span className="flex items-center gap-2">
              <Avatar initials={teamMembers[1].initials} size="md" />
              <SampleLabel>md(36px)</SampleLabel>
            </span>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">
              チームメンバーの重ね表示(-space-x-2 + ring-2 ring-white)
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {teamMembers.map((m) => (
                  <Avatar
                    key={m.id}
                    initials={m.initials}
                    className="ring-2 ring-white"
                  />
                ))}
              </div>
              <SampleLabel>{teamMembers.length}名のメンバー</SampleLabel>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
