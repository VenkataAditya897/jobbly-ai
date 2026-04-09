import { Switch } from "@/components/ui/switch";
import {
  CheckCircle2,
  Hash,
  Loader2,
  Phone,
  Plus,
  Send,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";

const MOCK_CHANNELS = ["@job_alerts_ru", "@dev_jobs", "@it_vacancies"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function NotConnectedPanel({ onConnect }: { onConnect: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);

  function handleSendOtp() {
    if (!phone.trim()) return;
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setShowOtp(true);
    }, 1200);
  }

  function handleVerify() {
    if (!otp.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onConnect();
    }, 1400);
  }

  return (
    <motion.div
      key="not-connected"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center justify-center flex-1 min-h-[calc(100vh-160px)]"
    >
      <div className="glass p-8 w-full max-w-md space-y-6">
        {/* Card header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Send className="w-4 h-4" style={{ color: "#38bdf8" }} />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Connect Telegram
            </h2>
          </div>
          <p className="text-sm pl-11" style={{ color: "#9ca3af" }}>
            Enter your phone number to get started
          </p>
        </div>

        {/* Phone input */}
        <div className="space-y-2">
          <label
            htmlFor="phone-input"
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color: "#9ca3af" }}
          >
            Phone Number
          </label>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Phone
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#9ca3af" }}
            />
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              data-ocid="telegram-phone-input"
              className="flex-1 bg-transparent text-sm text-white placeholder-[#9ca3af] outline-none"
              onKeyDown={(e) =>
                e.key === "Enter" && !showOtp && handleSendOtp()
              }
            />
          </div>
        </div>

        {/* OTP input */}
        <AnimatePresence>
          {showOtp && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-2"
            >
              <label
                htmlFor="otp-input"
                className="text-xs font-medium tracking-wide uppercase"
                style={{ color: "#9ca3af" }}
              >
                Verification Code
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#9ca3af" }}
                />
                <input
                  id="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="6-digit code"
                  data-ocid="telegram-otp-input"
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#9ca3af] outline-none tracking-[0.25em]"
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
              </div>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Code sent to <span className="text-white">{phone}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="space-y-3">
          {!showOtp ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!phone.trim() || sendingOtp}
              data-ocid="telegram-send-otp-btn"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: phone.trim()
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(255,255,255,0.1)",
                color: phone.trim() ? "#0a0a0a" : "#9ca3af",
              }}
            >
              {sendingOtp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerify}
              disabled={otp.length < 4 || verifying}
              data-ocid="telegram-verify-btn"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background:
                  otp.length >= 4
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(255,255,255,0.1)",
                color: otp.length >= 4 ? "#0a0a0a" : "#9ca3af",
              }}
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                "Verify & Connect"
              )}
            </button>
          )}

          {showOtp && (
            <button
              type="button"
              onClick={() => {
                setShowOtp(false);
                setOtp("");
              }}
              className="w-full py-2 text-sm transition-smooth hover:text-white"
              style={{ color: "#9ca3af" }}
            >
              ← Change phone number
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ConnectedPanel({ onDisconnect }: { onDisconnect: () => void }) {
  const [listenerActive, setListenerActive] = useState(true);
  const [channels, setChannels] = useState<string[]>(MOCK_CHANNELS);
  const [newChannel, setNewChannel] = useState("");

  function handleAddChannel() {
    const val = newChannel.trim();
    if (!val) return;
    const formatted = val.startsWith("@") ? val : `@${val}`;
    if (channels.includes(formatted)) return;
    setChannels((prev) => [...prev, formatted]);
    setNewChannel("");
  }

  function handleRemoveChannel(ch: string) {
    setChannels((prev) => prev.filter((c) => c !== ch));
  }

  return (
    <motion.div
      key="connected"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      {/* Status card */}
      <div className="glass p-6 space-y-5">
        {/* Top row: identity + badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.2)",
              }}
            >
              <Send className="w-5 h-5" style={{ color: "#38bdf8" }} />
            </div>
            <div>
              <p className="font-semibold text-white">Telegram</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Account connected
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#4ade80",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
            />
            Connected
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

        {/* Listener toggle row */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-white">Auto Listener</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              {listenerActive
                ? "Actively monitoring channels"
                : "Listener paused"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {listenerActive ? (
              <Wifi className="w-4 h-4" style={{ color: "#4ade80" }} />
            ) : (
              <WifiOff className="w-4 h-4" style={{ color: "#9ca3af" }} />
            )}
            <Switch
              checked={listenerActive}
              onCheckedChange={setListenerActive}
              data-ocid="telegram-listener-toggle"
              style={
                listenerActive
                  ? {
                      background: "rgba(56,189,248,0.8)",
                      boxShadow: "0 0 12px rgba(56,189,248,0.35)",
                    }
                  : {}
              }
            />
          </div>
        </div>

        {/* Disconnect */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onDisconnect}
            data-ocid="telegram-disconnect-btn"
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-smooth hover:opacity-80"
            style={{
              color: "#f87171",
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Channels card */}
      <div className="glass p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-white">Monitored Channels</h3>
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
            Channels being scanned for job listings
          </p>
        </div>

        {/* Channel list */}
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {channels.map((ch) => (
              <motion.div
                key={ch}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between px-4 py-3 rounded-xl group transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                data-ocid="telegram-channel-row"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Hash
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "#9ca3af" }}
                  />
                  <span className="text-sm text-white font-mono truncate">
                    {ch}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      color: "#4ade80",
                    }}
                  >
                    Active
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChannel(ch)}
                    data-ocid="telegram-remove-channel-btn"
                    className="w-6 h-6 flex items-center justify-center rounded-md transition-smooth opacity-0 group-hover:opacity-100"
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      color: "#f87171",
                    }}
                    aria-label={`Remove ${ch}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {channels.length === 0 && (
            <div
              className="text-center py-8 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.08)",
              }}
            >
              <Hash
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "rgba(255,255,255,0.15)" }}
              />
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                No channels added yet
              </p>
            </div>
          )}
        </div>

        {/* Add channel row */}
        <div className="flex gap-2 pt-1">
          <label htmlFor="add-channel-input" className="sr-only">
            Add Telegram channel
          </label>
          <div
            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-smooth"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: "#9ca3af" }} className="text-sm select-none">
              @
            </span>
            <input
              id="add-channel-input"
              type="text"
              value={newChannel.replace(/^@/, "")}
              onChange={(e) => setNewChannel(e.target.value)}
              placeholder="channel_name"
              data-ocid="telegram-add-channel-input"
              className="flex-1 bg-transparent text-sm text-white placeholder-[#9ca3af] outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleAddChannel()}
            />
          </div>
          <button
            type="button"
            onClick={handleAddChannel}
            disabled={!newChannel.trim()}
            data-ocid="telegram-add-channel-btn"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: newChannel.trim()
                ? "rgba(255,255,255,0.92)"
                : "rgba(255,255,255,0.06)",
              color: newChannel.trim() ? "#0a0a0a" : "#9ca3af",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TelegramPage() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-[28px] font-semibold leading-tight text-white">
            Telegram
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>
            {isConnected
              ? "Manage your Telegram integration and monitored channels"
              : "Connect your Telegram account to start monitoring job channels"}
          </p>
        </motion.div>

        {/* State panels */}
        <AnimatePresence mode="wait">
          {isConnected ? (
            <ConnectedPanel
              key="connected"
              onDisconnect={() => setIsConnected(false)}
            />
          ) : (
            <NotConnectedPanel
              key="not-connected"
              onConnect={() => setIsConnected(true)}
            />
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
