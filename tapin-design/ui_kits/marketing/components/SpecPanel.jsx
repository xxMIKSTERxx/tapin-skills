function SpecPanel() {
  const rows = [
    ['head_mass',       '354.218 g'],
    ['MOI_y',           '5,820 g·cm²'],
    ['MOI_x',           '4,210 g·cm²'],
    ['CoM offset (x)',  '86.4 mm'],
    ['face loft',       '2.5°'],
    ['face roughness',  'Rₐ 1.20 µm'],
    ['modal 1f',        '4,103 Hz'],
    ['alloy',           'Ti-6Al-4V'],
    ['process',         'DMLS · 30 µm layer'],
    ['tolerance',       '± 0.05 mm'],
  ];
  return (
    <section className="spec">
      <div className="spec__visual">
        <img src="../../assets/imagery/putter-wireframe.svg" alt="Wireframe mesh of a TapIn mallet head" />
      </div>
      <div className="spec__copy">
        <div className="spec__label">Specimen · Tap-043 · v7</div>
        <h2 className="spec__title">Fang, <span className="it">balanced.</span></h2>
        <p>One generated putter, every number resolved. The values below are not aspirational — they are the validated output of the compute run that produced this part.</p>
        <div className="spec__table">
          {rows.map(([k, v]) => (
            <div className="spec__row" key={k}><span>{k}</span><span>{v}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.SpecPanel = SpecPanel;
