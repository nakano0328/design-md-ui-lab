/**
 * モックデータ — 全画面はこのファイルのデータだけを参照する。
 * API・DB・認証は存在しない(requirements.md 参照)。
 */

export type ProposalStatus =
  | "draft"
  | "proposing"
  | "negotiating"
  | "won"
  | "lost"
  | "on_hold";

export type Priority = "high" | "medium" | "low";

export const statusLabels: Record<ProposalStatus, string> = {
  draft: "下書き",
  proposing: "提案中",
  negotiating: "交渉中",
  won: "受注",
  lost: "失注",
  on_hold: "保留",
};

export const priorityLabels: Record<Priority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface ProposalStep {
  title: string;
  description: string;
  duration: string;
  status: "done" | "current" | "upcoming";
}

export interface EffectEstimate {
  label: string;
  before: string;
  after: string;
  improvement: string;
  note?: string;
}

export interface RiskItem {
  title: string;
  detail: string;
  severity: Priority;
}

export interface ProposalComment {
  id: string;
  author: string;
  initials: string;
  postedAt: string;
  body: string;
}

export interface Proposal {
  id: string;
  title: string;
  company: string;
  industry: string;
  status: ProposalStatus;
  priority: Priority;
  owner: TeamMember;
  /** 想定売上(万円) */
  amount: number;
  /** 想定ROI(%) */
  roi: number;
  /** 提案の進捗(0-100) */
  progress: number;
  updatedAt: string;
  nextAction: string;
  nextActionDate: string;
  summary: string;
  background: string;
  tags: string[];
  steps: ProposalStep[];
  effects: EffectEstimate[];
  risks: RiskItem[];
  comments: ProposalComment[];
}

export const teamMembers: TeamMember[] = [
  { id: "m1", name: "佐藤 陽", role: "AIコンサルタント", initials: "佐" },
  { id: "m2", name: "田中 美咲", role: "セールス", initials: "田" },
  { id: "m3", name: "鈴木 健太", role: "MLエンジニア", initials: "鈴" },
  { id: "m4", name: "高橋 恵", role: "カスタマーサクセス", initials: "高" },
];

export const currentUser = {
  ...teamMembers[0],
  email: "haru.sato@example.com",
  company: "株式会社ヒバリAIパートナーズ",
  department: "AIソリューション事業部",
};

