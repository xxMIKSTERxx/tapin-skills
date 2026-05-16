function Pipeline() {
  const steps = [
    {n: 'STEP · 01', t: 'Capture',  p: 'Stroke biomechanics from SAM PuttLab, force plate, and high-speed face. Per-player.', svg: <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>},
    {n: 'STEP · 02', t: 'Constrain', p: 'Target MOI, mass envelope, face loft, hosel offset, alloy. Six dimensions, two left free.', svg: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M18 8v8M8 18h8"/></>},
    {n: 'STEP · 03', t: 'Compute',  p: 'The CEM resolves geometry. Lattice infill, mass placement, modal response — all in one pass.', svg: <><ellipse cx="12" cy="13" rx="9" ry="6"/><ellipse cx="12" cy="13" rx="5" ry="3" opacity="0.6"/><circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/></>},
    {n: 'STEP · 04', t: 'Print',    p: 'Ti-6Al-4V DMLS, 30 µm layer, heat-treat, surface-finish, validate. 11 days from solve to ship.', svg: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5M12 12v9" opacity="0.6"/></>},
  ];
  return (
    <section className="pipeline">
      <div className="pipeline__head">
        <h2>From stroke to STL in four passes.</h2>
        <p>No CAD seat. No back-and-forth. A single computational engineering model owns the part from biomechanical capture through to the slicer.</p>
      </div>
      <div className="pipeline__steps">
        {steps.map(s => (
          <div className="pipeline__step" key={s.n}>
            <div className="glyph">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.svg}</svg>
            </div>
            <div className="num">{s.n}</div>
            <h4>{s.t}</h4>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Pipeline = Pipeline;
