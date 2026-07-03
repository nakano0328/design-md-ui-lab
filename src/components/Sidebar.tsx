import { NavLink, Link } from "react-router-dom";
import {
  FolderKanban,
  Home,
  LayoutDashboard,
  Settings,
  Sparkles,
  SwatchBook,
} from "lucide-react";
import { cx } from "./ui";

const navItems = [
  { to: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { to: "/projects", label: "案件一覧", icon: FolderKanban },
  { to: "/settings", label: "設定", icon: Settings },
  { to: "/components", label: "コンポーネント", icon: SwatchBook },
];

export interface SidebarProps {
  /** モバイルドロワーで項目クリック時に閉じるためのコールバック */
  onNavigate?: () => void;
}

/** アプリ画面のサイドバー(DESIGN.md §9) */
export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-slate-900">Proposal AI</p>
          <p className="text-[10px] font-medium tracking-wide text-slate-500">
            DASHBOARD
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 px-3 py-4">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Home className="h-[18px] w-[18px] shrink-0" />
          トップページへ
        </Link>
      </div>
    </div>
  );
}