export const proposals: Proposal[] = [
  {
    id: "p-001",
    title: "問い合わせ対応AIチャットボット導入",
    company: "株式会社ミツバ物流",
    industry: "物流",
    status: "proposing",
    priority: "high",
    owner: teamMembers[0],
    amount: 1200,
    roi: 280,
    progress: 65,
    updatedAt: "2026-07-01",
    nextAction: "経営会議向けの効果試算資料を送付",
    nextActionDate: "2026-07-04",
    summary:
      "月間3,000件を超えるカスタマーサポート問い合わせのうち、定型的な配送状況確認・再配達依頼をAIチャットボットで自動化する。FAQの自動応答と基幹システム連携により、一次対応の約6割を無人化し、オペレーターは複雑な案件に集中できる体制を作る。",
    background:
      "繁忙期にサポート窓口の応答率が70%まで低下し、機会損失とクレーム増加が経営課題になっている。採用による増員はコスト面で限界があり、自動化による恒常的な対応能力の底上げが求められている。",
    tags: ["チャットボット", "カスタマーサポート", "業務自動化"],
    steps: [
      {
        title: "現状分析・FAQ整備",
        description: "過去1年分の問い合わせログを分類し、自動化対象を特定",
        duration: "2週間",
        status: "done",
      },
      {
        title: "PoC構築",
        description: "上位20カテゴリのFAQで応答精度を検証(目標正答率85%)",
        duration: "4週間",
        status: "current",
      },
      {
        title: "基幹システム連携",
        description: "配送管理システムと連携し、配送状況の自動照会を実装",
        duration: "6週間",
        status: "upcoming",
      },
      {
        title: "本番導入・運用定着",
        description: "段階的リリースとオペレーター向け運用トレーニング",
        duration: "4週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "一次対応の自動化率",
        before: "0%",
        after: "60%",
        improvement: "+60pt",
        note: "定型問い合わせ(配送状況・再配達)が対象",
      },
      {
        label: "平均応答時間",
        before: "8分",
        after: "10秒",
        improvement: "-98%",
      },
      {
        label: "月間対応コスト",
        before: "320万円",
        after: "190万円",
        improvement: "-41%",
        note: "オペレーター工数の削減分を換算",
      },
    ],
    risks: [
      {
        title: "FAQ整備の負荷",
        detail:
          "初期のFAQ整備に現場担当者の工数が必要。専任者のアサインを先方と要調整。",
        severity: "medium",
      },
      {
        title: "基幹システムのAPI仕様",
        detail:
          "配送管理システムが古く、API仕様書が最新化されていない可能性がある。",
        severity: "high",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "田中 美咲",
        initials: "田",
        postedAt: "2026-06-30 17:20",
        body: "先方の情報システム部長がPoCの精度指標に強い関心。次回打ち合わせで検証計画の詳細を共有したいです。",
      },
      {
        id: "c2",
        author: "佐藤 陽",
        initials: "佐",
        postedAt: "2026-07-01 09:45",
        body: "効果試算をコスト削減だけでなく応答率改善(CX向上)の観点でも整理しました。経営会議資料に反映済みです。",
      },
    ],
  },
  {
    id: "p-002",
    title: "需要予測AIによる在庫最適化",
    company: "サクラ製菓株式会社",
    industry: "食品製造",
    status: "negotiating",
    priority: "high",
    owner: teamMembers[2],
    amount: 2400,
    roi: 340,
    progress: 80,
    updatedAt: "2026-06-28",
    nextAction: "契約条件(成果報酬部分)の最終確認",
    nextActionDate: "2026-07-07",
    summary:
      "季節商品の需要予測をAIで高度化し、過剰在庫と欠品を同時に削減する。過去5年の販売実績・気象データ・催事カレンダーを学習した予測モデルを構築し、発注業務システムに組み込む。",
    background:
      "熟練担当者の経験に依存した発注により、廃棄ロスが年間8,000万円規模で発生。担当者の定年退職を控え、ノウハウのシステム化が急務。",
    tags: ["需要予測", "在庫最適化", "製造業DX"],
    steps: [
      {
        title: "データ収集・整備",
        description: "販売実績・気象・催事データの統合基盤を構築",
        duration: "3週間",
        status: "done",
      },
      {
        title: "予測モデル構築",
        description: "主要50SKUで予測精度を検証(MAPE 15%以下)",
        duration: "6週間",
        status: "done",
      },
      {
        title: "発注システム連携",
        description: "推奨発注量を既存システムに自動連携",
        duration: "4週間",
        status: "current",
      },
      {
        title: "全SKU展開",
        description: "対象を全300SKUに拡大し運用ルールを策定",
        duration: "8週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "廃棄ロス",
        before: "年間8,000万円",
        after: "年間4,400万円",
        improvement: "-45%",
      },
      {
        label: "欠品率",
        before: "3.2%",
        after: "1.1%",
        improvement: "-66%",
      },
      {
        label: "発注業務時間",
        before: "週12時間",
        after: "週3時間",
        improvement: "-75%",
      },
    ],
    risks: [
      {
        title: "異常気象時の予測精度",
        detail: "学習データにない極端な気象条件では精度が低下する。人手による補正ルールを併用する。",
        severity: "medium",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "鈴木 健太",
        initials: "鈴",
        postedAt: "2026-06-27 14:10",
        body: "PoCの最終精度はMAPE 12.8%で目標クリア。先方の購買部門も結果に納得感を持っています。",
      },
    ],
  },
  {
    id: "p-003",
    title: "営業日報の自動要約・ナレッジ化",
    company: "株式会社アオゾラ商事",
    industry: "商社",
    status: "proposing",
    priority: "medium",
    owner: teamMembers[1],
    amount: 800,
    roi: 190,
    progress: 40,
    updatedAt: "2026-06-30",
    nextAction: "営業部門長へのデモ実施",
    nextActionDate: "2026-07-10",
    summary:
      "営業担当120名の日報をLLMで自動要約し、案件リスク・顧客ニーズを横断検索できるナレッジベースを構築する。マネージャーの日報確認時間を大幅に削減し、埋もれていた商談機会を発掘する。",
    background:
      "日報が形骸化しており、マネージャーは全件を読み切れていない。過去の商談ナレッジが個人に閉じ、営業ノウハウの共有が進まない。",
    tags: ["LLM活用", "ナレッジマネジメント", "営業DX"],
    steps: [
      {
        title: "要件定義・セキュリティ確認",
        description: "日報データの取り扱い方針と要約フォーマットを策定",
        duration: "2週間",
        status: "done",
      },
      {
        title: "要約パイプライン構築",
        description: "日報の自動要約とリスク検知タグの付与を実装",
        duration: "4週間",
        status: "current",
      },
      {
        title: "検索UI・通知連携",
        description: "横断検索画面とチャットツール通知を実装",
        duration: "4週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "日報確認時間(マネージャー)",
        before: "1日90分",
        after: "1日20分",
        improvement: "-78%",
      },
      {
        label: "商談フォロー漏れ",
        before: "月15件",
        after: "月3件",
        improvement: "-80%",
      },
    ],
    risks: [
      {
        title: "個人情報の取り扱い",
        detail: "日報に顧客個人名が含まれるため、マスキング処理の要件を法務と確認中。",
        severity: "high",
      },
      {
        title: "現場の入力習慣",
        detail: "日報の記載粒度にばらつきがあり、要約品質に影響する可能性。",
        severity: "low",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "田中 美咲",
        initials: "田",
        postedAt: "2026-06-29 11:30",
        body: "デモは実データに近いサンプルで見せてほしいと要望あり。ダミー日報を50件作成して準備します。",
      },
    ],
  },
  {
    id: "p-004",
    title: "製造ライン外観検査AIの導入",
    company: "東海精密工業株式会社",
    industry: "精密機器製造",
    status: "won",
    priority: "medium",
    owner: teamMembers[2],
    amount: 3600,
    roi: 220,
    progress: 100,
    updatedAt: "2026-06-25",
    nextAction: "キックオフミーティングの日程調整",
    nextActionDate: "2026-07-08",
    summary:
      "金属部品の外観検査を画像認識AIで自動化する。熟練検査員と同等の検出精度を維持しながら、検査スループットを3倍に向上させる。",
    background:
      "検査員の高齢化と採用難により、検査工程がボトルネック化。夜間シフトの検査体制が組めず、生産能力を制限している。",
    tags: ["画像認識", "外観検査", "スマートファクトリー"],
    steps: [
      {
        title: "撮像環境構築",
        description: "検査ラインへのカメラ・照明の設置と画像収集",
        duration: "4週間",
        status: "done",
      },
      {
        title: "検出モデル開発",
        description: "不良サンプルの学習と検出精度の検証",
        duration: "8週間",
        status: "done",
      },
      {
        title: "ライン組み込み",
        description: "PLC連携によるNG品自動排出の実装",
        duration: "6週間",
        status: "done",
      },
    ],
    effects: [
      {
        label: "検査スループット",
        before: "毎時400個",
        after: "毎時1,200個",
        improvement: "+200%",
      },
      {
        label: "見逃し率",
        before: "0.8%",
        after: "0.2%",
        improvement: "-75%",
      },
    ],
    risks: [
      {
        title: "新規不良パターンへの対応",
        detail: "運用開始後も定期的な再学習体制が必要。保守契約に含めて対応。",
        severity: "low",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "高橋 恵",
        initials: "高",
        postedAt: "2026-06-25 16:00",
        body: "受注確定です!導入プロジェクトはCS側で引き継ぎます。キックオフは7月第2週で調整中。",
      },
    ],
  },
  {
    id: "p-005",
    title: "社内ヘルプデスクAIアシスタント",
    company: "株式会社ホシノ銀行",
    industry: "金融",
    status: "on_hold",
    priority: "low",
    owner: teamMembers[0],
    amount: 1500,
    roi: 160,
    progress: 30,
    updatedAt: "2026-06-20",
    nextAction: "セキュリティ審査の再開時期を確認",
    nextActionDate: "2026-07-15",
    summary:
      "行内の情報システム部門に寄せられるPC・システム操作の問い合わせをAIアシスタントで自動応答する。行内ポータルに組み込み、24時間の自己解決を可能にする。",
    background:
      "情シス部門の問い合わせ対応が月800件を超え、本来のシステム企画業務を圧迫している。",
    tags: ["社内ヘルプデスク", "金融", "LLM活用"],
    steps: [
      {
        title: "セキュリティ審査",
        description: "行内セキュリティ基準への適合性評価",
        duration: "6週間",
        status: "current",
      },
      {
        title: "ナレッジ整備",
        description: "社内マニュアルの構造化とRAG基盤構築",
        duration: "4週間",
        status: "upcoming",
      },
      {
        title: "パイロット導入",
        description: "本店部門1,000名を対象に試験運用",
        duration: "8週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "情シス問い合わせ件数",
        before: "月800件",
        after: "月350件",
        improvement: "-56%",
      },
    ],
    risks: [
      {
        title: "行内セキュリティ基準",
        detail: "オンプレミス構成が必須となった場合、初期費用が大幅に増加する。",
        severity: "high",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "佐藤 陽",
        initials: "佐",
        postedAt: "2026-06-20 10:15",
        body: "先方のセキュリティ審査が期末対応で一時停止。7月中旬に再開見込みのため、それまで保留とします。",
      },
    ],
  },
  {
    id: "p-006",
    title: "コールセンター音声解析・応対品質改善",
    company: "フタバ損害保険株式会社",
    industry: "保険",
    status: "draft",
    priority: "medium",
    owner: teamMembers[1],
    amount: 2000,
    roi: 210,
    progress: 15,
    updatedAt: "2026-07-02",
    nextAction: "初回ヒアリングの議事録を提案書に反映",
    nextActionDate: "2026-07-05",
    summary:
      "コールセンターの通話音声をAIで文字起こし・解析し、応対品質の自動評価とコンプライアンスチェックを行う。管理者のモニタリング業務を効率化し、優良応対のナレッジ展開を加速する。",
    background:
      "現在は全通話の3%しか品質チェックできておらず、応対品質のばらつきが顧客満足度調査で指摘されている。",
    tags: ["音声解析", "品質管理", "コールセンター"],
    steps: [
      {
        title: "ヒアリング・現状分析",
        description: "評価基準と既存モニタリングフローの整理",
        duration: "2週間",
        status: "current",
      },
      {
        title: "PoC設計",
        description: "文字起こし精度と自動評価の妥当性を検証",
        duration: "4週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "品質チェック対象",
        before: "全通話の3%",
        after: "全通話の100%",
        improvement: "全件化",
      },
      {
        label: "モニタリング工数",
        before: "月160時間",
        after: "月40時間",
        improvement: "-75%",
      },
    ],
    risks: [
      {
        title: "専門用語の認識精度",
        detail: "保険商品固有の用語が多く、辞書チューニングの工数を見込む必要がある。",
        severity: "medium",
      },
    ],
    comments: [],
  },
  {
    id: "p-007",
    title: "契約書レビューAIの試験導入",
    company: "株式会社ヤマブキ不動産",
    industry: "不動産",
    status: "lost",
    priority: "low",
    owner: teamMembers[3],
    amount: 600,
    roi: 140,
    progress: 100,
    updatedAt: "2026-06-15",
    nextAction: "失注理由の分析と半年後の再アプローチ計画",
    nextActionDate: "2026-07-20",
    summary:
      "賃貸借契約書のレビューをAIで支援し、法務チェックのリードタイムを短縮する提案。リスク条項の自動検出と修正文案の提示を行う。",
    background:
      "法務部2名で月200件の契約書を確認しており、繁忙期は営業のクロージングが遅延している。",
    tags: ["リーガルテック", "契約書レビュー"],
    steps: [
      {
        title: "提案・デモ",
        description: "サンプル契約書での検出精度デモを実施",
        duration: "2週間",
        status: "done",
      },
    ],
    effects: [
      {
        label: "契約書レビュー時間",
        before: "1件45分",
        after: "1件15分",
        improvement: "-67%",
      },
    ],
    risks: [],
    comments: [
      {
        id: "c1",
        author: "高橋 恵",
        initials: "高",
        postedAt: "2026-06-15 13:40",
        body: "予算凍結により今期は見送りとの連絡。ツール自体の評価は高く、来期予算での再検討を約束いただきました。",
      },
    ],
  },
  {
    id: "p-008",
    title: "ECサイト レコメンドエンジン刷新",
    company: "株式会社コハクマーケット",
    industry: "小売・EC",
    status: "negotiating",
    priority: "high",
    owner: teamMembers[3],
    amount: 1800,
    roi: 310,
    progress: 70,
    updatedAt: "2026-07-02",
    nextAction: "A/Bテスト設計のすり合わせ",
    nextActionDate: "2026-07-09",
    summary:
      "ルールベースの商品レコメンドを機械学習ベースに刷新し、パーソナライズ精度を向上させる。購買履歴・閲覧行動・季節性を考慮したレコメンドでクロスセルを強化する。",
    background:
      "レコメンド経由の売上比率が業界平均を大きく下回っており、CVR改善の最重要施策と位置付けられている。",
    tags: ["レコメンド", "EC", "機械学習"],
    steps: [
      {
        title: "データ基盤整備",
        description: "行動ログの収集基盤とデータマートを構築",
        duration: "4週間",
        status: "done",
      },
      {
        title: "モデル開発・オフライン検証",
        description: "既存ロジックとの精度比較(CTR/CVRシミュレーション)",
        duration: "6週間",
        status: "current",
      },
      {
        title: "A/Bテスト・本番展開",
        description: "トラフィックの10%から段階的に展開",
        duration: "6週間",
        status: "upcoming",
      },
    ],
    effects: [
      {
        label: "レコメンド経由売上",
        before: "月1,200万円",
        after: "月2,000万円",
        improvement: "+67%",
      },
      {
        label: "CVR",
        before: "1.8%",
        after: "2.4%",
        improvement: "+33%",
      },
    ],
    risks: [
      {
        title: "コールドスタート問題",
        detail: "新規商品・新規ユーザーへのレコメンド精度が課題。人気度ベースのフォールバックを設計。",
        severity: "medium",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "高橋 恵",
        initials: "高",
        postedAt: "2026-07-02 15:25",
        body: "オフライン検証でCTR +21%の結果。先方マーケ部門は前向きで、A/Bテストの評価指標を来週すり合わせます。",
      },
    ],
  },
];

