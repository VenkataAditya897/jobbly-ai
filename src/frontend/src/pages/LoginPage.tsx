import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1800);
    /* auth logic unchanged */
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Decorative blur shapes */}
      <div
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo above card */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span
              className="glow-text text-4xl"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
              }}
            >
              jobbly.ai
            </span>
          </Link>
        </div>

        {/* Glass card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 0 40px rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.5)",
          }}
        >
          <div className="mb-7">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-1.5 text-sm" style={{ color: "#9ca3af" }}>
              Sign in to your account
            </p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Email
              </label>
              <input
                id="login-email"
                data-ocid="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#3f4756] outline-none transition-all duration-200"
                style={{
                  background:
                    focused === "email"
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    error && !email
                      ? "1px solid rgba(239,68,68,0.6)"
                      : focused === "email"
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    focused === "email"
                      ? "0 0 0 3px rgba(255,255,255,0.05)"
                      : "none",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  data-ocid="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-[#3f4756] outline-none transition-all duration-200"
                  style={{
                    background:
                      focused === "password"
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      error && !password
                        ? "1px solid rgba(239,68,68,0.6)"
                        : focused === "password"
                          ? "1px solid rgba(255,255,255,0.3)"
                          : "1px solid rgba(255,255,255,0.1)",
                    boxShadow:
                      focused === "password"
                        ? "0 0 0 3px rgba(255,255,255,0.05)"
                        : "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6b7280";
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                className="text-xs"
                style={{ color: "rgba(239,68,68,0.9)" }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Submit button */}
          <motion.button
            type="button"
            data-ocid="login-submit"
            className="w-full mt-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 relative overflow-hidden"
            style={{
              background: isLoading ? "rgba(255,255,255,0.85)" : "#ffffff",
              color: "#0a0a0a",
            }}
            whileHover={{ scale: isLoading ? 1 : 1.015 }}
            whileTap={{ scale: isLoading ? 1 : 0.985 }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </motion.button>

          {/* Footer link */}
          <p className="text-center mt-6 text-sm" style={{ color: "#6b7280" }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium transition-colors duration-200"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#9ca3af";
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
