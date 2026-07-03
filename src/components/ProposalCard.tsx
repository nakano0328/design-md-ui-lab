import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, CalendarClock } from "lucide-react";
import { formatAmount, type Proposal } from "../data/mock";
import { ProgressBar } from "./ChartMock";
import { StatusBadge } from "./StatusBadge";
import { Avatar, Card } from "./ui";

/** 提案案件のサマリーカード(ダッシュボード・一覧で使用) */
export function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <Card interactive className="p-5">
      <Link
        to={`/proposals/${proposal.id}`}
        className="block focus-visible:outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{proposal.company}</span>
            </p>
            <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
              {proposal.title}
            </h3>
          </div>
          <StatusBadge status={proposal.status} />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            想定売上{" "}
            <span className="font-semibold text-slate-900">
              {formatAmount(proposal.amount)}
            </span>
          </span>
          <span>
            ROI{" "}
            <span className="font-semibold text-slate-900">{proposal.roi}%</span>
          </span>
        </div>

        <div className="mt-3">
          <ProgressBar value={proposal.progress} label="提案の進捗" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Avatar initials={proposal.owner.initials} size="sm" />
            {proposal.owner.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <CalendarClock className="h-3.5 w-3.5" />
            {proposal.nextActionDate}
            <ArrowUpRight className="h-3.5 w-3.5 text-primary-600" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
