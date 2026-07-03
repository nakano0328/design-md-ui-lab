import { Badge, type BadgeTone } from "./ui";
import {
  priorityLabels,
  statusLabels,
  type Priority,
  type ProposalStatus,
} from "../data/mock";

const statusTones: Record<ProposalStatus, BadgeTone> = {
  draft: "gray",
  proposing: "blue",
  negotiating: "violet",
  won: "green",
  lost: "red",
  on_hold: "amber",
};

/** 案件ステータスの色付きバッジ(DESIGN.md §2 セマンティックカラー) */
export function StatusBadge({ status }: { status: ProposalStatus }) {
  return <Badge tone={statusTones[status]}>{statusLabels[status]}</Badge>;
}

const priorityTones: Record<Priority, BadgeTone> = {
  high: "red",
  medium: "amber",
  low: "gray",
};

const priorityDots: Record<Priority, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-slate-400",
};

/** 優先度バッジ(ドット + ラベル) */
export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge tone={priorityTones[priority]}>
      <span className={`h-1.5 w-1.5 rounded-full ${priorityDots[priority]}`} />
      優先度 {priorityLabels[priority]}
    </Badge>
  );
}
