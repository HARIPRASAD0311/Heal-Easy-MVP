import { Link } from "react-router-dom";

/**
 * Shared top navigation bar used across the app.
 *
 * Props:
 * - back:    optional { to, label } — renders a text back/logout link
 * - profile: optional { to, label } — renders a round avatar icon button
 *            that opens the relevant dashboard/profile screen
 *
 * Sticky, white background, subtle shadow, consistent height — used on
 * every interior page so navigation always feels the same.
 */
export default function PageHeader({ back, profile }) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-clinical-100 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-700 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v7m0 0v7m0-7h7m-7 0H5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-clinical-900">
            Heal<span className="text-clinical-600">Easy</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {back && (
            <Link to={back.to} className="btn-ghost text-sm">
              {back.label}
            </Link>
          )}

          {profile && (
            <Link
              to={profile.to}
              aria-label={profile.label || "Open profile"}
              title={profile.label || "Profile"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clinical-100 text-clinical-700 transition hover:bg-clinical-200 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
