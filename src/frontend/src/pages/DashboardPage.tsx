import { Switch } from "@/components/ui/switch";
import {
  Bot,
  Briefcase,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
  subtitle: string;
  subtitleColor: string;
}

interface ActivityItem {
  icon: React.ReactNode;
  iconColor: string;
  text: string;
  time: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  {
    icon: <MessageSquare size={20} />,
    iconBg: "rgba(6,182,212,0.15)",
    value: "1,247",
    label: "Total Messages",
    subtitle: "+12% this week",
    subtitleColor: "#22c55e",
  },
  {
    icon: <Mail size={20} />,
    iconBg: "rgba(59,130,246,0.15)",
    value: "384",
    label: "Emails Sent",
    subtitle: "+8 today",
    subtitleColor: "#9ca3af",
  },
  {
    icon: <Briefcase size={20} />,
    iconBg: "rgba(168,85,247,0.15)",
    value: "23",
    label: "Pending Jobs",
    subtitle: "Awaiting response",
    subtitleColor: "#9ca3af",
  },
];

const activities: ActivityItem[] = [
  {
    icon: <Mail size={15} />,
    iconColor: "#3b82f6",
    text: "Email sent to hiring@techcorp.io",
    time: "2 min ago",
  },
  {
    icon: <Bot size={15} />,
    iconColor: "#06b6d4",
    text: "3 jobs scraped from @remote_jobs_dev",
    time: "5 min ago",
  },
  {
    icon: <CheckCircle2 size={15} />,
    iconColor: "#22c55e",
    text: "Application submitted to Stripe (Backend Eng)",
    time: "18 min ago",
  },
  {
    icon: <Send size={15} />,
    iconColor: "#a855f7",
    text: "Cover letter generated for Notion – Product Designer",
    time: "34 min ago",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCardItem({ card, index }: { card: StatCard; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.22)" }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-2xl p-6 cursor-default"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
      }}
      data-ocid="stat-card"
    >
      {/* subtle corner shimmer */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10"
        style={{ background: card.iconBg, filter: "blur(20px)" }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-semibold text-white mb-1">{card.value}</p>
          <p className="text-sm font-medium text-white/80">{card.label}</p>
          <p className="text-xs mt-2" style={{ color: card.subtitleColor }}>
            {card.subtitle}
          </p>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{
            background: card.iconBg,
            color: card.iconBg.includes("212")
              ? "#06b6d4"
              : card.iconBg.includes("246")
                ? "#3b82f6"
                : "#a855f7",
          }}
        >
          {card.icon}
        </div>
      </div>
    </motion.div>
  );
}

function ConnectionRow({
  logo,
  name,
  connected,
  showToggle,
  toggleActive,
  onToggle,
}: {
  logo: React.ReactNode;
  name: string;
  connected: boolean;
  showToggle?: boolean;
  toggleActive?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3.5 group"
      data-ocid="connection-row"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {logo}
        </div>
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {showToggle && (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "#9ca3af" }}>
              Auto Listener
            </span>
            <Switch
              checked={toggleActive}
              onCheckedChange={onToggle}
              data-ocid="telegram-toggle"
            />
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: connected ? "#22c55e" : "#ef4444",
              boxShadow: connected
                ? "0 0 6px rgba(34,197,94,0.6)"
                : "0 0 6px rgba(239,68,68,0.6)",
            }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: connected ? "#22c55e" : "#ef4444" }}
          >
            {connected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Google "G" SVG ──────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google</title>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Telegram"
    >
      <title>Telegram</title>
      <path
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
        fill="#2AABEE"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [telegramListenerActive, setTelegramListenerActive] = useState(true);

  return (
    <AuthLayout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Header ── */}
        <motion.div variants={itemVariants}>
          <h1 className="text-[28px] font-semibold text-white leading-tight">
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
            Welcome back! Here's what's happening.
          </p>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {stats.map((card, i) => (
            <StatCardItem key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        {/* ── Connections ── */}
        <motion.div variants={itemVariants}>
          <h2 className="text-[18px] font-semibold text-white mb-3">
            Connections
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
            }}
            data-ocid="connections-card"
          >
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <ConnectionRow
                logo={<GoogleIcon />}
                name="Google"
                connected={true}
              />
            </div>
            <ConnectionRow
              logo={<TelegramIcon />}
              name="Telegram"
              connected={true}
              showToggle
              toggleActive={telegramListenerActive}
              onToggle={() => setTelegramListenerActive((v) => !v)}
            />
          </div>
        </motion.div>

        {/* ── Recent Activity ── */}
        <motion.div variants={itemVariants}>
          <h2 className="text-[18px] font-semibold text-white mb-3">
            Recent Activity
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
            }}
            data-ocid="activity-card"
          >
            {activities.map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 px-4 py-3.5"
                style={{
                  borderBottom:
                    i < activities.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                }}
                whileHover={{ background: "rgba(255,255,255,0.03)" }}
                transition={{ duration: 0.15 }}
                data-ocid="activity-item"
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${item.iconColor}18`,
                    color: item.iconColor,
                  }}
                >
                  {item.icon}
                </div>
                <p className="flex-1 text-sm text-white/80 min-w-0 truncate">
                  {item.text}
                </p>
                <span
                  className="flex-shrink-0 text-xs whitespace-nowrap"
                  style={{ color: "#9ca3af" }}
                >
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}
