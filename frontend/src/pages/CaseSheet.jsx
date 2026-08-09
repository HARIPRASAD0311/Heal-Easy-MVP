import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const DEFAULT_SECTIONS = [
  {
    key: "chiefComplaint",
    title: "Chief Complaint",
    body: "Headache and mild fever for the past 2 days, worsening in the evening.",
  },
  {
    key: "hpi",
    title: "History of Present Illness",
    body: "Patient reports gradual onset of frontal headache accompanied by low-grade fever. No associated nausea or visual disturbance reported. Took paracetamol once with mild, temporary relief.",
  },
  {
    key: "findings",
    title: "Findings",
    body: "Temperature: 99.8°F. No signs of neck stiffness. Pulse and blood pressure within normal range.",
  },
  {
    key: "assessment",
    title: "Assessment",
    body: "Likely viral fever with tension-type headache. No red-flag symptoms noted at this time.",
  },
  {
    key: "plan",
    title: "Plan",
    body: "Advise rest and hydration. Continue paracetamol as needed. Review in 3 days if symptoms persist or worsen.",
  },
];

export default function CaseSheet() {
  const navigate = useNavigate();
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [draft, setDraft] = useState(DEFAULT_SECTIONS);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setDraft(sections);
    setIsEditing(true);
  };

  const handleFieldChange = (key, value) => {
    setDraft((prev) => prev.map((s) => (s.key === key ? { ...s, body: value } : s)));
  };

  const handleSaveEdits = () => {
    setSections(draft);
    setIsEditing(false);
  };

  const handleCancelEdits = () => {
    setDraft(sections);
    setIsEditing(false);
  };

  const handleFinalize = () => {
    // No backend in this phase — just acknowledge the action locally.
    navigate("/doctor-dashboard");
  };

  const visible = isEditing ? draft : sections;

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader
        back={{ to: "/consultation", label: "Back" }}
        profile={{ to: "/doctor-profile", label: "My profile" }}
      />

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-clinical-900">
              Case sheet
            </h1>
            <p className="mt-2 text-muted">
              Ananya Sharma · Generated from today's consultation
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="btn-secondary shrink-0 py-2.5 text-sm"
            >
              Edit
            </button>
          )}
        </div>

        <div
          className={[
            "mt-8 rounded-xl2 border bg-white shadow-card transition",
            isEditing ? "border-clinical-300" : "border-clinical-100",
          ].join(" ")}
        >
          <div className="divide-y divide-clinical-100 px-6 sm:px-8">
            {visible.map((s) => (
              <div key={s.key} className="py-5 first:pt-6 last:pb-6">
                <label
                  htmlFor={s.key}
                  className="block font-display text-xs font-bold uppercase tracking-wide text-clinical-700"
                >
                  {s.title}
                </label>

                {isEditing ? (
                  <textarea
                    id={s.key}
                    value={s.body}
                    onChange={(e) => handleFieldChange(s.key, e.target.value)}
                    rows={3}
                    className="field-input mt-2.5 resize-none text-sm leading-relaxed"
                  />
                ) : (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleSaveEdits}
              className="btn-primary flex-1 py-3.5 text-base"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelEdits}
              className="btn-secondary flex-1 py-3.5 text-base"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleFinalize}
            className="btn-primary mt-6 w-full py-3.5 text-base"
          >
            Save
          </button>
        )}
      </main>
    </div>
  );
}
