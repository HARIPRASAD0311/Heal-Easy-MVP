import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { useSession } from "../context/SessionContext.jsx";

const SECTION_KEYS = [
  { key: "chiefComplaint",        title: "Chief Complaint" },
  { key: "historyOfPresentIllness", title: "History of Present Illness" },
  { key: "relevantHistory",       title: "Relevant History" },
  { key: "symptoms",              title: "Symptoms" },
  { key: "examinationNotes",      title: "Examination Notes" },
  { key: "assessment",            title: "Assessment" },
  { key: "plan",                  title: "Plan" },
  { key: "followUp",              title: "Follow Up" },
];

function normaliseSections(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw; // already [{title, body}]

  // Map known keys, fall back to stringifying unknown values
  const mapped = SECTION_KEYS.map(({ key, title }) => ({
    key,
    title,
    body: raw[key] || raw[title] || "",
  })).filter((s) => s.body);

  if (mapped.length) return mapped;

  // Fallback: turn any object into sections
  return Object.entries(raw).map(([k, v]) => ({
    key: k,
    title: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
    body: Array.isArray(v) ? v.join(", ") : String(v),
  }));
}

export default function CaseSheet() {
  const navigate = useNavigate();
  const { session } = useSession();

  const initial = normaliseSections(session.caseSheet);
  const [sections, setSections] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => { setDraft(sections); setIsEditing(true); };
  const handleSave = () => { setSections(draft); setIsEditing(false); };
  const handleCancel = () => { setDraft(sections); setIsEditing(false); };
  const handleFieldChange = (key, value) =>
    setDraft((prev) => prev.map((s) => (s.key === key ? { ...s, body: value } : s)));

  const visible = isEditing ? draft : sections;

  if (!session.caseSheet && sections.length === 0) {
    return (
      <div className="min-h-screen bg-clinical-50">
        <PageHeader back={{ to: "/consultation", label: "Back" }} />
        <main className="mx-auto max-w-2xl px-5 py-16 text-center">
          <p className="text-muted">No case sheet available. Please generate one from the consultation page.</p>
          <button onClick={() => navigate("/consultation")} className="btn-primary mt-6">
            Back to Consultation
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/consultation", label: "Back" }}
        profile={{ to: "/doctor-profile", label: "My profile" }}
      />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-clinical-900">Case sheet</h1>
            <p className="mt-2 text-muted">Generated from today's consultation</p>
          </div>
          {!isEditing && (
            <button type="button" onClick={handleEdit} className="btn-secondary shrink-0 py-2.5 text-sm">
              Edit
            </button>
          )}
        </div>

        <div className={["mt-8 rounded-xl2 border bg-white shadow-card transition",
          isEditing ? "border-clinical-300" : "border-clinical-100"].join(" ")}>
          <div className="divide-y divide-clinical-100 px-6 sm:px-8">
            {visible.map((s) => (
              <div key={s.key} className="py-5 first:pt-6 last:pb-6">
                <label htmlFor={s.key}
                  className="block font-display text-xs font-bold uppercase tracking-wide text-clinical-700">
                  {s.title}
                </label>
                {isEditing ? (
                  <textarea id={s.key} value={s.body} rows={3}
                    onChange={(e) => handleFieldChange(s.key, e.target.value)}
                    className="field-input mt-2.5 resize-none text-sm leading-relaxed" />
                ) : (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={handleSave} className="btn-primary flex-1 py-3.5 text-base">Save</button>
            <button type="button" onClick={handleCancel} className="btn-secondary flex-1 py-3.5 text-base">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => navigate("/doctor-dashboard")}
            className="btn-primary mt-6 w-full py-3.5 text-base">
            Done
          </button>
        )}
      </main>
    </div>
  );
}
