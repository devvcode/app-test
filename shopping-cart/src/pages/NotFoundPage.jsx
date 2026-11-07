import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="page-container not-found">
      <span className="not-found-mark">404</span>
      <span className="section-eyebrow">A LITTLE DETOUR</span>
      <h1>This page wandered off.</h1>
      <p>The page you're looking for may have moved. Let's get you back to the good things.</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={16} /> Back to Morrow Market</Link>
    </div>
  );
}
