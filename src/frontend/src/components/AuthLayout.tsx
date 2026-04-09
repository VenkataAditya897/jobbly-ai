import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "#0a0a0a" }}>
      <Sidebar />
      <main
        className="flex-1 min-h-screen p-6"
        style={{ marginLeft: 240, background: "#0a0a0a" }}
      >
        {children}
      </main>
    </div>
  );
}
