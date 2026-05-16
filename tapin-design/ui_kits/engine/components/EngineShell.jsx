// EngineShell — wires everything together. Stateful click-thru.

const SEED_LINES = [
  {t: '00:00.01', label: 'engine',    tag: 'ok',   msg: 'kernel ready · 14 threads'},
  {t: '00:00.04', label: 'project',   tag: 'dim',  msg: 'load · Series M · 12 Taps'},
  {t: '00:00.18', label: 'tap·043',   tag: 'ok',   msg: 'restored · mass 354.2 g · MOI 5,820'},
  {t: '00:00.22', label: 'idle',      tag: 'dim',  msg: 'awaiting constraint edit'},
];

const COMPUTE_LINES = [
  {t: '00:00.00', label: 'engine',     tag: '',     msg: 'compute · received constraint set'},
  {t: '00:00.04', label: 'validate',   tag: 'ok',   msg: 'constraints feasible · DOF = 2'},
  {t: '00:00.12', label: 'kernel',     tag: '',     msg: 'parametric seed · family=mallet · cells=14228'},
  {t: '00:00.41', label: 'topology',   tag: '',     msg: 'lattice infill · target ρ = 0.62'},
  {t: '00:00.88', label: 'mass',       tag: '',     msg: 'iter 1 · m = 358.4 g · Δ +4.4'},
  {t: '00:01.22', label: 'mass',       tag: '',     msg: 'iter 4 · m = 354.6 g · Δ +0.6'},
  {t: '00:01.55', label: 'moi',        tag: '',     msg: 'rebalance · MOI_y = 5,786 → 5,820'},
  {t: '00:01.91', label: 'modal',      tag: '',     msg: 'eigenanalysis · 1f = 4,103 Hz'},
  {t: '00:02.18', label: 'fea',        tag: '',     msg: 'impact σ_max = 248 MPa · safe'},
  {t: '00:02.34', label: 'mesh',       tag: 'ok',   msg: 'manifold · ✓ printable Ti-6Al-4V'},
  {t: '00:02.38', label: 'engine',     tag: 'ok',   msg: 'geometry validated · ready to slice'},
];

const DESIGNS = [
  {id: '042', name: 'Fang · low-MOI',  version: 'v3', mass: 348, moi: 5420, modal: 4011},
  {id: '043', name: 'Fang · balanced', version: 'v7', mass: 354, moi: 5820, modal: 4103},
  {id: '044', name: 'Fang · high-MOI', version: 'v2', mass: 361, moi: 6140, modal: 4222},
  {id: '038', name: 'Blade · Anser',   version: 'v5', mass: 342, moi: 4980, modal: 4310},
  {id: '029', name: 'Mallet · spider', version: 'v9', mass: 365, moi: 6280, modal: 3940},
];

function EngineShell() {
  const [activeId, setActiveId] = React.useState('043');
  const [rail, setRail] = React.useState('designs');
  const [overlay, setOverlay] = React.useState('isoline');
  const [constraints, setConstraints] = React.useState({family: 'mallet', mass: 354, moi: 5820, loft: 2.5});
  const [computed, setComputed] = React.useState({mass: 354.218, moi: 5820, moix: 4210, comx: 86.4, modal: 4103});
  const [computing, setComputing] = React.useState(false);
  const [status, setStatus] = React.useState('validated');
  const [dirty, setDirty] = React.useState(false);
  const [lines, setLines] = React.useState(SEED_LINES);
  const [toast, setToast] = React.useState(null);

  const activeDesign = DESIGNS.find(d => d.id === activeId) || DESIGNS[1];

  const target = {mass: constraints.mass, moi: constraints.moi};

  // Mark dirty when constraints change (skip initial render)
  const firstRun = React.useRef(true);
  React.useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    setDirty(true);
    setStatus('idle');
  }, [constraints.family, constraints.mass, constraints.moi, constraints.loft]);

  const runCompute = () => {
    if (computing) return;
    setComputing(true);
    setStatus('computing');
    // Stream the compute lines
    let i = 0;
    setLines(prev => [...prev, ...COMPUTE_LINES.slice(0, 1)]);
    const iv = setInterval(() => {
      i++;
      if (i >= COMPUTE_LINES.length) {
        clearInterval(iv);
        setComputing(false);
        setStatus('validated');
        setDirty(false);
        // Settle computed values
        const noise = (n, d) => +(n + (Math.random() - 0.5) * d).toFixed(3);
        setComputed({
          mass: noise(constraints.mass, 0.6),
          moi: Math.round(constraints.moi + (Math.random() - 0.5) * 20),
          moix: Math.round(4200 + (Math.random() - 0.5) * 60),
          comx: +(86.4 + (Math.random() - 0.5) * 0.3).toFixed(1),
          modal: Math.round(4100 + (Math.random() - 0.5) * 40),
        });
        setToast({title: 'Geometry validated', sub: `${constraints.mass} g · MOI ${constraints.moi.toLocaleString()} · modal 1f 4,103 Hz · ready to slice`});
        return;
      }
      setLines(prev => [...prev, COMPUTE_LINES[i]]);
    }, 220);
  };

  return (
    <div className="engine">
      <TopBar
        project="Series M"
        designName={activeDesign.name + ' · v' + activeDesign.version.replace('v','')}
        status={status}
        dirty={dirty}
        onExport={() => setToast({title: 'STL exported', sub: 'tap_043_v7.stl · 12.4 MB · ready for printer'})}
      />
      <LeftRail active={rail} onChange={setRail} />
      <div className="body">
        <DesignList designs={DESIGNS} activeId={activeId} onSelect={setActiveId} onNew={() => {}} />
        <Canvas design={activeDesign} overlay={overlay} onOverlay={setOverlay} computing={computing} />
      </div>
      <Inspector
        constraints={constraints}
        setConstraints={setConstraints}
        computed={computed}
        target={target}
        computing={computing}
        onCompute={runCompute}
      />
      <LogDock lines={lines} pid="14228" />
      {toast && <Toast title={toast.title} sub={toast.sub} onDismiss={() => setToast(null)} />}
    </div>
  );
}

window.EngineShell = EngineShell;
