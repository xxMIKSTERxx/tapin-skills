// DesignList — list of Tap instances in the current project.

function DesignList({ designs, activeId, onSelect, onNew }) {
  return (
    <div className="designs">
      <div className="designs__header">
        <span className="designs__title">Taps · {designs.length}</span>
        <button className="btn btn--ghost btn--compact" onClick={onNew} style={{height: 24, padding: '0 8px'}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          New
        </button>
      </div>
      <div className="designs__list">
        {designs.map(d => (
          <div
            key={d.id}
            className={`design ${d.id === activeId ? 'active' : ''}`}
            onClick={() => onSelect(d.id)}
          >
            <div className="design__id">
              <span className="design__tag">Tap · {d.id}</span>
              <span className="design__tag">{d.version}</span>
            </div>
            <div className="design__name">{d.name}</div>
            <div className="design__stats">
              <div className="design__stat"><span className="v">{d.mass}</span><span className="u">g</span></div>
              <div className="design__stat"><span className="v">{d.moi.toLocaleString()}</span><span className="u">MOI</span></div>
              <div className="design__stat"><span className="v">{d.modal}</span><span className="u">Hz</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.DesignList = DesignList;
