import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1800);
    /* auth logic unchanged */
  };

  const inputStyle = (field: string, hasError: boolean) => ({
    background:
      focused === field ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
    border: hasError
      ? "1px solid rgba(239,68,68,0.6)"
      : focused === field
        ? "1px solid rgba(255,255,255,0.3)"
        : "1px solid rgba(255,255,255,0.1)",
    boxShadow: focused === field ? "0 0 0 3px rgba(255,255,255,0.05)" : "none",
  });

  const baseInputClass =
    "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#3f4756] outline-none transition-all duration-200";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Decorative blur shapes */}
      <div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.11) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          filter: "blur(50px)",
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
            <h1 className="text-2xl font-semibold text-white">
              Create account
            </h1>
            <p className="mt-1.5 text-sm" style={{ color: "#9ca3af" }}>
              Start automating your job search
            </p>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Full name
              </label>
              <input
                id="register-name"
                data-ocid="register-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Alex Johnson"
                className={baseInputClass}
                style={inputStyle("name", !!(error && !name))}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Email
              </label>
              <input
                id="register-email"
                data-ocid="register-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className={baseInputClass}
                style={inputStyle("email", !!(error && !email))}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-medium mb-2 uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  data-ocid="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className={`${baseInputClass} pr-11`}
                  style={inputStyle("password", !!(error && !password))}
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
            data-ocid="register-submit"
            className="w-full mt-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
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
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </motion.button>

          {/* Footer link */}
          <p className="text-center mt-6 text-sm" style={{ color: "#6b7280" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium transition-colors duration-200"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#9ca3af";
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
