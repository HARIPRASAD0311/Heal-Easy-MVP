import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/select-hospital");
  };

  return (
    <div className="min-h-screen bg-clinical-50">
      <PageHeader back={{ to: "/", label: "Back to home" }} />

      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-16 sm:px-8">
        <h1 className="text-center font-display text-3xl font-extrabold text-clinical-900">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-muted">
          Log in to continue your consultation.
        </p>

        <form onSubmit={handleSubmit} className="surface-card mt-8 w-full space-y-5">
          <div>
            <label className="field-label" htmlFor="identifier">Email or phone</label>
            <input id="identifier" type="text" placeholder="you@example.com" className="field-input" required />
          </div>

          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" className="field-input" required />
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 text-base">
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          New to HealEasy?{" "}
          <Link to="/register" className="font-semibold text-clinical-700 hover:text-clinical-800">
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
}
