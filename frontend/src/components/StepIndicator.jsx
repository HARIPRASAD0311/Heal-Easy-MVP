const STEPS = [
  { key: "hospital", label: "Hospital" },
  { key: "symptoms", label: "Symptoms" },
  { key: "followup", label: "Follow-up" },
  { key: "summary", label: "Summary" },
];

/**
 * Reflects the patient's actual pre-consultation journey.
 * `current` is the key of the active step.
 */
export default function StepIndicator({ current }) {
  const activeIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="mx-auto mb-10 flex w-full max-w-xl items-center">
      {STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <li key={step.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition",
                  isDone
                    ? "border-clinical-600 bg-clinical-600 text-white"
                    : isActive
                    ? "border-clinical-600 bg-white text-clinical-700"
                    : "border-clinical-100 bg-white text-muted",
                ].join(" ")}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium",
                  isActive ? "text-clinical-700" : "text-muted",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "mx-2 mb-5 h-0.5 flex-1 rounded",
                  isDone ? "bg-clinical-600" : "bg-clinical-100",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
