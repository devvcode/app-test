const navigationItems = [
  { label: "Overview", icon: "▦" },
  { label: "Book catalogue", icon: "▤" },
  { label: "Borrowed books", icon: "↗" },
  { label: "Available books", icon: "✓" }
];

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="./" aria-label="Campus Library home">
        <span className="brand-mark">C</span>
        <span className="brand-copy">
          <strong>campus</strong>
          <small>LIBRARY SYSTEM</small>
        </span>
      </a>

      <p className="nav-label">WORKSPACE</p>
      <nav className="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            className={activeView === item.label ? "nav-item active" : "nav-item"}
            key={item.label}
            onClick={() => onNavigate(item.label)}
            type="button"
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon" aria-hidden="true">i</span>
          <strong>Local demo mode</strong>
          <p>Your changes are saved in this browser using localStorage.</p>
        </div>
        <div className="profile">
          <span className="avatar">RL</span>
          <span className="profile-copy">
            <strong>Riverside Library</strong>
            <small>Student workspace</small>
          </span>
          <span className="profile-menu" aria-hidden="true">•••</span>
        </div>
      </div>
    </aside>
  );
}