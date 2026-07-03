/**
 * LP(ランディングページ)— requirements.md Phase 1-2。
 * Layout の外で描画される独自レイアウトのため、固定トップナビとフッターを含む。
 */
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Calculator,
  Check,
  Clock,
  EyeOff,
  FileText,
  JapaneseYen,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge, Button, Card, CardHeader, cx } from "../components/ui";
import { StatCard } from "../components/StatCard";
import { BarChartMock } from "../components/ChartMock";
import { ProposalCard } from "../components/ProposalCard";
import { formatAmount, kpis, monthlyRevenue, proposals } from "../data/mock";

/* ---------- ページ固有の表示用データ ---------- */

const navLinks = [
  { href: "#problem", label: "課題" },
  { href: "#solution", label: "機能" },
  { href: "#workflow", label: "導入の流れ" },
  { href: "#preview", label: "プレビュー" },
];

const achievements = [
  { value: "120社+", label: "支援企業" },
  { value: "231%", label: "平均ROI" },
  { value: "-60%", label: "提案リードタイム" },
  { value: "94%", label: "継続率" },
];

interface ProblemItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problems: ProblemItem[] = [
  {
    icon: EyeOff,
    title: "効果が数字で見えない",
    description:
      "AI導入の投資対効果を定量的に示せず、経営層の意思決定が先送りに。「なんとなく良さそう」では稟議が通りません。",
  },
  {
    icon: Clock,
    title: "提案資料の作成に時間がかかる",
    description:
      "案件ごとにゼロから資料を作り直し、効果試算やスケジュールの整理に何日も費やしてしまう。提案のスピードが商機を左右します。",
  },
  {
    icon: Users,
    title: "案件状況が属人化している",
    description:
      "誰がどの案件をどこまで進めているのか、担当者に聞かないと分からない。次のアクションの抜け漏れが失注につながります。",
  },
];

