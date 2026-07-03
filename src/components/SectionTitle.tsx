import type { ReactNode } from "react";
import { cx } from "./ui";

export interface SectionTitleProps {
  title: string;
  description?: string;
  /** 右寄せのアクション(ボタン・リンクなど) */
  action?: ReactNode;
  className?: string;
}

/** セクション見出し(DESIGN.md §3) */
export function SectionTitle({
  title,
  description,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div className={cx("flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-lg font-semibold leading-tight text-slate-900">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
