function Manifesto() {
  const rows = [
    {n: '01', h: 'Putters are not sculpted. They are solved.', p: 'Every weight pad, every cavity, every wall thickness is the result of a constraint — not a stylistic choice. The engine accepts your stroke, your tolerance budget, your target inertia. The geometry follows.'},
    {n: '02', h: 'The kernel is the workshop.', p: 'We replaced the CAD seat with a programmable geometry kernel. One model. One source of truth. No re-meshing, no re-modeling, no human in the loop between intent and STL.'},
    {n: '03', h: 'Titanium, by additive.', p: 'Every Tap is printed in Ti-6Al-4V at 30 µm layer height, heat-treated, and surface-machined to Rₐ ≤ 1.6 µm at the face. The lattice infill is integral to the part, not bolted on.'},
  ];
  return (
    <section className="manifesto">
      <div className="manifesto__label">Manifesto / 01 — 03</div>
      <div className="manifesto__rows">
        {rows.map(r => (
          <div className="manifesto__row" key={r.n}>
            <div className="n">{r.n}</div>
            <div>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Manifesto = Manifesto;
