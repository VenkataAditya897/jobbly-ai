import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  FileText,
  Paperclip,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";

type ContactType = "phone" | "link" | "form";

interface OtherEntry {
  id: string;
  contact: string;
  contactType: ContactType;
  messagePreview: string;
  fullMessage: string;
  attachment: string | null;
  sentAt: string;
}

const MOCK_DATA: OtherEntry[] = [
  {
    id: "oth-001",
    contact: "+1 (555) 123-4567",
    contactType: "phone",
    messagePreview:
      "Hi, I'm reaching out regarding the Senior Frontend Engineer role...",
    fullMessage:
      "Hi, I'm reaching out regarding the Senior Frontend Engineer role at your company. I have 5+ years of experience with React and TypeScript, and I'm very excited about this opportunity. Would love to schedule a brief call to discuss further. My resume is attached for your reference.",
    attachment: "resume_john_doe.pdf",
    sentAt: "2026-04-08 14:32",
  },
  {
    id: "oth-002",
    contact: "https://careers.example.com/apply/react-dev-123",
    contactType: "link",
    messagePreview:
      "Application submitted for Full Stack Developer position...",
    fullMessage:
      "Application submitted for Full Stack Developer position via company portal. Included cover letter highlighting experience with Node.js, React, and cloud infrastructure. Awaiting response from hiring team.",
    attachment: null,
    sentAt: "2026-04-08 11:15",
  },
  {
    id: "oth-003",
    contact: "Google Form",
    contactType: "form",
    messagePreview:
      "Submitted interest form for Product Engineer opening at...",
    fullMessage:
      "Submitted interest form for Product Engineer opening at TechCorp. Form included skills assessment, portfolio links, and availability. The form asked about experience with distributed systems and microservices architecture.",
    attachment: "portfolio_links.txt",
    sentAt: "2026-04-07 09:45",
  },
  {
    id: "oth-004",
    contact: "+1 (555) 987-6543",
    contactType: "phone",
    messagePreview: "Left voicemail about the Backend Engineer position...",
    fullMessage:
      "Left voicemail about the Backend Engineer position I saw on LinkedIn. Mentioned my experience with Go and distributed systems. Followed up with a text message as well containing my LinkedIn profile URL.",
    attachment: null,
    sentAt: "2026-04-07 16:20",
  },
  {
    id: "oth-005",
    contact: "https://jobs.stripe.com/apply/eng-456",
    contactType: "link",
    messagePreview:
      "Applied through Stripe's career portal for infrastructure...",
    fullMessage:
      "Applied through Stripe's career portal for infrastructure engineer role. Completed the technical questionnaire and uploaded resume. The application included a section on distributed systems design which I answered in detail.",
    attachment: "cover_letter_stripe.pdf",
    sentAt: "2026-04-06 13:00",
  },
  {
    id: "oth-006",
    contact: "Google Form",
    contactType: "form",
    messagePreview: "Completed skills survey for Startup X engineering team...",
    fullMessage:
      "Completed skills survey for Startup X engineering team. The form covered technical proficiency, team size preferences, and remote work availability. Also included a brief code challenge description in one of the responses.",
    attachment: null,
    sentAt: "2026-04-06 10:30",
  },
  {
    id: "oth-007",
    contact: "+44 (20) 7946-0958",
    contactType: "phone",
    messagePreview: "Called to inquire about the ML Engineer role listed on...",
    fullMessage:
      "Called to inquire about the ML Engineer role listed on their website. Spoke briefly with a recruiter who requested my resume via email. They mentioned the role is urgent and interviews would start next week.",
    attachment: "ml_resume_2026.pdf",
    sentAt: "2026-04-05 15:50",
  },
  {
    id: "oth-008",
    contact: "https://greenhouse.io/apply/devops-789",
    contactType: "link",
    messagePreview: "Submitted DevOps Engineer application via Greenhouse...",
    fullMessage:
      "Submitted DevOps Engineer application via Greenhouse ATS. Completed all screening questions about Kubernetes, Terraform, and CI/CD pipelines. Also attached a reference letter from previous manager.",
    attachment: "reference_letter.pdf",
    sentAt: "2026-04-05 09:15",
  },
  {
    id: "oth-009",
    contact: "Google Form",
    contactType: "form",
    messagePreview:
      "Filled early access form for AI startup hiring engineers...",
    fullMessage:
      "Filled early access form for AI startup hiring engineers with LLM experience. Described my work on fine-tuning language models and building RAG pipelines. The form also asked about compensation expectations and start date.",
    attachment: null,
    sentAt: "2026-04-04 18:05",
  },
  {
    id: "oth-010",
    contact: "+1 (555) 234-5678",
    contactType: "phone",
    messagePreview:
      "Spoke with recruiter at DataCo about analytics engineer...",
    fullMessage:
      "Spoke with recruiter at DataCo about analytics engineer role. The call lasted about 15 minutes. Discussed experience with dbt, Snowflake, and data modeling. Recruiter will forward my profile to the hiring manager.",
    attachment: null,
    sentAt: "2026-04-04 11:30",
  },
  {
    id: "oth-011",
    contact: "https://lever.co/apply/security-eng-321",
    contactType: "link",
    messagePreview: "Applied to security engineer role via Lever ATS...",
    fullMessage:
      "Applied to security engineer role via Lever ATS. Detailed experience with penetration testing, SIEM tools, and SOC 2 compliance. Attached a one-page executive summary alongside the full resume.",
    attachment: "security_summary.pdf",
    sentAt: "2026-04-03 14:45",
  },
  {
    id: "oth-012",
    contact: "+1 (555) 345-6789",
    contactType: "phone",
    messagePreview: "Called hiring manager directly about open SRE position...",
    fullMessage:
      "Called hiring manager directly about open SRE position shared by a mutual connection. Introduced myself and briefly described my on-call experience and incident response work. They asked me to send a calendar invite for a proper intro call.",
    attachment: null,
    sentAt: "2026-04-03 10:00",
  },
  {
    id: "oth-013",
    contact: "Google Form",
    contactType: "form",
    messagePreview:
      "Submitted referral intake form from a friend at FinTech Co...",
    fullMessage:
      "Submitted referral intake form from a friend at FinTech Co. The form collected my GitHub, LinkedIn, and a brief description of why I'm interested in the company. My friend will be notified once the form is reviewed.",
    attachment: null,
    sentAt: "2026-04-02 16:20",
  },
  {
    id: "oth-014",
    contact: "https://workday.com/apply/platform-eng-654",
    contactType: "link",
    messagePreview: "Completed Workday application for platform engineering...",
    fullMessage:
      "Completed Workday application for platform engineering role at enterprise software company. Process involved uploading resume, filling in work history manually, and answering two open-ended behavioral questions. Total time: ~45 minutes.",
    attachment: "resume_v3_april2026.pdf",
    sentAt: "2026-04-02 08:55",
  },
  {
    id: "oth-015",
    contact: "+1 (555) 456-7890",
    contactType: "phone",
    messagePreview:
      "Left message for HR at RemoteCo regarding open full-stack...",
    fullMessage:
      "Left message for HR at RemoteCo regarding open full-stack position. Mentioned availability for an immediate start and willingness to work across time zones. Sent a follow-up email with resume attached.",
    attachment: "resume_remotes_followup.pdf",
    sentAt: "2026-04-01 13:40",
  },
];

