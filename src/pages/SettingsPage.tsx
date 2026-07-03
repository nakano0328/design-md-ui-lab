import { useState } from "react";
import { Camera, Monitor, Moon, Plus, Sun } from "lucide-react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Select,
  Toggle,
  cx,
} from "../components/ui";
import { currentUser, proposalTemplates } from "../data/mock";

/* ---------- ページ固有の表示用定義 ---------- */

interface NotificationItem {
  id: string;
  label: string;
  description: string;
}

const notificationItems: NotificationItem[] = [
  {
    id: "email",
    label: "メール通知",
    description: "重要な更新をメールで受け取ります。",
  },
  {
    id: "status",
    label: "案件ステータスの変更",
    description: "担当案件のステータスが変更されたときに通知します。",
  },
  {
    id: "mention",
    label: "コメント・メンション",
    description: "案件へのコメントや自分宛のメンションを通知します。",
  },
  {
    id: "weekly",
    label: "週次サマリーレポート",
    description: "毎週月曜の朝に、担当案件の進捗サマリーを配信します。",
  },
  {
    id: "reminder",
    label: "期限リマインダー",
    description: "次のアクション期限の前日にリマインドします。",
  },
];

type ThemeMode = "light" | "dark" | "system";

const themeOptions: {
  id: ThemeMode;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    id: "light",
    label: "ライト",
    description: "明るい背景で表示します",
    icon: Sun,
  },
  {
    id: "dark",
    label: "ダーク",
    description: "暗い背景で目の負担を軽減",
    icon: Moon,
  },
  {
    id: "system",
    label: "システム設定に従う",
    description: "OSの外観設定と自動で同期",
    icon: Monitor,
  },
];

const defaultTemplate =
  proposalTemplates.find((t) => t.isDefault) ?? proposalTemplates[0];

/* ---------- ページ本体 ---------- */

export function SettingsPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: true,
    status: true,
    mention: true,
    weekly: false,
    reminder: true,
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      {/* 1. プロフィール設定 */}
      <Card className="p-6">
        <CardHeader
          title="プロフィール設定"
          description="社内メンバーに表示される基本情報を管理します。"
        />
        <div className="mt-5 flex items-center gap-4">
          <Avatar
            initials={currentUser.initials}
            className="h-16 w-16 text-xl"
          />
          <div>
            <Button variant="secondary" size="sm">
              <Camera className="h-4 w-4" />
              写真を変更
            </Button>
            <p className="mt-1.5 text-xs text-slate-500">
              JPG・PNG形式、2MBまでの画像をアップロードできます。
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="氏名" htmlFor="profile-name">
            <Input id="profile-name" defaultValue={currentUser.name} />
          </Field>
          <Field label="メールアドレス" htmlFor="profile-email">
            <Input
              id="profile-email"
              type="email"
              defaultValue={currentUser.email}
            />
          </Field>
          <Field label="会社名" htmlFor="profile-company">
            <Input id="profile-company" defaultValue={currentUser.company} />
          </Field>
          <Field label="部署" htmlFor="profile-department">
            <Input
              id="profile-department"
              defaultValue={currentUser.department}
            />
          </Field>
          <Field label="役割" htmlFor="profile-role">
            <Input id="profile-role" defaultValue={currentUser.role} />
          </Field>
        </div>
      </Card>

      {/* 2. 通知設定 */}
      <Card className="p-6">
        <CardHeader
          title="通知設定"
          description="受け取る通知の種類を選択します。"
        />
        <div className="mt-3 divide-y divide-slate-100">
          {notificationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
              <Toggle
                checked={notifications[item.id]}
                onChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, [item.id]: checked }))
                }
                label={item.label}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 3. 提案テンプレート設定 */}
      <Card className="p-6">
        <CardHeader
          title="提案テンプレート設定"
          description="提案書作成時に使用するテンプレートを管理します。"
        />
        <div className="mt-3 divide-y divide-slate-100">
          {proposalTemplates.map((template) => (
            <div
              key={template.id}
              className="flex items-start justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">
                    {template.name}
                  </p>
                  {template.isDefault && <Badge tone="primary">既定</Badge>}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {template.description}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  最終更新: {template.updatedAt}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                編集
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <Field
            label="既定テンプレート"
            htmlFor="default-template"
            className="w-full sm:max-w-xs"
          >
            <Select id="default-template" defaultValue={defaultTemplate.id}>
              {proposalTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </Select>
          </Field>
          <Button variant="secondary" className="shrink-0">
            <Plus className="h-4 w-4" />
            新しいテンプレートを作成
          </Button>
        </div>
      </Card>

      {/* 4. デザインモード設定 */}
      <Card className="p-6">
        <CardHeader
          title="デザインモード"
          description="画面の外観と表示密度をカスタマイズします。"
        />
        <div
          role="radiogroup"
          aria-label="デザインモード"
          className="mt-5 grid gap-3 sm:grid-cols-3"
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const selected = themeMode === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setThemeMode(option.id)}
                className={cx(
                  "rounded-xl border p-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  selected
                    ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                    : "border-slate-200 bg-white hover:border-slate-300",
                )}
              >
                <Icon
                  className={cx(
                    "h-5 w-5",
                    selected ? "text-primary-600" : "text-slate-500",
                  )}
                />
                <p
                  className={cx(
                    "mt-2 text-sm font-medium",
                    selected ? "text-primary-700" : "text-slate-900",
                  )}
                >
                  {option.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          モックのため実際のテーマは変わりません。
        </p>
        <div className="mt-5">
          <Field
            label="表示密度"
            htmlFor="display-density"
            hint="一覧画面の行間とカードの余白に反映されます。"
            className="sm:max-w-xs"
          >
            <Select id="display-density" defaultValue="standard">
              <option value="compact">コンパクト</option>
              <option value="standard">標準</option>
            </Select>
          </Field>
        </div>
      </Card>

      {/* 5. 保存バー */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        {saved && (
          <Alert tone="success" title="設定を保存しました">
            モックのため実際には保存されません。
          </Alert>
        )}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setSaved(false)}>
            変更を破棄
          </Button>
          <Button variant="primary" onClick={() => setSaved(true)}>
            変更を保存
          </Button>
        </div>
      </div>
    </div>
  );
}
