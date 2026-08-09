import { useState } from "react";

/**
 * Presentational-only microphone button. No real recording logic is wired
 * up yet — this just toggles a local "listening" visual state so the flow
 * is clickable, per the current frontend-only phase.
 */
export default function MicButton({ label = "Tap to speak" }) {
  const [listening, setListening] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setListening((v) => !v)}
        aria-pressed={listening}
        className={[
          "relative flex h-24 w-24 items-center justify-center rounded-full transition sm:h-28 sm:w-28",
          listening
            ? "bg-pulse-500 shadow-[0_0_0_10px_rgba(15,191,184,0.15)]"
            : "bg-clinical-700 shadow-card hover:bg-clinical-800",
        ].join(" ")}
      >
        {listening && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-30" />
        )}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="relative text-white"
        >
          <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
          <path
            d="M5 11a7 7 0 0014 0M12 18v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="text-sm font-medium text-muted">
        {listening ? "Listening…" : label}
      </p>
    </div>
  );
}