const PAGE_SIZE = 8;

function ContactCell({ entry }: { entry: OtherEntry }) {
  if (entry.contactType === "phone") {
    return (
      <div className="flex items-center gap-2">
        <Phone size={14} className="shrink-0" style={{ color: "#9ca3af" }} />
        <span className="font-mono text-sm" style={{ color: "#ffffff" }}>
          {entry.contact}
        </span>
      </div>
    );
  }

  if (entry.contactType === "link") {
    return (
      <a
        href={entry.contact}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 group max-w-[200px]"
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLink
          size={13}
          className="shrink-0 transition-smooth"
          style={{ color: "#9ca3af" }}
        />
        <span
          className="text-sm truncate group-hover:underline transition-smooth"
          style={{ color: "#8bdcff" }}
        >
          {entry.contact}
        </span>
      </a>
    );
  }

  // form
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        background: "rgba(139, 92, 246, 0.15)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        color: "#c4b5fd",
      }}
    >
      <FileText size={11} />
      Google Form
    </div>
  );
}

export default function OthersPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(MOCK_DATA.length / PAGE_SIZE);
  const pageData = MOCK_DATA.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <AuthLayout>
      <div className="space-y-6 fade-in-up">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "#ffffff" }}>
            Others
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>
            View all other job applications
          </p>
        </div>

        {/* Table */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Table header */}
          <div
            className="grid text-xs font-medium uppercase tracking-wider px-5 py-3"
            style={{
              gridTemplateColumns: "60px 1fr 1fr 2fr 100px 80px",
              color: "#9ca3af",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span>#</span>
            <span>Contact</span>
            <span>Preview</span>
            <span>Message</span>
            <span>Attachment</span>
            <span>Sent</span>
          </div>

          {/* Rows */}
          <div>
            {pageData.map((entry, idx) => {
              const isOpen = expanded === entry.id;
              const rowNum = (page - 1) * PAGE_SIZE + idx + 1;

              return (
                <button
                  type="button"
                  key={entry.id}
                  data-ocid={`others-row-${entry.id}`}
                  onClick={() => toggle(entry.id)}
                  className="w-full cursor-pointer transition-smooth text-left"
                  style={{
                    borderBottom:
                      idx < pageData.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    background: "none",
                  }}
                >
                  {/* Main row */}
                  <div
                    className="grid items-center px-5 py-3.5 transition-smooth"
                    style={{
                      gridTemplateColumns: "60px 1fr 1fr 2fr 100px 80px",
                      background: isOpen
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen)
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen)
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                    }}
                  >
                    {/* # */}
                    <span
                      className="text-sm font-mono"
                      style={{ color: "#6b7280" }}
                    >
                      {String(rowNum).padStart(2, "0")}
                    </span>

                    {/* Contact */}
                    <ContactCell entry={entry} />

                    {/* Preview */}
                    <span
                      className="text-sm truncate pr-4"
                      style={{ color: "#9ca3af" }}
                    >
                      {entry.messagePreview}
                    </span>

                    {/* Full message placeholder in collapsed state */}
                    <span
                      className="text-sm truncate pr-4 italic"
                      style={{ color: "#6b7280" }}
                    >
                      {isOpen ? "Click to collapse ↑" : "Click to expand ↓"}
                    </span>

                    {/* Attachment */}
                    <div>
                      {entry.attachment ? (
                        <div className="flex items-center gap-1.5">
                          <Paperclip size={13} style={{ color: "#9ca3af" }} />
                          <span
                            className="text-xs truncate max-w-[70px]"
                            style={{ color: "#9ca3af" }}
                            title={entry.attachment}
                          >
                            {entry.attachment}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: "#4b5563" }}>
                          —
                        </span>
                      )}
                    </div>

                    {/* Sent */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#6b7280" }}>
                        {entry.sentAt.split(" ")[1]}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={14} style={{ color: "#9ca3af" }} />
                      ) : (
                        <ChevronDown size={14} style={{ color: "#4b5563" }} />
                      )}
                    </div>
                  </div>

                  {/* Expanded message */}
                  {isOpen && (
                    <div
                      className="px-5 pb-5 pt-1 transition-smooth"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <div
                        className="rounded-xl p-4 text-sm leading-relaxed"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "#e5e7eb",
                        }}
                      >
                        <p
                          className="mb-2 text-xs font-medium uppercase tracking-wider"
                          style={{ color: "#9ca3af" }}
                        >
                          Full Message
                        </p>
                        {entry.fullMessage}
                      </div>
                      {entry.attachment && (
                        <div className="mt-3 flex items-center gap-2">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "#9ca3af",
                            }}
                          >
                            <Paperclip size={12} />
                            {entry.attachment}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, MOCK_DATA.length)} of {MOCK_DATA.length}{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="others-prev-page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
              }}
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  type="button"
                  key={p}
                  data-ocid={`others-page-${p}`}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg text-sm font-medium transition-smooth"
                  style={{
                    background:
                      p === page
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      p === page
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1px solid rgba(255,255,255,0.07)",
                    color: p === page ? "#ffffff" : "#6b7280",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              data-ocid="others-next-page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
              }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