/* ---------- ダッシュボード用データ ---------- */

export interface Kpi {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  /** trend が良い変化かどうか(downでも良い場合がある) */
  positive: boolean;
  hint: string;
}

export const kpis: Kpi[] = [
  {
    id: "k1",
    label: "提案中の案件",
    value: "12件",
    change: "+3件",
    trend: "up",
    positive: true,
    hint: "先月比",
  },
  {
    id: "k2",
    label: "今月の想定売上",
    value: "8,400万円",
    change: "+12.5%",
    trend: "up",
    positive: true,
    hint: "先月比",
  },
  {
    id: "k3",
    label: "平均ROI",
    value: "231%",
    change: "+18pt",
    trend: "up",
    positive: true,
    hint: "受注案件ベース",
  },
  {
    id: "k4",
    label: "今週の要対応",
    value: "5件",
    change: "-2件",
    trend: "down",
    positive: true,
    hint: "先週比",
  },
];

export interface MonthlyRevenue {
  month: string;
  /** 想定売上(万円) */
  value: number;
}

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "2月", value: 4200 },
  { month: "3月", value: 5100 },
  { month: "4月", value: 4800 },
  { month: "5月", value: 6300 },
  { month: "6月", value: 7500 },
  { month: "7月", value: 8400 },
];

