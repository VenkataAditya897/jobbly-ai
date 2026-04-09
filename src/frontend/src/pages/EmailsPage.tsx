import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Paperclip,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";

interface EmailRecord {
  id: string;
  receiverEmail: string;
  messagePreview: string;
  generatedEmail: string;
  attachment: string | null;
}

const MOCK_EMAILS: EmailRecord[] = [
  {
    id: "EMAIL-001",
    receiverEmail: "hr@techcorp.com",
    messagePreview: "Applying for Senior Frontend Engineer position...",
    generatedEmail:
      "Dear Hiring Team at TechCorp,\n\nI am writing to express my strong interest in the Senior Frontend Engineer position. With 5+ years of experience building scalable React applications, I believe I would be a great fit for your team.\n\nMy expertise includes React, TypeScript, Node.js, and cloud infrastructure. I have led frontend teams at two startups and delivered products used by hundreds of thousands of users.\n\nI would love to discuss how my skills align with your needs.\n\nBest regards,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-002",
    receiverEmail: "careers@startupxyz.io",
    messagePreview: "Reaching out about the Full Stack Developer role...",
    generatedEmail:
      "Hello StartupXYZ Team,\n\nI came across your Full Stack Developer listing and I'm excited about the opportunity. Your mission to democratize AI resonates deeply with me.\n\nI bring experience across the entire stack — from React and Vue on the frontend to Node.js, Python, and PostgreSQL on the backend. I thrive in fast-moving startup environments.\n\nLooking forward to connecting!\n\nWarm regards,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-003",
    receiverEmail: "talent@globalfintech.com",
    messagePreview:
      "Interest in the React Developer opening at GlobalFinTech...",
    generatedEmail:
      "Dear Talent Team,\n\nI am reaching out regarding the React Developer position posted on your website. FinTech is a domain I am deeply passionate about, having previously worked on payment processing platforms.\n\nMy experience with React, Redux, and real-time data dashboards aligns well with your requirements.\n\nThank you for your consideration.\n\nBest,\nAlex Johnson",
    attachment: null,
  },
  {
    id: "EMAIL-004",
    receiverEmail: "jobs@designagency.co",
    messagePreview: "Application for UI/UX Engineer role — portfolio attached",
    generatedEmail:
      "Hi Design Agency Team,\n\nYour job posting for a UI/UX Engineer caught my eye immediately. I have spent the last three years bridging design and engineering, working closely with Figma, design systems, and component libraries.\n\nI specialize in creating pixel-perfect implementations from design files and building reusable component systems with Tailwind and Storybook.\n\nCheers,\nAlex Johnson",
    attachment: "portfolio.pdf",
  },
  {
    id: "EMAIL-005",
    receiverEmail: "hr@cloudbase.dev",
    messagePreview: "Application for DevOps & Frontend hybrid engineer...",
    generatedEmail:
      "Hello CloudBase Team,\n\nI am excited to apply for your hybrid DevOps/Frontend engineer role. My background spans CI/CD pipelines with GitHub Actions, Docker deployments, and building the frontend dashboards that monitor those systems.\n\nI enjoy owning the full delivery pipeline, from code to production.\n\nBest,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-006",
    receiverEmail: "recruiter@medtech.org",
    messagePreview: "Applying for the Software Engineer position in MedTech...",
    generatedEmail:
      "Dear MedTech Recruiting Team,\n\nHealthcare technology is an area I am deeply committed to. I have experience building HIPAA-compliant web applications and working with HL7/FHIR data standards.\n\nThe Software Engineer role at MedTech aligns perfectly with my background in data visualization and patient-facing portals.\n\nRespectfully,\nAlex Johnson",
    attachment: null,
  },
  {
    id: "EMAIL-007",
    receiverEmail: "hiring@edtech.io",
    messagePreview:
      "Senior Engineer application — e-learning platform expertise",
    generatedEmail:
      "Hi EdTech Team,\n\nEducation technology is one of my favorite domains — I have built interactive learning modules, video streaming platforms, and quiz engines used by students globally.\n\nYour Senior Engineer role looks like an excellent match for my skills in React, WebRTC, and real-time collaborative features.\n\nEager to chat!\n\nBest,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-008",
    receiverEmail: "people@saasplatform.com",
    messagePreview:
      "Applying for the Frontend Architect position you posted...",
    generatedEmail:
      "Hello SaaS Platform People Team,\n\nArchitecting scalable frontend systems is my passion. I have designed micro-frontend architectures, module federation setups, and shared component libraries used across multiple product teams.\n\nYour Frontend Architect role is exactly the kind of challenge I am looking for in my next step.\n\nSincerely,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-009",
    receiverEmail: "hr@gamestudio.gg",
    messagePreview: "Application for Web Engineer at Game Studio...",
    generatedEmail:
      "Hey Game Studio Team,\n\nBuilding for gaming audiences is a unique and exciting challenge. I have worked on web-based game dashboards, leaderboards, and WebSocket-driven real-time features.\n\nYour Web Engineer role sounds like a great opportunity — I would love to bring my frontend expertise to a gaming context.\n\nAlex Johnson",
    attachment: null,
  },
  {
    id: "EMAIL-010",
    receiverEmail: "careers@blockchain.co",
    messagePreview: "Interest in the Web3 Frontend Developer opportunity...",
    generatedEmail:
      "Dear Blockchain Co Team,\n\nI have been building in the Web3 space for over two years — integrating wallets like MetaMask, working with ethers.js and wagmi, and creating DeFi dashboards.\n\nYour Web3 Frontend Developer role is a natural next step for my career trajectory.\n\nBest,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-011",
    receiverEmail: "talent@airesearch.lab",
    messagePreview: "Application for UI Engineer at AI Research Lab...",
    generatedEmail:
      "Hello AI Research Lab Team,\n\nApplying AI capabilities to user interfaces is my current obsession. I have built AI-powered features including semantic search, auto-complete, and generative content editors.\n\nThe UI Engineer role at your lab would let me work at the cutting edge of both AI and product design.\n\nAlex Johnson",
    attachment: null,
  },
  {
    id: "EMAIL-012",
    receiverEmail: "jobs@traveltech.com",
    messagePreview: "Applying for Full Stack Engineer at TravelTech...",
    generatedEmail:
      "Hi TravelTech Hiring Team,\n\nI have traveled to 30 countries and building great travel technology is something close to my heart. I have worked on booking engines, mapping integrations with Mapbox, and multi-currency payment flows.\n\nYour Full Stack Engineer role would let me combine my passion for travel with my technical expertise.\n\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-013",
    receiverEmail: "hr@retailos.com",
    messagePreview: "Senior Frontend role — e-commerce background relevant...",
    generatedEmail:
      "Dear RetailOS HR Team,\n\nI have extensive experience building e-commerce platforms — from product catalog UIs and shopping carts to checkout flows and order tracking dashboards.\n\nPerformance optimization is a specialty of mine: I have taken Lighthouse scores from 40 to 95 on high-traffic e-commerce sites.\n\nBest,\nAlex Johnson",
    attachment: null,
  },
  {
    id: "EMAIL-014",
    receiverEmail: "careers@legaltech.io",
    messagePreview: "Application for Product Engineer — LegalTech domain...",
    generatedEmail:
      "Hello LegalTech Team,\n\nLegal technology presents fascinating UX challenges — complex data structures, document workflows, and compliance requirements. I have worked on contract management platforms and legal document editors.\n\nYour Product Engineer role seems like an excellent fit for my combination of technical and domain expertise.\n\nKind regards,\nAlex Johnson",
    attachment: "resume.pdf",
  },
  {
    id: "EMAIL-015",
    receiverEmail: "people@logistics.co",
    messagePreview: "Applying for the Frontend Lead at Logistics Platform...",
    generatedEmail:
      "Hi Logistics Platform Team,\n\nSupply chain and logistics visualization is an area where frontend engineering truly shines — real-time maps, route optimization UIs, and warehouse dashboards.\n\nI have built several data-heavy dashboards for logistics clients, combining React, D3.js, and WebSocket data streams.\n\nBest regards,\nAlex Johnson",
    attachment: null,
  },
];

