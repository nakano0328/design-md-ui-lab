import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProposalDetailPage } from "./pages/ProposalDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ComponentShowcasePage } from "./pages/ComponentShowcasePage";

export default function App() {
  return (
    <Routes>
      {/* LP は独自レイアウト */}
      <Route path="/" element={<LandingPage />} />

      {/* アプリ画面(サイドバー + ヘッダー付き) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/proposals/:id" element={<ProposalDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/components" element={<ComponentShowcasePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