/** ROI推移(%) — 折れ線グラフ用 */
export const roiTrend = {
  labels: ["2月", "3月", "4月", "5月", "6月", "7月"],
  values: [180, 195, 188, 210, 224, 231],
};

export interface Activity {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  time: string;
  type: "comment" | "status" | "document" | "meeting";
}

export const activities: Activity[] = [
  {
    id: "a1",
    actor: "高橋 恵",
    initials: "高",
    action: "がコメントを追加",
    target: "ECサイト レコメンドエンジン刷新",
    time: "2時間前",
    type: "comment",
  },
  {
    id: "a2",
    actor: "田中 美咲",
    initials: "田",
    action: "が新規案件を作成",
    target: "コールセンター音声解析・応対品質改善",
    time: "5時間前",
    type: "document",
  },
  {
    id: "a3",
    actor: "佐藤 陽",
    initials: "佐",
    action: "が効果試算を更新",
    target: "問い合わせ対応AIチャットボット導入",
    time: "昨日 17:30",
    type: "document",
  },
  {
    id: "a4",
    actor: "鈴木 健太",
    initials: "鈴",
    action: "がステータスを「交渉中」に変更",
    target: "需要予測AIによる在庫最適化",
    time: "昨日 14:05",
    type: "status",
  },
  {
    id: "a5",
    actor: "高橋 恵",
    initials: "高",
    action: "が打ち合わせを記録",
    target: "製造ライン外観検査AIの導入",
    time: "2日前",
    type: "meeting",
  },
];

