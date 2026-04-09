import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Link2, LogOut, Mail, Send, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/emails", label: "Emails", icon: Mail },
  { to: "/others", label: "Others", icon: Link2 },
  { to: "/telegram", label: "Telegram", icon: Send },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function Sidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      data-ocid="sidebar-nav"
      style={{
        width: 240,
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
      className="fixed left-0 top-0 h-screen flex flex-col backdrop-blur-xl z-40"
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <Link to="/" className="block">
          <span
            className="glow-text text-2xl font-bold select-none"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            jobbly.ai
          </span>
        </Link>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          margin: "0 16px",
        }}
      />

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            currentPath === to || currentPath.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={`sidebar-link-${label.toLowerCase()}`}
              style={{
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                borderLeft: isActive
                  ? "2px solid rgba(255,255,255,0.6)"
                  : "2px solid transparent",
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group hover:bg-white/5"
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "text-white"
                    : "text-[#9ca3af] group-hover:text-white transition-colors duration-200"
                }
              />
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? "text-white"
                    : "text-[#9ca3af] group-hover:text-white transition-colors duration-200"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          margin: "0 16px",
        }}
      />

      {/* User Section */}
      <div className="px-3 py-4 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
        >
          U
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">User</p>
          <p className="text-xs text-[#9ca3af] truncate">user@jobbly.ai</p>
        </div>
        <button
          type="button"
          aria-label="Logout"
          data-ocid="sidebar-logout"
          onClick={() => console.log("logout")}
          className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
