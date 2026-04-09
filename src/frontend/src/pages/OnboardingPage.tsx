import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderOpen,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Basic Info", icon: Sparkles, optional: false },
  { id: 2, label: "Skills", icon: Sparkles, optional: false },
  { id: 3, label: "Experience", icon: Briefcase, optional: true },
  { id: 4, label: "Projects", icon: FolderOpen, optional: true },
  { id: 5, label: "Resume", icon: FileText, optional: true },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:ring-1 focus:ring-white/25 focus:border-white/25";
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

// ─── Slide variants ───────────────────────────────────────────────────────────

const makeVariants = (dir: 1 | -1) => ({
  initial: { opacity: 0, x: dir * 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: dir * -40,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function GlassInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${inputCls} ${props.className ?? ""}`}
      style={{ ...inputStyle, ...props.style }}
    />
  );
}

function GlassTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 3}
      className={`${inputCls} resize-none ${props.className ?? ""}`}
      style={{ ...inputStyle, ...props.style }}
    />
  );
}

function Label({
  children,
  htmlFor,
}: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium mb-1.5"
      style={{ color: "#9ca3af" }}
    >
      {children}
    </label>
  );
}

function AddButton({
  onClick,
  children,
}: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:border-white/25 hover:bg-white/10"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px dashed rgba(255,255,255,0.15)",
        color: "#9ca3af",
      }}
    >
      <Plus size={14} /> {children}
    </button>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function StepBasicInfo({
  name,
  phone,
  location,
  setName,
  setPhone,
  setLocation,
}: {
  name: string;
  phone: string;
  location: string;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  setLocation: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ob-name">Full Name *</Label>
        <GlassInput
          id="ob-name"
          data-ocid="onboard-name"
          placeholder="Alex Johnson"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="ob-phone">Phone Number *</Label>
        <GlassInput
          id="ob-phone"
          data-ocid="onboard-phone"
          placeholder="+1 555 000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="ob-location">Location *</Label>
        <GlassInput
          id="ob-location"
          data-ocid="onboard-location"
          placeholder="San Francisco, CA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function StepSkills({
  skills,
  skillInput,
  setSkillInput,
  onAdd,
  onRemove,
}: {
  skills: string[];
  skillInput: string;
  setSkillInput: (v: string) => void;
  onAdd: () => void;
  onRemove: (s: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ob-skill">Add a skill</Label>
        <div className="flex gap-2">
          <GlassInput
            id="ob-skill"
            data-ocid="onboard-skill-input"
            placeholder="e.g. React, Python, TypeScript"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={onAdd}
            className="flex-shrink-0 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/15 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#ffffff",
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(skill)}
                aria-label={`Remove ${skill}`}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={11} />
              </button>
            </motion.span>
          ))}
        </div>
      ) : (
        <p
          className="text-sm text-center py-6"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Add at least one skill to continue
        </p>
      )}
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  onEdit,
  onDelete,
}: { exp: Experience; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl p-4 flex items-start justify-between gap-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="min-w-0">
        <p className="font-semibold text-white text-sm truncate">
          {exp.company || "Company"}
        </p>
        <p
          className="text-sm italic mt-0.5 truncate"
          style={{ color: "#9ca3af" }}
        >
          {exp.role || "Role"}
        </p>
        {exp.duration && (
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {exp.duration}
          </p>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 rounded-lg transition-all hover:bg-white/10"
          aria-label="Edit experience"
        >
          <Pencil size={13} style={{ color: "#9ca3af" }} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg transition-all hover:bg-red-500/20"
          aria-label="Delete experience"
        >
          <Trash2 size={13} style={{ color: "#9ca3af" }} />
        </button>
      </div>
    </motion.div>
  );
}

function ExperienceForm({
  exp,
  onChange,
  onSave,
  onCancel,
}: {
  exp: Experience;
  onChange: (field: keyof Experience, val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const uid = exp.id.slice(0, 8);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl p-4 space-y-3"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div>
        <Label htmlFor={`exp-company-${uid}`}>Company *</Label>
        <GlassInput
          id={`exp-company-${uid}`}
          placeholder="Acme Corp"
          value={exp.company}
          onChange={(e) => onChange("company", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`exp-role-${uid}`}>Role / Title *</Label>
        <GlassInput
          id={`exp-role-${uid}`}
          placeholder="Frontend Engineer"
          value={exp.role}
          onChange={(e) => onChange("role", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`exp-duration-${uid}`}>Duration</Label>
        <GlassInput
          id={`exp-duration-${uid}`}
          placeholder="Jan 2022 – Dec 2023"
          value={exp.duration}
          onChange={(e) => onChange("duration", e.target.value)}
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl text-sm transition-all hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#9ca3af",
          }}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

function StepExperience({
  experiences,
  setExperiences,
}: { experiences: Experience[]; setExperiences: (v: Experience[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Experience | null>(null);

  const openNew = () => {
    const fresh: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      duration: "",
    };
    setDraft(fresh);
    setEditingId("__new__");
  };

  const openEdit = (exp: Experience) => {
    setDraft({ ...exp });
    setEditingId(exp.id);
  };

  const save = () => {
    if (!draft) return;
    if (editingId === "__new__") {
      setExperiences([...experiences, draft]);
    } else {
      setExperiences(experiences.map((e) => (e.id === draft.id ? draft : e)));
    }
    setEditingId(null);
    setDraft(null);
  };

  const cancel = () => {
    setEditingId(null);
    setDraft(null);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {experiences.map((exp) =>
          editingId === exp.id && draft ? (
            <ExperienceForm
              key={exp.id}
              exp={draft}
              onChange={(f, v) => setDraft({ ...draft, [f]: v })}
              onSave={save}
              onCancel={cancel}
            />
          ) : (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              onEdit={() => openEdit(exp)}
              onDelete={() =>
                setExperiences(experiences.filter((e) => e.id !== exp.id))
              }
            />
          ),
        )}
      </AnimatePresence>
      {editingId === "__new__" && draft ? (
        <ExperienceForm
          exp={draft}
          onChange={(f, v) => setDraft({ ...draft, [f]: v })}
          onSave={save}
          onCancel={cancel}
        />
      ) : (
        <AddButton onClick={openNew} data-ocid="onboard-add-experience">
          Add Experience
        </AddButton>
      )}
    </div>
  );
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function ProjectCard({
  proj,
  onEdit,
  onDelete,
}: { proj: Project; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl p-4 flex items-start justify-between gap-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="min-w-0">
        <p className="font-semibold text-white text-sm truncate">
          {proj.title || "Project"}
        </p>
        {proj.description && (
          <p
            className="text-xs mt-0.5 line-clamp-2"
            style={{ color: "#9ca3af" }}
          >
            {proj.description}
          </p>
        )}
        {proj.link && (
          <p
            className="text-xs mt-1 truncate"
            style={{ color: "rgba(139,220,255,0.6)" }}
          >
            {proj.link}
          </p>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 rounded-lg transition-all hover:bg-white/10"
          aria-label="Edit project"
        >
          <Pencil size={13} style={{ color: "#9ca3af" }} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg transition-all hover:bg-red-500/20"
          aria-label="Delete project"
        >
          <Trash2 size={13} style={{ color: "#9ca3af" }} />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectForm({
  proj,
  onChange,
  onSave,
  onCancel,
}: {
  proj: Project;
  onChange: (field: keyof Project, val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const uid = proj.id.slice(0, 8);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl p-4 space-y-3"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div>
        <Label htmlFor={`proj-title-${uid}`}>Project Title *</Label>
        <GlassInput
          id={`proj-title-${uid}`}
          placeholder="My Awesome App"
          value={proj.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`proj-desc-${uid}`}>Description</Label>
        <GlassTextarea
          id={`proj-desc-${uid}`}
          placeholder="What does it do?"
          value={proj.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`proj-link-${uid}`}>Link (optional)</Label>
        <GlassInput
          id={`proj-link-${uid}`}
          placeholder="https://github.com/..."
          value={proj.link}
          onChange={(e) => onChange("link", e.target.value)}
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl text-sm transition-all hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#9ca3af",
          }}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

function StepProjects({
  projects,
  setProjects,
}: { projects: Project[]; setProjects: (v: Project[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Project | null>(null);

  const openNew = () => {
    const fresh: Project = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      link: "",
    };
    setDraft(fresh);
    setEditingId("__new__");
  };

  const openEdit = (proj: Project) => {
    setDraft({ ...proj });
    setEditingId(proj.id);
  };

  const save = () => {
    if (!draft) return;
    if (editingId === "__new__") setProjects([...projects, draft]);
    else setProjects(projects.map((p) => (p.id === draft.id ? draft : p)));
    setEditingId(null);
    setDraft(null);
  };

  const cancel = () => {
    setEditingId(null);
    setDraft(null);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {projects.map((proj) =>
          editingId === proj.id && draft ? (
            <ProjectForm
              key={proj.id}
              proj={draft}
              onChange={(f, v) => setDraft({ ...draft, [f]: v })}
              onSave={save}
              onCancel={cancel}
            />
          ) : (
            <ProjectCard
              key={proj.id}
              proj={proj}
              onEdit={() => openEdit(proj)}
              onDelete={() =>
                setProjects(projects.filter((p) => p.id !== proj.id))
              }
            />
          ),
        )}
      </AnimatePresence>
      {editingId === "__new__" && draft ? (
        <ProjectForm
          proj={draft}
          onChange={(f, v) => setDraft({ ...draft, [f]: v })}
          onSave={save}
          onCancel={cancel}
        />
      ) : (
        <AddButton onClick={openNew} data-ocid="onboard-add-project">
          Add Project
        </AddButton>
      )}
    </div>
  );
}

// ─── Step 5 ───────────────────────────────────────────────────────────────────

function StepResume({
  resumeFile,
  setResumeFile,
}: { resumeFile: File | null; setResumeFile: (f: File | null) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (
        ALLOWED_TYPES.includes(file.type) ||
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")
      ) {
        setResumeFile(file);
      }
    },
    [setResumeFile],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      ALLOWED_TYPES.includes(file.type) ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx")
    ) {
      setResumeFile(file);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={onInputChange}
      />

      {resumeFile ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <FileText size={18} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {resumeFile.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
              {formatSize(resumeFile.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setResumeFile(null)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-all flex-shrink-0"
            aria-label="Remove file"
          >
            <X size={14} style={{ color: "#9ca3af" }} />
          </button>
        </motion.div>
      ) : (
        <button
          type="button"
          data-ocid="onboard-resume-upload"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className="w-full rounded-xl flex flex-col items-center justify-center gap-3 py-12 cursor-pointer transition-all duration-200"
          style={{
            border: `2px dashed ${dragOver ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}`,
            background: dragOver
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.02)",
          }}
        >
          <motion.div
            animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <Upload size={20} className="text-white" />
          </motion.div>
          <div className="text-center">
            <p className="text-sm text-white font-medium">
              Drag resume here or{" "}
              <span style={{ color: "rgba(139,220,255,0.8)" }}>
                click to upload
              </span>
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              PDF, DOC or DOCX · Max 5 MB
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Step 1
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // Step 2
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Step 3
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Step 4
  const [projects, setProjects] = useState<Project[]>([]);

  // Step 5
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const canProceed = () => {
    if (step === 1)
      return (
        name.trim() !== "" && phone.trim() !== "" && location.trim() !== ""
      );
    if (step === 2) return skills.length > 0;
    // Steps 3, 4, 5 are optional
    return true;
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const goNext = () => {
    if (step < STEPS.length) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const variants = makeVariants(direction);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, #ffffff 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-xl relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="glow-text text-3xl font-bold">jobbly.ai</span>
          <p className="mt-2 text-sm" style={{ color: "#9ca3af" }}>
            Let's set up your profile
          </p>
        </motion.div>

        {/* Step dots + labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-start justify-between mb-4 px-1"
        >
          {STEPS.map(({ id, label }) => (
            <div key={id} className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-400"
                style={{
                  background:
                    id < step
                      ? "rgba(255,255,255,0.2)"
                      : id === step
                        ? "#ffffff"
                        : "rgba(255,255,255,0.07)",
                  color:
                    id === step
                      ? "#0a0a0a"
                      : id < step
                        ? "rgba(255,255,255,0.5)"
                        : "#4b5563",
                  boxShadow:
                    id === step ? "0 0 12px rgba(255,255,255,0.3)" : "none",
                  transform: id === step ? "scale(1.1)" : "scale(1)",
                }}
              >
                {id < step ? "✓" : id}
              </div>
              <span
                className="text-[10px] font-medium hidden sm:block"
                style={{ color: id === step ? "#ffffff" : "#4b5563" }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div
          className="w-full rounded-full mb-7 overflow-hidden"
          style={{ height: 2, background: "rgba(255,255,255,0.07)" }}
        >
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, #ffffff 100%)",
            }}
          />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Card header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                {STEPS[step - 1].label}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                Step {step} of {STEPS.length}
                {STEPS[step - 1].optional && (
                  <span
                    className="ml-2 px-1.5 py-0.5 rounded text-[10px]"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "#9ca3af",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    optional
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Animated step content */}
          <div style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {step === 1 && (
                  <StepBasicInfo
                    name={name}
                    phone={phone}
                    location={location}
                    setName={setName}
                    setPhone={setPhone}
                    setLocation={setLocation}
                  />
                )}
                {step === 2 && (
                  <StepSkills
                    skills={skills}
                    skillInput={skillInput}
                    setSkillInput={setSkillInput}
                    onAdd={addSkill}
                    onRemove={(s) => setSkills(skills.filter((x) => x !== s))}
                  />
                )}
                {step === 3 && (
                  <StepExperience
                    experiences={experiences}
                    setExperiences={setExperiences}
                  />
                )}
                {step === 4 && (
                  <StepProjects projects={projects} setProjects={setProjects} />
                )}
                {step === 5 && (
                  <StepResume
                    resumeFile={resumeFile}
                    setResumeFile={setResumeFile}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-5 gap-3">
          <motion.button
            type="button"
            data-ocid="onboard-back"
            onClick={goBack}
            disabled={step === 1}
            whileHover={{ scale: step === 1 ? 1 : 1.02 }}
            whileTap={{ scale: step === 1 ? 1 : 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "#9ca3af",
            }}
          >
            <ChevronLeft size={15} /> Back
          </motion.button>

          <motion.button
            type="button"
            data-ocid="onboard-next"
            onClick={goNext}
            disabled={!canProceed()}
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.97 : 1 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: canProceed() ? "#ffffff" : "rgba(255,255,255,0.3)",
              color: "#0a0a0a",
              boxShadow: canProceed()
                ? "0 4px 20px rgba(255,255,255,0.15)"
                : "none",
            }}
          >
            {step === STEPS.length ? "Finish" : "Next"}{" "}
            <ChevronRight size={15} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
