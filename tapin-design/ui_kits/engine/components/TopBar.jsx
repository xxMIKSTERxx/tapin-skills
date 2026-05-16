// TopBar — engineering breadcrumb + project status + actions.

function TopBar({ project, designName, status, dirty, onExport }) {
  return (
    <div className="topbar">
      <div className="topbar__logo">
        <svg width="22" height="18" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
          <g fill="currentColor">
            <rect x="20" y="30" width="200" height="36"/>
            <rect x="50" y="30" width="36" height="160"/>
          </g>
        </svg>
        <svg width="56" height="20" viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
          <text x="10" y="125" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="140" fill="currentColor" letterSpacing="-5">TapIn</text>
        </svg>
      </div>

      <div className="topbar__crumbs">
        <span>{project}</span>
        <span className="sep">/</span>
        <b>{designName}</b>
        {dirty && <span style={{color: 'var(--warn-500)', marginLeft: 4}}>·</span>}
      </div>

      <div className="topbar__spacer" />

      <div className="topbar__status">
        <span className={`dot ${status === 'computing' ? 'warn' : ''}`} />
        <span>{status === 'idle' ? 'idle' : status === 'computing' ? 'computing…' : 'validated · 12s ago'}</span>
      </div>

      <button className="btn btn--compact">Mesh · view</button>
      <button className="btn btn--compact" onClick={onExport}>Export STL</button>
    </div>
  );
}

window.TopBar = TopBar;
