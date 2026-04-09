import {
  Check,
  ChevronRight,
  Paperclip,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { AuthLayout } from "../components/AuthLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

// ─── Glass Input ──────────────────────────────────────────────────────────────

let inputCounter = 0;

function GlassInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const [inputId] = useState(() => `glass-input-${++inputCounter}`);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium"
        style={{ color: "#9ca3af" }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-smooth placeholder:text-white/20 focus:ring-1 focus:ring-white/20"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-base font-semibold text-white tracking-wide">
        {title}
      </h2>
      {action}
    </div>
  );
}

// ─── Profile Completeness ─────────────────────────────────────────────────────

function CompletenessBar({ pct }: { pct: number }) {
  const sections = [
    "Personal Info",
    "Skills",
    "Experience",
    "Projects",
    "Resume",
  ];

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">
          Profile Completeness
        </span>
        <span
          className="text-sm font-semibold tabular-nums"
          style={{
            background: "linear-gradient(90deg,#4ade80,#22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#4ade80,#22d3ee)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <div className="flex gap-3 mt-3 flex-wrap">
        {sections.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#9ca3af" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  pct >= (i + 1) * 20 ? "#4ade80" : "rgba(255,255,255,0.15)",
              }}
            />
            {s}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Personal Info Section ────────────────────────────────────────────────────

function PersonalInfoSection({
  info,
  setInfo,
}: {
  info: PersonalInfo;
  setInfo: (v: PersonalInfo) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(info);

  const fields: { key: keyof PersonalInfo; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
  ];

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <SectionHeader
        title="Personal Info"
        action={
          !editing ? (
            <button
              type="button"
              data-ocid="personal-edit-btn"
              onClick={() => {
                setDraft(info);
                setEditing(true);
              }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
              }}
            >
              <Pencil size={12} />
              Edit
            </button>
          ) : null
        }
      />

      <AnimatePresence mode="wait">
        {!editing ? (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {fields.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3 py-1">
                <span
                  className="w-20 shrink-0 text-xs"
                  style={{ color: "#9ca3af" }}
                >
                  {label}
                </span>
                <ChevronRight size={12} style={{ color: "#9ca3af" }} />
                <span className="text-sm text-white">{info[key]}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fields.map(({ key, label }) => (
                <GlassInput
                  key={key}
                  label={label}
                  value={draft[key]}
                  onChange={(v) => setDraft({ ...draft, [key]: v })}
                />
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                data-ocid="personal-save-btn"
                onClick={() => {
                  setInfo(draft);
                  setEditing(false);
                }}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-medium transition-smooth hover:scale-105"
                style={{ background: "#ffffff", color: "#0a0a0a" }}
              >
                <Check size={14} />
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-sm px-4 py-2 rounded-xl font-medium transition-smooth hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ca3af",
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection({
  skills,
  setSkills,
}: {
  skills: string[];
  setSkills: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setInput("");
  };

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <SectionHeader title="Skills" />
      {skills.length === 0 ? (
        <p className="text-sm" style={{ color: "#9ca3af" }}>
          No skills added yet
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <motion.span
              key={skill}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full transition-smooth"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#ffffff",
              }}
            >
              {skill}
              <button
                type="button"
                data-ocid={`skill-delete-${skill}`}
                onClick={() => setSkills(skills.filter((s) => s !== skill))}
                className="ml-0.5 hover:text-red-400 transition-colors"
                style={{ color: "#9ca3af" }}
                aria-label={`Remove ${skill}`}
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          placeholder="Add a skill..."
          data-ocid="skill-input"
          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-smooth placeholder:text-white/20 focus:ring-1 focus:ring-white/20"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
        <button
          type="button"
          data-ocid="skill-add-btn"
          onClick={addSkill}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth hover:scale-105"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          <Plus size={14} />
          Add Skill
        </button>
      </div>
    </motion.div>
  );
}

// ─── Shared Entry Card ────────────────────────────────────────────────────────

interface EntryCardProps {
  id: string;
  primaryLabel: string;
  secondaryLabel: string;
  tertiaryLabel: string;
  onEdit: () => void;
  onDelete: () => void;
  confirmDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

function EntryCard({
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  onEdit,
  onDelete,
  confirmDelete,
  onConfirmDelete,
  onCancelDelete,
}: EntryCardProps) {
  return (
    <div
      className="rounded-xl p-4 transition-smooth"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {primaryLabel}
          </p>
          <p className="text-sm italic mt-0.5" style={{ color: "#d1d5db" }}>
            {secondaryLabel}
          </p>
          <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
            {tertiaryLabel}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 rounded-lg transition-smooth hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
            aria-label="Edit"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg transition-smooth hover:scale-110"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
            }}
            aria-label="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 pt-3 flex items-center gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-xs flex-1" style={{ color: "#f87171" }}>
                Are you sure? This cannot be undone.
              </span>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-smooth hover:scale-105"
                style={{ background: "#ef4444", color: "#fff" }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={onCancelDelete}
                className="text-xs px-3 py-1.5 rounded-lg transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ca3af",
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inline Form ──────────────────────────────────────────────────────────────

function InlineForm({
  children,
  onSave,
  onCancel,
  saveDisabled,
  saveOcid,
}: {
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
  saveDisabled?: boolean;
  saveOcid?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div
        className="rounded-xl p-4 space-y-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {children}
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid={saveOcid}
            onClick={onSave}
            disabled={saveDisabled}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-medium transition-smooth hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
          >
            <Check size={14} />
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm px-4 py-2 rounded-xl font-medium transition-smooth"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection({
  experiences,
  setExperiences,
}: {
  experiences: Experience[];
  setExperiences: (v: Experience[]) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<Experience, "id">>({
    company: "",
    role: "",
    duration: "",
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const startAdd = () => {
    setDraft({ company: "", role: "", duration: "" });
    setAdding(true);
    setEditing(null);
  };

  const startEdit = (exp: Experience) => {
    setDraft({ company: exp.company, role: exp.role, duration: exp.duration });
    setEditing(exp.id);
    setAdding(false);
  };

  const save = () => {
    if (!draft.company.trim()) return;
    if (adding) {
      setExperiences([...experiences, { id: crypto.randomUUID(), ...draft }]);
      setAdding(false);
    } else if (editing) {
      setExperiences(
        experiences.map((e) => (e.id === editing ? { ...e, ...draft } : e)),
      );
      setEditing(null);
    }
  };

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <SectionHeader
        title="Experience"
        action={
          <button
            type="button"
            data-ocid="experience-add-btn"
            onClick={startAdd}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            <Plus size={12} />
            Add Experience
          </button>
        }
      />
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id}>
            {editing === exp.id ? (
              <AnimatePresence>
                <InlineForm
                  key="edit-exp"
                  onSave={save}
                  onCancel={() => setEditing(null)}
                  saveDisabled={!draft.company.trim()}
                  saveOcid="experience-save-btn"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <GlassInput
                      label="Company"
                      value={draft.company}
                      onChange={(v) => setDraft({ ...draft, company: v })}
                      placeholder="e.g. Google"
                    />
                    <GlassInput
                      label="Role"
                      value={draft.role}
                      onChange={(v) => setDraft({ ...draft, role: v })}
                      placeholder="e.g. Software Engineer"
                    />
                    <GlassInput
                      label="Duration"
                      value={draft.duration}
                      onChange={(v) => setDraft({ ...draft, duration: v })}
                      placeholder="e.g. Jan 2022 – Present"
                    />
                  </div>
                </InlineForm>
              </AnimatePresence>
            ) : (
              <EntryCard
                id={exp.id}
                primaryLabel={exp.company}
                secondaryLabel={exp.role}
                tertiaryLabel={exp.duration}
                onEdit={() => startEdit(exp)}
                onDelete={() =>
                  setConfirmDelete(confirmDelete === exp.id ? null : exp.id)
                }
                confirmDelete={confirmDelete === exp.id}
                onConfirmDelete={() => {
                  setExperiences(experiences.filter((e) => e.id !== exp.id));
                  setConfirmDelete(null);
                }}
                onCancelDelete={() => setConfirmDelete(null)}
              />
            )}
          </div>
        ))}
        <AnimatePresence>
          {adding && (
            <InlineForm
              key="add-exp"
              onSave={save}
              onCancel={() => setAdding(false)}
              saveDisabled={!draft.company.trim()}
              saveOcid="experience-save-btn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <GlassInput
                  label="Company"
                  value={draft.company}
                  onChange={(v) => setDraft({ ...draft, company: v })}
                  placeholder="e.g. Google"
                />
                <GlassInput
                  label="Role"
                  value={draft.role}
                  onChange={(v) => setDraft({ ...draft, role: v })}
                  placeholder="e.g. Software Engineer"
                />
                <GlassInput
                  label="Duration"
                  value={draft.duration}
                  onChange={(v) => setDraft({ ...draft, duration: v })}
                  placeholder="e.g. Jan 2022 – Present"
                />
              </div>
            </InlineForm>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: (v: Project[]) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    link: "",
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const startAdd = () => {
    setDraft({ title: "", description: "", link: "" });
    setAdding(true);
    setEditing(null);
  };

  const startEdit = (p: Project) => {
    setDraft({ title: p.title, description: p.description, link: p.link });
    setEditing(p.id);
    setAdding(false);
  };

  const save = () => {
    if (!draft.title.trim()) return;
    if (adding) {
      setProjects([...projects, { id: crypto.randomUUID(), ...draft }]);
      setAdding(false);
    } else if (editing) {
      setProjects(
        projects.map((p) => (p.id === editing ? { ...p, ...draft } : p)),
      );
      setEditing(null);
    }
  };

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <SectionHeader
        title="Projects"
        action={
          <button
            type="button"
            data-ocid="project-add-btn"
            onClick={startAdd}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-smooth hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            <Plus size={12} />
            Add Project
          </button>
        }
      />
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id}>
            {editing === p.id ? (
              <AnimatePresence>
                <InlineForm
                  key="edit-proj"
                  onSave={save}
                  onCancel={() => setEditing(null)}
                  saveDisabled={!draft.title.trim()}
                  saveOcid="project-save-btn"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <GlassInput
                      label="Project Title"
                      value={draft.title}
                      onChange={(v) => setDraft({ ...draft, title: v })}
                      placeholder="e.g. JobTracker Pro"
                    />
                    <GlassInput
                      label="Link"
                      value={draft.link}
                      onChange={(v) => setDraft({ ...draft, link: v })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <GlassInput
                    label="Description"
                    value={draft.description}
                    onChange={(v) => setDraft({ ...draft, description: v })}
                    placeholder="Brief description..."
                  />
                </InlineForm>
              </AnimatePresence>
            ) : (
              <EntryCard
                id={p.id}
                primaryLabel={p.title}
                secondaryLabel={p.description}
                tertiaryLabel={p.link}
                onEdit={() => startEdit(p)}
                onDelete={() =>
                  setConfirmDelete(confirmDelete === p.id ? null : p.id)
                }
                confirmDelete={confirmDelete === p.id}
                onConfirmDelete={() => {
                  setProjects(projects.filter((proj) => proj.id !== p.id));
                  setConfirmDelete(null);
                }}
                onCancelDelete={() => setConfirmDelete(null)}
              />
            )}
          </div>
        ))}
        <AnimatePresence>
          {adding && (
            <InlineForm
              key="add-proj"
              onSave={save}
              onCancel={() => setAdding(false)}
              saveDisabled={!draft.title.trim()}
              saveOcid="project-save-btn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <GlassInput
                  label="Project Title"
                  value={draft.title}
                  onChange={(v) => setDraft({ ...draft, title: v })}
                  placeholder="e.g. JobTracker Pro"
                />
                <GlassInput
                  label="Link"
                  value={draft.link}
                  onChange={(v) => setDraft({ ...draft, link: v })}
                  placeholder="https://github.com/..."
                />
              </div>
              <GlassInput
                label="Description"
                value={draft.description}
                onChange={(v) => setDraft({ ...draft, description: v })}
                placeholder="Brief description..."
              />
            </InlineForm>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Resume Section ───────────────────────────────────────────────────────────

function ResumeSection() {
  const [fileName, setFileName] = useState<string | null>("resume.pdf");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (file) setFileName(file.name);
  };

  return (
    <motion.div
      className="glass p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <SectionHeader title="Resume" />
      {fileName && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 transition-smooth"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Paperclip size={15} style={{ color: "#9ca3af" }} />
          <span className="flex-1 text-sm text-white truncate">{fileName}</span>
          <button
            type="button"
            data-ocid="resume-remove-btn"
            onClick={() => setFileName(null)}
            className="text-xs transition-smooth hover:text-red-400"
            style={{ color: "#9ca3af" }}
          >
            Remove
          </button>
        </div>
      )}

      <div
        data-ocid="resume-drop-zone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl transition-smooth"
        style={{
          border: `1.5px dashed ${
            dragging ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"
          }`,
          background: dragging
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.02)",
        }}
      >
        <Upload size={22} style={{ color: "#9ca3af" }} />
        <div className="text-center">
          <p className="text-sm text-white">Drop PDF here or click to upload</p>
          <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
            PDF format supported · Max 10MB
          </p>
        </div>
        <button
          type="button"
          data-ocid="resume-upload-btn"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-medium transition-smooth hover:scale-105"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          <Upload size={14} />
          Upload New Resume
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const INITIAL_PERSONAL: PersonalInfo = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 555 0100",
  location: "San Francisco, CA",
};

const INITIAL_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
];

const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    duration: "Mar 2022 – Present",
  },
  {
    id: "exp-2",
    company: "Airbnb",
    role: "Frontend Engineer",
    duration: "Jan 2020 – Feb 2022",
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "JobTracker Pro",
    description: "AI-powered job application tracker with analytics dashboard.",
    link: "https://github.com/johndoe/jobtracker",
  },
  {
    id: "proj-2",
    title: "AutoApply Bot",
    description: "Automated job application bot using Telegram + GPT-4.",
    link: "https://github.com/johndoe/autoapply",
  },
];

export default function ProfilePage() {
  const [personal, setPersonal] = useState<PersonalInfo>(INITIAL_PERSONAL);
  const [skills, setSkills] = useState<string[]>(INITIAL_SKILLS);
  const [experiences, setExperiences] =
    useState<Experience[]>(INITIAL_EXPERIENCES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const hasPersonal = !!(
    personal.name ||
    personal.email ||
    personal.phone ||
    personal.location
  );
  const hasSkills = skills.length > 0;
  const hasExperiences = experiences.length > 0;
  const hasProjects = projects.length > 0;
  const hasResume = true;

  const completePct =
    [hasPersonal, hasSkills, hasExperiences, hasProjects, hasResume].filter(
      Boolean,
    ).length * 20;

  return (
    <AuthLayout>
      <div className="max-w-3xl mx-auto space-y-5 pb-12">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Profile
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
            Manage your personal info, skills, and resume.
          </p>
        </div>

        <CompletenessBar pct={completePct} />
        <PersonalInfoSection info={personal} setInfo={setPersonal} />
        <SkillsSection skills={skills} setSkills={setSkills} />
        <ExperienceSection
          experiences={experiences}
          setExperiences={setExperiences}
        />
        <ProjectsSection projects={projects} setProjects={setProjects} />
        <ResumeSection />
      </div>
    </AuthLayout>
  );
}
