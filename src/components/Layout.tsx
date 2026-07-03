import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const titles: [prefix: string, title: string][] = [
  ["/dashboard", "ダッシュボード"],
  ["/proposals", "提案詳細"],
  ["/projects", "案件一覧"],
  ["/settings", "設定"],
  ["/components", "コンポーネント一覧"],
];

function pageTitle(pathname: string): string {
  return titles.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? "";
}

/**
 * アプリ画面の共通シェル。
 * デスクトップは固定サイドバー、モバイルはドロワー(DESIGN.md §9, §12)。
 */
export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* デスクトップ用サイドバー */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 lg:block">
        <Sidebar />
      </aside>

      {/* モバイル用ドロワー */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="メニューを閉じる"
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-slate-200 bg-white shadow-xl">
            <button
              type="button"
              aria-label="メニューを閉じる"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <Header title={pageTitle(pathname)} onMenuClick={() => setDrawerOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
