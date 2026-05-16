// Inspector — right rail. Constraints + computed readout + run button.

function Inspector({ constraints, setConstraints, computed, target, computing, onCompute }) {
  return (
    <div className="inspector">

      {/* Constraints */}
      <div className="inspector__section">
        <div className="inspector__title"><span>Constraints</span><span style={{color: 'var(--fg-2)'}}>4 / 6</span></div>

        <div className="field">
          <label><span>Head family</span><b>{constraints.family}</b></label>
          <div style={{display: 'flex', gap: 4}}>
            {['mallet', 'blade', 'fang'].map(f => (
              <button
                key={f}
                onClick={() => setConstraints({...constraints, family: f})}
                className="btn btn--compact"
                style={{flex: 1, padding: 0, background: constraints.family === f ? 'var(--surface-3)' : 'transparent', borderColor: constraints.family === f ? 'var(--line-strong)' : 'var(--line-soft)'}}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label><span>Target mass</span><b>{constraints.mass} g</b></label>
          <input type="range" min="320" max="380" value={constraints.mass} onChange={e => setConstraints({...constraints, mass: parseInt(e.target.value)})} />
        </div>

        <div className="field">
          <label><span>Target MOI (y)</span><b>{constraints.moi.toLocaleString()} g·cm²</b></label>
          <input type="range" min="4800" max="6500" step="20" value={constraints.moi} onChange={e => setConstraints({...constraints, moi: parseInt(e.target.value)})} />
        </div>

        <div className="field">
          <label><span>Face loft</span><b>{constraints.loft.toFixed(1)}°</b></label>
          <input type="range" min="1" max="5" step="0.1" value={constraints.loft} onChange={e => setConstraints({...constraints, loft: parseFloat(e.target.value)})} />
        </div>
      </div>

      {/* Run button */}
      <div className="inspector__section">
        <button className={`compute-btn ${computing ? 'computing' : ''}`} onClick={onCompute} disabled={computing}>
          {computing ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 1.2s linear infinite'}}>
                <path d="M21 12a9 9 0 1 1-6.2-8.55"/>
              </svg>
              Computing…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 4 20 12 6 20 6 4"/>
              </svg>
              Compute geometry
            </>
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Readout */}
      <div className="inspector__section">
        <div className="inspector__title"><span>Readout</span><span style={{color: 'var(--putter-500)'}}>validated</span></div>

        <Readout k="head_mass" v={computed.mass.toFixed(3) + ' g'} t={target.mass} actual={computed.mass} />
        <Readout k="moi_y" v={computed.moi.toLocaleString() + ' g·cm²'} t={target.moi} actual={computed.moi} />
        <Readout k="moi_x" v={computed.moix.toLocaleString() + ' g·cm²'} t={null} actual={computed.moix} />
        <Readout k="com_x" v={computed.comx.toFixed(1) + ' mm'} t={null} actual={computed.comx} />
        <Readout k="modal_1f" v={computed.modal.toLocaleString() + ' Hz'} t={null} actual={computed.modal} />
        <Readout k="face_Rₐ" v={'1.20 µm'} t={null} actual={1.2} />
      </div>

      {/* Materials */}
      <div className="inspector__section">
        <div className="inspector__title"><span>Material</span></div>
        <div className="kv"><span className="k">alloy</span><span className="v">Ti-6Al-4V</span><span className="d zero">—</span></div>
        <div className="kv"><span className="k">process</span><span className="v">DMLS</span><span className="d zero">—</span></div>
        <div className="kv"><span className="k">layer</span><span className="v">30 µm</span><span className="d zero">—</span></div>
        <div className="kv"><span className="k">est. cost</span><span className="v">$ 412</span><span className="d zero">—</span></div>
      </div>

    </div>
  );
}

function Readout({ k, v, t, actual }) {
  let delta = null;
  let cls = 'zero';
  if (t != null) {
    const d = actual - t;
    if (Math.abs(d) < 0.01) { delta = '✓'; cls = ''; }
    else if (d > 0) { delta = '+' + (Math.abs(d) > 99 ? Math.round(d) : d.toFixed(1)); cls = ''; }
    else { delta = '−' + (Math.abs(d) > 99 ? Math.round(-d) : (-d).toFixed(1)); cls = 'down'; }
  } else { delta = '—'; }
  return (
    <div className="kv">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      <span className={`d ${cls}`}>{delta}</span>
    </div>
  );
}

window.Inspector = Inspector;
