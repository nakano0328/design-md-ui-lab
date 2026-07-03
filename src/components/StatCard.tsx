import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, cx } from "./ui";

export interface StatCardProps {
  label: string;
  value: string;
  /** 変化量の表示(例: "+12.5%") */
  change?: string;
  trend?: "up" | "down";
  /** 変化が良い方向かどうか(色分けに使う) */
  positive?: boolean;
  /** 補助説明(例: "先月比") */
  hint?: string;
  icon?: LucideIcon;
}

/** KPIカード(DESIGN.md §7) */
export function StatCard({
  label,
  value,
  change,
  trend = "up",
  positive = true,
  hint,
  icon: Icon,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <Icon className="h-4.5 w-4.5" />
          </span>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      {change && (
        <p className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={cx(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-emerald-600" : "text-red-600",
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {change}
          </span>
          {hint && <span className="text-slate-500">{hint}</span>}
        </p>
      )}
    </Card>
  );
}
