import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronsUpDown,
  Plus,
  Search,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import {
  formatAmount,
  proposals,
  statusLabels,
  type ProposalStatus,
} from "../data/mock";
import { Avatar, Button, Card, Input, cx } from "../components/ui";
import { PriorityBadge, StatusBadge } from "../components/StatusBadge";
import { ProposalCard } from "../components/ProposalCard";

type StatusFilter = ProposalStatus | "all";

const statusOrder: ProposalStatus[] = [
  "draft",
  "proposing",
  "negotiating",
  "won",
  "lost",
  "on_hold",
];

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return proposals.filter((p) => {
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;
      const matchesKeyword =
        keyword === "" ||
        p.title.toLowerCase().includes(keyword) ||
        p.company.toLowerCase().includes(keyword);
      return matchesStatus && matchesKeyword;
    });
  }, [query, statusFilter]);

  const countByStatus = useMemo(() => {
    const counts = {} as Record<ProposalStatus, number>;
    for (const status of statusOrder) {
      counts[status] = proposals.filter((p) => p.status === status).length;
    }
    return counts;
  }, []);

  const resetFilters = () => {
    setQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-4">
      {/* ツールバー */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="案件名・企業名で検索"
              aria-label="案件名・企業名で検索"
              className="pl-9"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="secondary">
              <SlidersHorizontal className="h-4 w-4" />
              フィルタ
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              新規案件
            </Button>
          </div>
        </div>

        {/* ステータスフィルタチップ */}
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="すべて"
            count={proposals.length}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          {statusOrder.map((status) => (
            <FilterChip
              key={status}
              label={statusLabels[status]}
              count={countByStatus[status]}
              active={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            />
          ))}
        </div>
      </div>

      {/* 結果件数 */}
      <p className="text-sm text-slate-500">
        全 {proposals.length} 件中 {filtered.length} 件を表示
      </p>

      {filtered.length === 0 ? (
        /* 空状態 */
        <Card className="p-12">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-400" />
            </span>
            <p className="mt-4 text-sm font-semibold text-slate-900">
              条件に一致する案件がありません
            </p>
            <p className="mt-1 text-sm text-slate-500">
              キーワードやステータスの条件を変更して、もう一度お試しください。
            </p>
            <Button
              variant="secondary"
              className="mt-5"
              onClick={resetFilters}
            >
              検索条件をクリア
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* デスクトップ: テーブル表示 */}
          <Card className="hidden md:block">
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full min-w-[880px] text-left">
                <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <span className="inline-flex items-center gap-1">
                        案件
                        <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="px-4 py-3 font-medium">ステータス</th>
                    <th className="px-4 py-3 font-medium">優先度</th>
                    <th className="px-4 py-3 text-right font-medium">
                      <span className="inline-flex items-center gap-1">
                        想定売上
                        <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />
                      </span>
                    </th>
                    <th className="px-4 py-3 text-right font-medium">ROI</th>
                    <th className="px-4 py-3 font-medium">担当</th>
                    <th className="px-4 py-3 font-medium">最終更新</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((proposal) => (
                    <tr
                      key={proposal.id}
                      className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-sm">
                        <p className="font-medium text-slate-900">
                          {proposal.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {proposal.company}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status={proposal.status} />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <PriorityBadge priority={proposal.priority} />
                      </td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums text-slate-900">
                        {formatAmount(proposal.amount)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums text-slate-600">
                        {proposal.roi}%
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <Avatar
                            initials={proposal.owner.initials}
                            size="sm"
                          />
                          <span className="whitespace-nowrap">
                            {proposal.owner.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm tabular-nums text-slate-500">
                        {proposal.updatedAt}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link
                          to={`/proposals/${proposal.id}`}
                          className={cx(
                            "inline-flex h-8 items-center justify-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors",
                            "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                          )}
                        >
                          詳細
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* モバイル: カードリスト表示 */}
          <div className="space-y-4 md:hidden">
            {filtered.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ステータス絞り込み用のチップ(装飾的な特殊ケースのため個別スタイル) */
function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        active
          ? "bg-primary-600 text-white"
          : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {label}
      <span
        className={cx(
          "tabular-nums",
          active ? "text-primary-200" : "text-slate-400",
        )}
      >
        {count}
      </span>
    </button>
  );
}
