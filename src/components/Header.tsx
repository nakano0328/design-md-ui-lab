import { Bell, Menu, Search } from "lucide-react";
import { currentUser } from "../data/mock";
import { Avatar } from "./ui";

export interface HeaderProps {
  title: string;
  /** モバイルでドロワーを開く */
  onMenuClick: () => void;
}

/** アプリ画面のヘッダー(DESIGN.md §9) */
export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="メニューを開く"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-lg font-bold text-slate-900 sm:text-xl">
        {title}
      </h1>

      <div className="hidden items-center md:flex">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="案件・企業名で検索"
            className="h-10 w-64 rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="通知"
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      <div className="flex items-center gap-2.5 pl-1">
        <Avatar initials={currentUser.initials} />
        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
          <p className="text-[11px] text-slate-500">{currentUser.role}</p>
        </div>
      </div>
    </header>
  );
}