export interface PriorityTask {
  id: string;
  title: string;
  proposalId: string;
  company: string;
  due: string;
  priority: Priority;
}

export const priorityTasks: PriorityTask[] = [
  {
    id: "t1",
    title: "経営会議向けの効果試算資料を送付",
    proposalId: "p-001",
    company: "株式会社ミツバ物流",
    due: "7/4(土)",
    priority: "high",
  },
  {
    id: "t2",
    title: "初回ヒアリングの議事録を提案書に反映",
    proposalId: "p-006",
    company: "フタバ損害保険株式会社",
    due: "7/5(日)",
    priority: "medium",
  },
  {
    id: "t3",
    title: "契約条件(成果報酬部分)の最終確認",
    proposalId: "p-002",
    company: "サクラ製菓株式会社",
    due: "7/7(火)",
    priority: "high",
  },
  {
    id: "t4",
    title: "キックオフミーティングの日程調整",
    proposalId: "p-004",
    company: "東海精密工業株式会社",
    due: "7/8(水)",
    priority: "medium",
  },
  {
    id: "t5",
    title: "A/Bテスト設計のすり合わせ",
    proposalId: "p-008",
    company: "株式会社コハクマーケット",
    due: "7/9(木)",
    priority: "high",
  },
];

/* ---------- 設定画面用データ ---------- */

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  updatedAt: string;
}

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: "tpl-1",
    name: "標準提案テンプレート",
    description: "課題整理 → 解決アプローチ → 導入ステップ → 効果試算の標準構成",
    isDefault: true,
    updatedAt: "2026-06-10",
  },
  {
    id: "tpl-2",
    name: "PoC提案テンプレート",
    description: "小規模検証から始める段階導入型の提案フォーマット",
    isDefault: false,
    updatedAt: "2026-05-28",
  },
  {
    id: "tpl-3",
    name: "経営層向けサマリー",
    description: "ROIと経営インパクトを1枚に集約したエグゼクティブ向け構成",
    isDefault: false,
    updatedAt: "2026-04-15",
  },
];

/* ---------- ヘルパー ---------- */

/** 万円単位の金額を表示用文字列にする(例: 1200 → "1,200万円") */
export function formatAmount(man: number): string {
  return `${man.toLocaleString("ja-JP")}万円`;
}

export function getProposalById(id: string): Proposal | undefined {
  return proposals.find((p) => p.id === id);
}

/** ステータスごとの件数(ダッシュボードのステータス一覧用) */
export const statusSummary: { status: ProposalStatus; count: number }[] = (
  ["proposing", "negotiating", "won", "on_hold", "draft", "lost"] as const
).map((status) => ({
  status,
  count: proposals.filter((p) => p.status === status).length,
}));
