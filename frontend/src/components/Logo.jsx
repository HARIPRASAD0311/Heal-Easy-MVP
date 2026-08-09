import { Link } from "react-router-dom";

export default function Logo({ to = "/" }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 group">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-700 text-white shadow-card transition group-hover:bg-clinical-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v7m0 0v7m0-7h7m-7 0H5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-clinical-900">
        Heal<span className="text-clinical-600">Easy</span>
      </span>
    </Link>
  );
}
