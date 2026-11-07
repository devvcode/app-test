export default function StatCard({ label, value, icon, tone, caption }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className={"stat-icon " + tone} aria-hidden="true">{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span className={"dot " + tone + "-dot"} />
        {caption}
      </div>
    </article>
  );
}