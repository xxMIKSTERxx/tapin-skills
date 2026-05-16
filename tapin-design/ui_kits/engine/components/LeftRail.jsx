// LeftRail — icon-only navigation.

const RailIcon = ({ name, children }) => (
  <span title={name}>{children}</span>
);

function LeftRail({ active, onChange }) {
  const items = [
    {id: 'designs',     svg: <path d="M3 7h18M3 12h18M3 17h18"/>},
    {id: 'constraints', svg: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></>},
    {id: 'materials',   svg: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5M12 12v9"/></>},
    {id: 'library',     svg: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M9 4v16"/></>},
    {id: 'logs',        svg: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 9h10M7 13h7M7 17h4"/></>},
  ];
  return (
    <div className="rail">
      {items.map(it => (
        <div
          key={it.id}
          className={`rail__item ${active === it.id ? 'active' : ''}`}
          onClick={() => onChange(it.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{it.svg}</svg>
        </div>
      ))}
      <div className="rail__spacer" />
      <div className="rail__item" title="settings">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.32.74 1.04 1.21 1.85 1.21H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </div>
    </div>
  );
}

window.LeftRail = LeftRail;
