import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary p-3">
      <div className="container-fluid d-flex justify-content-start">
        <Link href="/" className="navbar-brand fw-bold me-4">
          QuizAI
        </Link>

        {/* Simple Horizontal List */}
        <ul className="nav">
          <li className="nav-item">
            <Link href="/" className="nav-link text-white">
              Create Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/quiz" className="nav-link text-white">
              All Quizzes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