const PAGE_SIZE = 8;

export default function EmailsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_EMAILS.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageEmails = MOCK_EMAILS.slice(startIdx, startIdx + PAGE_SIZE);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedId(null);
  };

  return (
    <AuthLayout>
      <div className="space-y-6 fade-in-up">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Emails
          </h1>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            View all sent emails and their status
          </p>
        </div>

        {/* Table Container */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-[140px_1fr_1fr_1fr_160px_44px] px-6 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            {(
              [
                "Email ID",
                "Receiver",
                "Preview",
                "Generated Email",
                "Attachment",
                "",
              ] as const
            ).map((col) => (
              <span
                key={col || "expand"}
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#9ca3af" }}
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {pageEmails.map((email) => {
              const isExpanded = expandedId === email.id;
              const rowId = email.id.toLowerCase();
              return (
                <div key={email.id} data-ocid={`email-row-${rowId}`}>
                  {/* Main Row */}
                  <button
                    type="button"
                    className="grid grid-cols-[140px_1fr_1fr_1fr_160px_44px] items-center px-6 py-4 cursor-pointer transition-smooth"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    onClick={() => toggleExpand(email.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        toggleExpand(email.id);
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    {/* Email ID */}
                    <span
                      className="text-xs"
                      style={{
                        color: "#9ca3af",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {email.id}
                    </span>

                    {/* Receiver */}
                    <span className="text-sm text-white truncate pr-4">
                      {email.receiverEmail}
                    </span>

                    {/* Preview */}
                    <span
                      className="text-sm truncate pr-4"
                      style={{ color: "#9ca3af" }}
                    >
                      {email.messagePreview}
                    </span>

                    {/* Generated Email preview */}
                    <span
                      className="text-sm truncate pr-4"
                      style={{ color: "#9ca3af" }}
                    >
                      {email.generatedEmail.split("\n")[0]}
                    </span>

                    {/* Attachment */}
                    <div>
                      {email.attachment ? (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                          }}
                        >
                          <Paperclip
                            className="w-3 h-3"
                            style={{ color: "#9ca3af" }}
                          />
                          {email.attachment}
                        </span>
                      ) : (
                        <span style={{ color: "#9ca3af" }}>—</span>
                      )}
                    </div>

                    {/* Expand toggle */}
                    <div className="flex justify-end">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isExpanded ? (
                          <ChevronUp
                            className="w-4 h-4"
                            style={{ color: "#9ca3af" }}
                          />
                        ) : (
                          <ChevronDown
                            className="w-4 h-4"
                            style={{ color: "#9ca3af" }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Row */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="mx-6 mb-4 rounded-xl p-5 space-y-3"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <p
                              className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: "#9ca3af" }}
                            >
                              Full Email Body
                            </p>
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                color: "#9ca3af",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {email.id}
                            </span>
                          </div>
                          <p
                            className="text-sm leading-relaxed whitespace-pre-line"
                            style={{ color: "rgba(255,255,255,0.82)" }}
                          >
                            {email.generatedEmail}
                          </p>
                          {email.attachment && (
                            <div
                              className="flex items-center gap-2 pt-2"
                              style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <Paperclip
                                className="w-3.5 h-3.5"
                                style={{ color: "#9ca3af" }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "#9ca3af" }}
                              >
                                Attachment:
                              </span>
                              <span className="text-xs text-white">
                                {email.attachment}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              Showing{" "}
              <span className="text-white font-medium">
                {startIdx + 1}–
                {Math.min(startIdx + PAGE_SIZE, MOCK_EMAILS.length)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {MOCK_EMAILS.length}
              </span>{" "}
              emails
            </p>

            <div className="flex items-center gap-1.5">
              {/* Previous */}
              <button
                type="button"
                data-ocid="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color:
                    currentPage === 1 ? "rgba(255,255,255,0.3)" : "#ffffff",
                  opacity: currentPage === 1 ? 0.4 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    data-ocid={`pagination-page-${String(page)}`}
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-smooth"
                    style={
                      page === currentPage
                        ? { background: "#ffffff", color: "#0a0a0a" }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#9ca3af",
                          }
                    }
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next */}
              <button
                type="button"
                data-ocid="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color:
                    currentPage === totalPages
                      ? "rgba(255,255,255,0.3)"
                      : "#ffffff",
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
