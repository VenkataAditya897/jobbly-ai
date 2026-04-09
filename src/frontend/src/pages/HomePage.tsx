import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Mail,
  MessageCircle,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Bot,
    title: "Telegram Scraping",
    desc: "Auto-discovers job opportunities from Telegram channels the moment they're posted — zero manual effort.",
    color: "rgba(139,220,255,0.15)",
    glow: "rgba(139,220,255,0.3)",
  },
  {
    icon: Mail,
    title: "Auto Email Generation",
    desc: "AI crafts personalized, tailored outreach emails for each job posting based on your profile.",
    color: "rgba(180,139,255,0.15)",
    glow: "rgba(180,139,255,0.3)",
  },
  {
    icon: Zap,
    title: "AI Job Routing",
    desc: "Smart matching routes the right jobs to the right application templates automatically.",
    color: "rgba(255,200,100,0.15)",
    glow: "rgba(255,200,100,0.3)",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Connect Telegram",
    desc: "Link your Telegram account and add the job channels you follow.",
    icon: MessageCircle,
  },
  {
    num: "2",
    title: "AI Reads Jobs",
    desc: "Our AI scans channels, extracts job postings, and scores fit against your profile.",
    icon: Bot,
  },
  {
    num: "3",
    title: "Auto Apply",
    desc: "Personalized emails are generated and sent automatically on your behalf.",
    icon: CheckCircle,
  },
];

const CHIPS = [
  { icon: MessageCircle, label: "Telegram scraped", color: "#8bdcff" },
  { icon: Mail, label: "Email sent", color: "#b48bff" },
  { icon: Briefcase, label: "Job matched", color: "#ffc864" },
  { icon: CheckCircle, label: "Application done", color: "#6bffc8" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      data-ocid="landing-nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <span
        className="glow-text text-[28px]"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        jobbly.ai
      </span>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          data-ocid="nav-login"
          className="text-sm px-5 py-2 rounded-xl border transition-all duration-200 hover:border-white/30 hover:text-white"
          style={{
            color: "#9ca3af",
            borderColor: "rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          Log in
        </Link>
        <Link
          to="/register"
          data-ocid="nav-get-started"
          className="text-sm px-5 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          Get started
        </Link>
      </div>
    </motion.header>
  );
}

// ─── Floating Chip ─────────────────────────────────────────────────────────

function FloatingChip({
  chip,
  delay,
  offsetX,
  offsetY,
}: {
  chip: (typeof CHIPS)[0];
  delay: number;
  offsetX: number;
  offsetY: number;
}) {
  const Icon = chip.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [offsetY, offsetY - 10, offsetY],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 3 + delay * 0.4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
      className="absolute flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium select-none pointer-events-none"
      style={{
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% + ${offsetY}px)`,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: chip.color,
        boxShadow: `0 0 12px ${chip.color}20`,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={13} />
      {chip.label}
    </motion.div>
  );
}

// ─── Decorative Orbs ───────────────────────────────────────────────────────

function DecorativeOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple orb — top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "-20%",
          right: "-15%",
          background:
            "radial-gradient(circle, rgba(120,80,255,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Cyan orb — left center */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* Subtle bottom glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 800,
          height: 400,
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(80,40,180,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const chipPositions = [
    { offsetX: -260, offsetY: 80 },
    { offsetX: 120, offsetY: 100 },
    { offsetX: -140, offsetY: 150 },
    { offsetX: 220, offsetY: 60 },
  ];

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <DecorativeOrbs />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(60,30,120,0.25) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glow-text mb-5"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(4.5rem, 14vw, 9.5rem)",
            lineHeight: 1,
          }}
        >
          jobbly.ai
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-6 tracking-wide"
          style={{ color: "#9ca3af", maxWidth: 480 }}
        >
          Automate your job search with AI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="flex gap-4 items-center flex-wrap justify-center mb-20"
        >
          <Link
            to="/register"
            data-ocid="hero-cta-primary"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
          >
            Get Started Free <ArrowRight size={15} />
          </Link>
          <a
            href="#features"
            data-ocid="hero-cta-secondary"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.07]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            See how it works
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Chips */}
      <div
        className="absolute z-20"
        style={{ width: "100%", height: "100%", top: 0, left: 0 }}
      >
        {CHIPS.map((chip, i) => (
          <FloatingChip
            key={chip.label}
            chip={chip}
            delay={0.5 + i * 0.12}
            offsetX={chipPositions[i].offsetX}
            offsetY={chipPositions[i].offsetY}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        style={{ color: "#9ca3af" }}
      >
        <span className="text-xs tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need
          </h2>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Three pillars that automate your entire job search pipeline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              whileHover={{ scale: 1.035, y: -4 }}
              data-ocid={`feature-card-${i}`}
              className="p-7 rounded-2xl cursor-default transition-shadow duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: color }}
              >
                <Icon size={20} style={{ color: glow }} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#9ca3af" }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="px-6 py-28 relative"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      {/* Subtle top/bottom gradient borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">How it works</h2>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            From connection to application in three simple steps.
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row gap-6 items-stretch">
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 14px)",
            }}
          />

          {STEPS.map(({ num, title, desc, icon: Icon }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center text-center p-8 rounded-2xl relative z-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              data-ocid={`step-card-${i}`}
            >
              {/* Step circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-lg font-bold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                }}
              >
                {num}
              </div>
              <Icon
                size={20}
                className="mb-3 opacity-60"
                style={{ color: "#9ca3af" }}
              />
              <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#9ca3af" }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="px-6 py-28">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative p-14 rounded-2xl text-center overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(100,60,220,0.15) 0%, transparent 70%)",
            }}
          />

          <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Start applying
            <br />
            automatically
          </h2>
          <p
            className="relative text-lg mb-10 max-w-md mx-auto"
            style={{ color: "#9ca3af" }}
          >
            Let AI handle your job search while you focus on what matters most.
          </p>
          <Link
            to="/register"
            data-ocid="cta-register"
            className="relative inline-flex items-center gap-2 px-9 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,255,255,0.25)]"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
          >
            Get Started Free <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="border-t px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <span
        className="glow-text text-xl"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        jobbly.ai
      </span>
      <p className="text-xs" style={{ color: "#9ca3af" }}>
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200 underline underline-offset-2"
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div
      style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
