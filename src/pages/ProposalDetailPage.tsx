/**
 * 提案詳細ページ(requirements.md Phase 4)
 * /proposals/:id — Layout 内に描画される。データは mock.ts の getProposalById から取得。
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  CalendarDays,
  Check,
  Clock3,
  FileDown,
  Gauge,
  JapaneseYen,
  PenLine,
  SearchX,
  Send,
  TrendingUp,
} from "lucide-react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Textarea,
  cx,
  type AlertTone,
} from "../components/ui";
import { PriorityBadge, StatusBadge } from "../components/StatusBadge";
import { StatCard } from "../components/StatCard";
import { ProgressBar } from "../components/ChartMock";
import {
  formatAmount,
  getProposalById,
  type Priority,
} from "../data/mock";

/** "2026-07-04" → "2026年7月4日"(現在時刻には依存しない文字列整形) */
function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

/** "2026-07-04" → "7月4日"(サマリーカード用の短い表記) */
function formatMonthDay(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${m}月${d}日`;
}

const tabs = [
  { key: "overview", label: "概要" },
  { key: "steps", label: "導入ステップ" },
  { key: "effects", label: "想定効果" },
  { key: "risks", label: "リスク・確認事項" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const riskAlertTones: Record<Priority, AlertTone> = {
  high: "danger",
  medium: "warning",
  low: "info",
};

export function ProposalDetailPage() {
  const { id } = useParams();
  const proposal = getProposalById(id ?? "");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  if (!proposal) {
    return (
      <div className="space-y-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          案件一覧に戻る
        </Link>
        <Card className="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <SearchX className="h-6 w-6 text-slate-400" />
          </span>
          <p className="text-sm font-semibold text-slate-900">
            案件が見つかりません
          </p>
          <p className="max-w-sm text-sm text-slate-500">
            指定された案件は存在しないか、削除された可能性があります。案件一覧から選び直してください。
          </p>
          <Link to="/projects" className="mt-2 inline-flex">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4" />
              案件一覧へ戻る
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 戻るリンク */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        案件一覧に戻る
      </Link>

      {/* タイトルブロック */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={proposal.status} />
            <PriorityBadge priority={proposal.priority} />
            {proposal.tags.map((tag) => (
              <Badge key={tag} tone="gray">
                {tag}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900">
            {proposal.title}
          </h2>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>{proposal.company}</span>
            <span className="text-slate-300">/</span>
            <span>{proposal.industry}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            <div className="flex items-center gap-2">
              <Avatar initials={proposal.owner.initials} size="sm" />
              <div>
                <p className="text-sm font-medium leading-tight text-slate-900">
                  {proposal.owner.name}
                </p>
                <p className="text-xs text-slate-500">{proposal.owner.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />
              最終更新 {formatDateLabel(proposal.updatedAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
          <Button variant="secondary">
            <FileDown className="h-4 w-4" />
            PDFで出力
          </Button>
          <Button variant="primary">
            <PenLine className="h-4 w-4" />
            提案を編集
          </Button>
        </div>
      </div>

      {/* サマリー数値カード */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="想定売上"
          value={formatAmount(proposal.amount)}
          icon={JapaneseYen}
        />
        <StatCard
          label="想定ROI"
          value={`${proposal.roi}%`}
          icon={TrendingUp}
        />
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium text-slate-500">提案進捗</p>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <Gauge className="h-4.5 w-4.5" />
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {proposal.progress}%
          </p>
          <ProgressBar
            value={proposal.progress}
            className="mt-3"
            label="提案進捗"
          />
        </Card>
        <StatCard
          label="次回アクション日"
          value={formatMonthDay(proposal.nextActionDate)}
          icon={CalendarDays}
        />
      </div>

      {/* 次回アクション強調カード */}
      <Card className="border-primary-100 bg-primary-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <CalendarClock className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-primary-700">
                次回アクション
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                {proposal.nextAction}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                対応期日: {formatDateLabel(proposal.nextActionDate)}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button variant="secondary" size="sm">
              <Check className="h-4 w-4" />
              対応済みにする
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* タブ UI */}
        <div className="space-y-4 lg:col-span-2">
          <div className="border-b border-slate-200">
            <nav
              className="-mb-px flex gap-6 overflow-x-auto"
              aria-label="提案詳細タブ"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cx(
                    "whitespace-nowrap border-b-2 pb-3 text-sm transition-colors",
                    activeTab === tab.key
                      ? "border-primary-600 font-medium text-primary-700"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-4">
              <Card className="p-6">
                <CardHeader title="提案概要" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {proposal.summary}
                </p>
              </Card>
              <Card className="p-6">
                <CardHeader title="背景・課題" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {proposal.background}
                </p>
              </Card>
            </div>
          )}

          {activeTab === "steps" && (
            <Card className="p-6">
              <CardHeader
                title="導入ステップ"
                description={`全${proposal.steps.length}ステップの導入計画`}
              />
              <ol className="mt-6">
                {proposal.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >
                    {i < proposal.steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-4 top-9 w-px -translate-x-1/2 bg-slate-200"
                      />
                    )}
                    <span
                      className={cx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        step.status === "done" && "bg-emerald-500 text-white",
                        step.status === "current" &&
                          "bg-primary-600 ring-4 ring-primary-100",
                        step.status === "upcoming" &&
                          "border-2 border-slate-200 bg-white",
                      )}
                    >
                      {step.status === "done" && <Check className="h-4 w-4" />}
                      {step.status === "current" && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                      {step.status === "upcoming" && (
                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                      )}
                    </span>
                    <div className="min-w-0 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {step.title}
                        </p>
                        {step.status === "current" && (
                          <Badge tone="primary">進行中</Badge>
                        )}
                        <Badge tone="gray">期間 {step.duration}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {activeTab === "effects" && (
            <Card className="p-6">
              <CardHeader
                title="想定効果"
                description="導入前後の比較(提案書記載の試算値)"
              />
              <div className="mt-4 divide-y divide-slate-100">
                {proposal.effects.map((effect) => (
                  <div
                    key={effect.label}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {effect.label}
                      </p>
                      {effect.note && (
                        <p className="mt-0.5 text-xs text-slate-500">
                          {effect.note}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:shrink-0">
                      <span className="text-xs text-slate-500">導入前</span>
                      <span className="text-sm text-slate-600">
                        {effect.before}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="text-xs text-slate-500">導入後</span>
                      <span className="text-sm font-bold text-slate-900">
                        {effect.after}
                      </span>
                      <Badge tone="green">{effect.improvement}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "risks" &&
            (proposal.risks.length > 0 ? (
              <div className="space-y-3">
                {proposal.risks.map((risk) => (
                  <Alert
                    key={risk.title}
                    tone={riskAlertTones[risk.severity]}
                    title={risk.title}
                  >
                    {risk.detail}
                  </Alert>
                ))}
              </div>
            ) : (
              <Alert
                tone="success"
                title="現時点で大きなリスクは確認されていません"
              >
                新しい確認事項が見つかった場合は、このタブに追加されます。
              </Alert>
            ))}
        </div>

        {/* 社内コメント */}
        <div>
          <Card className="p-6">
            <CardHeader
              title="社内コメント"
              description={`${proposal.comments.length}件のコメント`}
            />
            {proposal.comments.length > 0 ? (
              <div className="mt-2 divide-y divide-slate-100">
                {proposal.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 py-4">
                    <Avatar initials={comment.initials} size="sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <p className="text-sm font-medium text-slate-900">
                          {comment.author}
                        </p>
                        <p className="text-xs text-slate-400">
                          {comment.postedAt}
                        </p>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                まだコメントはありません
              </p>
            )}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <Textarea placeholder="コメントを入力…(モックのため送信されません)" />
              <div className="flex justify-end">
                <Button variant="primary" size="sm">
                  <Send className="h-4 w-4" />
                  コメントを追加
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
