import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  AlarmClock,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Download,
  FileText,
  FolderOpen,
  JapaneseYen,
  MessageSquare,
  Plus,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  activities,
  currentUser,
  formatAmount,
  kpis,
  monthlyRevenue,
  priorityTasks,
  proposals,
  roiTrend,
  statusLabels,
  statusSummary,
  type Activity,
} from "../data/mock";
import { Avatar, Button, Card, CardHeader } from "../components/ui";
import { StatCard } from "../components/StatCard";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";
import {
  BarChartMock,
  LineChartMock,
  ProgressBar,
} from "../components/ChartMock";
import { SectionTitle } from "../components/SectionTitle";
import { ProposalCard } from "../components/ProposalCard";

/** KPIカードのアイコン(mock.ts の kpis と同じ並び順) */
const kpiIcons: LucideIcon[] = [FolderOpen, JapaneseYen, TrendingUp, AlarmClock];

/** アクティビティ種別ごとの小アイコン */
const activityIcons: Record<Activity["type"], LucideIcon> = {
  comment: MessageSquare,
  status: RefreshCw,
  document: FileText,
  meeting: CalendarDays,
};

export function DashboardPage() {
  /* 売上グラフ用の派生値(すべて mock.ts の monthlyRevenue から算出) */
  const revenueData = monthlyRevenue.map((m) => ({
    label: m.month,
    value: m.value,
  }));
  const currentRevenue = monthlyRevenue[monthlyRevenue.length - 1];
  const prevRevenue = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueDiff = currentRevenue.value - prevRevenue.value;
  const revenueAvg = Math.round(
    monthlyRevenue.reduce((sum, m) => sum + m.value, 0) / monthlyRevenue.length,
  );

  /* ROI の現在値と前月比(roiTrend から算出) */
  const roiCurrent = roiTrend.values[roiTrend.values.length - 1];
  const roiPrev = roiTrend.values[roiTrend.values.length - 2];
  const roiDiff = roiCurrent - roiPrev;

  /* 進行中(提案中・交渉中)の注目案件 上位3件(想定売上の大きい順) */
  const featuredProposals = proposals
    .filter((p) => p.status === "proposing" || p.status === "negotiating")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const totalProposals = proposals.length;
  const lastName = currentUser.name.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* 挨拶 + 主要アクション */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold leading-tight text-slate-900">
            おはようございます、{lastName}さん
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            2026年7月3日(金)・今週の要対応 {kpis[3].value}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            レポートを出力
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            新規提案を作成
          </Button>
        </div>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            positive={kpi.positive}
            hint={kpi.hint}
            icon={kpiIcons[i]}
          />
        ))}
      </div>

      {/* 効果試算グラフ + ステータス内訳 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 想定売上の推移 */}
        <Card className="flex flex-col p-6 lg:col-span-2">
          <CardHeader
            title="想定売上の推移"
            description="直近6ヶ月・提案中案件の確度を加味した見込み額"
          />
          <div className="mt-6 flex flex-1 items-end">
            <BarChartMock
              data={revenueData}
              formatValue={formatAmount}
              className="w-full lg:h-full lg:min-h-44"
            />
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
            <div>
              <dt className="text-xs text-slate-500">
                当月見込み({currentRevenue.month})
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {formatAmount(currentRevenue.value)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">前月比</dt>
              <dd className="mt-1 flex items-center gap-0.5 text-sm font-semibold text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />+
                {formatAmount(revenueDiff)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">6ヶ月平均</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {formatAmount(revenueAvg)}
              </dd>
            </div>
          </dl>
        </Card>

        {/* 右カラム: ROI + ステータス一覧 */}
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <CardHeader
              title="平均ROIの推移"
              description="直近6ヶ月・受注案件ベース"
            />
            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                {roiCurrent}%
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />+{roiDiff}pt
              </span>
              <span className="text-xs text-slate-500">前月比</span>
            </div>
            <LineChartMock
              labels={roiTrend.labels}
              values={roiTrend.values}
              unit="%"
              className="mt-4"
            />
          </Card>

          <Card className="flex-1 p-6">
            <CardHeader
              title="案件ステータス一覧"
              description={`全${totalProposals}件の案件内訳`}
            />
            <ul className="mt-5 space-y-4">
              {statusSummary.map((s) => {
                const pct = Math.round((s.count / totalProposals) * 100);
                return (
                  <li key={s.status}>
                    <div className="flex items-center justify-between gap-2">
                      <StatusBadge status={s.status} />
                      <p className="text-xs text-slate-500">
                        <span className="text-sm font-semibold text-slate-900">
                          {s.count}件
                        </span>
                        <span className="ml-1.5">{pct}%</span>
                      </p>
                    </div>
                    <ProgressBar
                      value={pct}
                      tone={
                        s.status === "won"
                          ? "green"
                          : s.status === "lost"
                            ? "red"
                            : "primary"
                      }
                      label={`${statusLabels[s.status]}の割合`}
                      className="mt-2"
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>

      {/* 進行中の注目案件 */}
      <section>
        <SectionTitle
          title="進行中の注目案件"
          description="提案中・交渉中の案件から想定売上の大きい順に表示"
          action={
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
            >
              すべて見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>

      {/* アクティビティ + 優先対応リスト */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <CardHeader
            title="最近のアクティビティ"
            description="チームメンバーの直近の更新"
          />
          <ul className="mt-5">
            {activities.map((activity, i) => {
              const TypeIcon = activityIcons[activity.type];
              const isLast = i === activities.length - 1;
              return (
                <li
                  key={activity.id}
                  className={`relative flex gap-3 ${isLast ? "" : "pb-5"}`}
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-3.5 top-8 w-px bg-slate-200"
                    />
                  )}
                  <Avatar initials={activity.initials} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug text-slate-600">
                      <span className="font-medium text-slate-900">
                        {activity.actor}
                      </span>
                      {activity.action}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium text-slate-700">
                      {activity.target}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <TypeIcon className="h-3.5 w-3.5" />
                      {activity.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="優先対応リスト"
            description="期限が近いアクション"
            className="px-6 pb-4 pt-6"
          />
          <ul className="divide-y divide-slate-100 border-t border-slate-100">
            {priorityTasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={`/proposals/${task.proposalId}`}
                  className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {task.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {task.company}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <CalendarClock className="h-3.5 w-3.5" />
                      期限 {task.due}
                    </span>
                    <PriorityBadge priority={task.priority} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