interface SolutionItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const solutions: SolutionItem[] = [
  {
    icon: FileText,
    title: "提案作成",
    description:
      "課題整理から導入ステップまで、実績あるテンプレートに沿って提案書を素早く組み立てられます。",
    features: [
      "標準・PoC・経営層向けの提案テンプレート",
      "導入ステップと期間の自動整理",
      "リスクと対応方針の記載欄を標準装備",
    ],
  },
  {
    icon: Calculator,
    title: "効果試算",
    description:
      "導入前後のコスト・工数・KPIを比較し、ROIを数字で示せる効果試算を提案に組み込めます。",
    features: [
      "Before/After形式の効果比較表",
      "想定売上とROIの案件別トラッキング",
      "月次推移のグラフで経営層に説明しやすい",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "案件管理",
    description:
      "全案件のステータス・進捗・次のアクションを一元管理し、チームの動きを見える化します。",
    features: [
      "提案中・交渉中・受注などのステータス管理",
      "次のアクションと期日のリマインド表示",
      "チームの活動履歴をタイムラインで共有",
    ],
  },
];

const workflowSteps = [
  {
    title: "相談",
    description: "現場の課題感やAI活用の方向性を気軽に相談。初回は情報整理から始めます。",
  },
  {
    title: "ヒアリング",
    description: "業務フローとデータの現状を確認し、自動化・効率化の対象領域を特定します。",
  },
  {
    title: "提案作成",
    description: "効果試算と導入ステップをまとめた提案書を作成。数字で投資判断を支援します。",
  },
  {
    title: "導入判断",
    description: "経営層への説明資料まで揃った状態で、スムーズな意思決定につなげます。",
  },
];

const footerLinkGroups = [
  {
    heading: "サービス",
    links: ["機能一覧", "料金プラン", "導入事例", "セキュリティ"],
  },
  {
    heading: "会社情報",
    links: ["会社概要", "ニュース", "採用情報"],
  },
  {
    heading: "サポート",
    links: ["ヘルプセンター", "お問い合わせ", "利用規約", "プライバシーポリシー"],
  },
];

/* ---------- LP用セクション見出し ---------- */

function LpSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge tone="primary">{eyebrow}</Badge>
      <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 text-sm text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

/* ---------- ページ本体 ---------- */

export function LandingPage() {
  return (
    <div className="bg-white text-slate-700">
      {/* 1. 固定トップナビ */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="hidden text-base font-bold text-slate-900 sm:inline">
              Proposal AI Dashboard
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link to="/dashboard" className="shrink-0">
            <Button>ダッシュボードを見る</Button>
          </Link>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50 via-primary-50/40 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <Badge tone="primary">AI導入支援SaaS(モックデモ)</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            AI導入の提案を、
            <span className="bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
              数字で語れる
            </span>
            ように。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
            Proposal AI Dashboard は、AI導入提案の作成・効果試算・案件管理をひとつにまとめた
            提案支援ツールです。経営層が判断できる「数字のある提案」を、最短ルートで届けます。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button size="lg">
                ダッシュボードを見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/proposals/p-001">
              <Button variant="secondary" size="lg">
                提案サンプルを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 実績風数値バンド */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {achievements.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Problem */}
      <section id="problem" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LpSectionHeading
            eyebrow="課題"
            title="AI導入の提案、こんな壁に当たっていませんか"
            description="多くの企業でAI活用の検討が進む一方、提案の現場では同じつまずきが繰り返されています。"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem.title} className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <problem.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {problem.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Solution */}
      <section id="solution" className="scroll-mt-16 border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LpSectionHeading
            eyebrow="機能"
            title="提案から受注まで、ひとつのダッシュボードで"
            description="提案作成・効果試算・案件管理の3つの機能が、AI導入提案の質とスピードを底上げします。"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {solutions.map((solution) => (
              <Card key={solution.title} className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <solution.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {solution.description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Workflow */}
      <section id="workflow" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LpSectionHeading
            eyebrow="導入の流れ"
            title="相談から導入判断まで、4つのステップ"
            description="初回の相談から経営層の意思決定まで、伴走型で提案づくりを支援します。"
          />
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="flex flex-1 items-start gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <div className="flex items-center lg:w-full">
                  <span
                    aria-hidden="true"
                    className={cx(
                      "hidden h-px flex-1 lg:block",
                      index > 0 ? "bg-slate-200" : "bg-transparent",
                    )}
                  />
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cx(
                      "hidden h-px flex-1 lg:block",
                      index < workflowSteps.length - 1
                        ? "bg-slate-200"
                        : "bg-transparent",
                    )}
                  />
                </div>
                <div className="lg:mt-4 lg:px-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Demo Preview */}
      <section id="preview" className="scroll-mt-16 border-t border-slate-200 bg-gradient-to-b from-white to-primary-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LpSectionHeading
            eyebrow="プレビュー"
            title="ダッシュボードを覗いてみる"
            description="案件のKPI・売上推移・提案の進捗が、ログイン後すぐにひと目で分かります。"
          />

          {/* ブラウザ風フレーム */}
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-slate-400">
                app.proposal-ai.example.com/dashboard
              </span>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                  label={kpis[0].label}
                  value={kpis[0].value}
                  change={kpis[0].change}
                  trend={kpis[0].trend}
                  positive={kpis[0].positive}
                  hint={kpis[0].hint}
                  icon={FileText}
                />
                <StatCard
                  label={kpis[1].label}
                  value={kpis[1].value}
                  change={kpis[1].change}
                  trend={kpis[1].trend}
                  positive={kpis[1].positive}
                  hint={kpis[1].hint}
                  icon={JapaneseYen}
                />
                <StatCard
                  label={kpis[2].label}
                  value={kpis[2].value}
                  change={kpis[2].change}
                  trend={kpis[2].trend}
                  positive={kpis[2].positive}
                  hint={kpis[2].hint}
                  icon={TrendingUp}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="p-5 lg:col-span-2">
                  <CardHeader
                    title="想定売上の推移"
                    description="直近6ヶ月・万円"
                  />
                  <BarChartMock
                    className="mt-4"
                    data={monthlyRevenue.map((m) => ({
                      label: m.month,
                      value: m.value,
                    }))}
                    formatValue={formatAmount}
                  />
                </Card>
                <ProposalCard proposal={proposals[0]} />
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/dashboard">
              <Button size="lg">
                実際のダッシュボードを見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="text-base font-bold text-white">
                  Proposal AI Dashboard
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                AI導入提案の作成・効果試算・案件管理をひとつにまとめた、提案支援ダッシュボードのモックデモです。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footerLinkGroups.map((group) => (
                <div key={group.heading}>
                  <h4 className="text-sm font-semibold text-white">
                    {group.heading}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((label) => (
                      <li key={label}>
                        <a
                          href="#"
                          className="text-sm transition-colors hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6">
            <p className="text-xs">
              © 2026 Proposal AI Dashboard — DESIGN.md 検証用モックサイト
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
