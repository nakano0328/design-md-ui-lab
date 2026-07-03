/**
 * グラフ風パーツ — ライブラリを使わず CSS / インラインSVG だけで表現する
 * (requirements.md Phase 3 / DESIGN.md §10)。
 */
import { cx } from "./ui";

export interface BarDatum {
  label: string;
  value: number;
}

export interface BarChartMockProps {
  data: BarDatum[];
  /** 最後の棒を強調表示する(当月など) */
  highlightLast?: boolean;
  /** 棒の値のフォーマッタ(ツールチップ的なラベル表示用) */
  formatValue?: (value: number) => string;
  className?: string;
}

/** 棒グラフ風(縦棒) */
export function BarChartMock({
  data,
  highlightLast = true,
  formatValue,
  className,
}: BarChartMockProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cx("flex h-44 items-end gap-3 sm:gap-4", className)}>
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        const heightPct = Math.max((d.value / max) * 100, 4);
        return (
          <div
            key={d.label}
            className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
              {formatValue ? formatValue(d.value) : d.value.toLocaleString("ja-JP")}
            </span>
            <div
              role="img"
              aria-label={`${d.label}: ${formatValue ? formatValue(d.value) : d.value}`}
              className={cx(
                "w-full max-w-10 rounded-t-md transition-colors",
                isLast && highlightLast
                  ? "bg-primary-500 group-hover:bg-primary-600"
                  : "bg-primary-200 group-hover:bg-primary-300",
              )}
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[10px] text-slate-500">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export interface LineChartMockProps {
  labels: string[];
  values: number[];
  /** 単位表示(例: "%") */
  unit?: string;
  className?: string;
}

/** 折れ線グラフ風(インラインSVG、ライブラリ不使用) */
export function LineChartMock({
  labels,
  values,
  unit = "",
  className,
}: LineChartMockProps) {
  const width = 300;
  const height = 120;
  const pad = 8;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (width - pad * 2);
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return { x, y };
  });
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${height} ${polyline} ${width - pad},${height}`;
  const last = points[points.length - 1];

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-32 w-full"
        role="img"
        aria-label={`推移: ${values.map((v) => `${v}${unit}`).join(", ")}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#lineFill)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="var(--color-primary-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={last.x}
          cy={last.y}
          r="4"
          fill="white"
          stroke="var(--color-primary-600)"
          strokeWidth="2.5"
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export interface ProgressBarProps {
  /** 0-100 */
  value: number;
  tone?: "primary" | "green" | "amber" | "red";
  className?: string;
  label?: string;
}

const progressTones = {
  primary: "bg-primary-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
} as const;

/** 進捗バー風 */
export function ProgressBar({
  value,
  tone = "primary",
  className,
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cx("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cx("h-full rounded-full transition-all", progressTones[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
