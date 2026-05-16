// Canvas — main viewport. Three overlays: clean / isoline / FEA.

function PutterRender({ overlay, computing }) {
  // Built from the same vocabulary as assets/imagery/* but as a React tree
  // so it can react to overlay state. Top-down sole view.
  return (
    <svg viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <radialGradient id="iso-fill-c" cx="55%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.45"/>
          <stop offset="35%" stopColor="#F5C451" stopOpacity="0.28"/>
          <stop offset="70%" stopColor="#6BE095" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fea-fill-c" cx="42%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.85"/>
          <stop offset="25%" stopColor="#F5C451" stopOpacity="0.7"/>
          <stop offset="55%" stopColor="#6BE095" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0.18"/>
        </radialGradient>
        <clipPath id="putter-clip">
          <path d="M150 200 C 150 130, 220 100, 320 100 L 580 100 C 680 100, 720 150, 720 250 C 720 350, 680 400, 580 400 L 320 400 C 220 400, 150 370, 150 300 Z" />
        </clipPath>
      </defs>

      {/* Overlay fill */}
      <g clipPath="url(#putter-clip)">
        {overlay === 'isoline' && <rect width="800" height="500" fill="url(#iso-fill-c)"/>}
        {overlay === 'fea' && <rect width="800" height="500" fill="url(#fea-fill-c)"/>}

        {overlay === 'isoline' && (
          <g fill="none" stroke="#F4F1EA" strokeWidth="1" opacity="0.85">
            <ellipse cx="460" cy="250" rx="220" ry="130"/>
            <ellipse cx="460" cy="250" rx="170" ry="100" opacity="0.85"/>
            <ellipse cx="460" cy="250" rx="120" ry="72" opacity="0.7"/>
            <ellipse cx="460" cy="250" rx="75" ry="46" opacity="0.55"/>
            <ellipse cx="460" cy="250" rx="38" ry="24" opacity="0.4"/>
          </g>
        )}

        {overlay === 'fea' && (
          <g stroke="#F4F1EA" strokeWidth="0.4" opacity="0.18">
            {[150, 200, 250, 300, 350].map((y, i) => (
              <line key={'h'+i} x1="150" y1={y} x2="720" y2={y}/>
            ))}
            {[200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700].map((x, i) => (
              <line key={'v'+i} x1={x} y1="100" x2={x} y2="400"/>
            ))}
          </g>
        )}
      </g>

      {/* Putter outline */}
      <path d="M150 200 C 150 130, 220 100, 320 100 L 580 100 C 680 100, 720 150, 720 250 C 720 350, 680 400, 580 400 L 320 400 C 220 400, 150 370, 150 300 Z"
            fill="none" stroke={computing ? "#3DCB72" : "#F4F1EA"} strokeWidth="1.5"
            strokeDasharray={computing ? "4 4" : "none"}>
        {computing && <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.6s" repeatCount="indefinite"/>}
      </path>

      {/* Center of mass */}
      <g stroke="#6BE095" strokeWidth="1.25" fill="none">
        <circle cx="460" cy="250" r="9"/>
        <line x1="447" y1="250" x2="473" y2="250"/>
        <line x1="460" y1="237" x2="460" y2="263"/>
      </g>
      <circle cx="460" cy="250" r="1.8" fill="#6BE095"/>

      {/* Sight line on top */}
      <line x1="460" y1="100" x2="460" y2="170" stroke="#F4F1EA" strokeWidth="1" opacity="0.7"/>

      {/* Axis ticks bottom */}
      <g stroke="#5A625F" strokeWidth="0.75" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#8A918D">
        <line x1="60" y1="450" x2="740" y2="450"/>
        <line x1="60" y1="60" x2="60" y2="450"/>
        <line x1="150" y1="447" x2="150" y2="453"/>
        <line x1="300" y1="447" x2="300" y2="453"/>
        <line x1="450" y1="447" x2="450" y2="453"/>
        <line x1="600" y1="447" x2="600" y2="453"/>
        <line x1="720" y1="447" x2="720" y2="453"/>
        <text x="146" y="466">0</text>
        <text x="290" y="466">30</text>
        <text x="440" y="466">60</text>
        <text x="590" y="466">90</text>
        <text x="708" y="466">120 mm</text>
      </g>

      {/* Top corner figure label */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8A918D">
        <text x="60" y="40" letterSpacing="2" fontWeight="500" fill="#C4C8C5">FIG. {overlay === 'isoline' ? '03 — MASS DISTRIBUTION' : overlay === 'fea' ? '11 — VON-MISES STRESS' : '01 — HEAD GEOMETRY, SOLE'}</text>
        <text x="60" y="55">{overlay === 'isoline' ? 'Iso-density contours · Δ = 0.4 g·cm⁻²' : overlay === 'fea' ? 'Impact 1.45 m·s⁻¹ · 45 g ball · t = 0.18 ms' : 'Sole plane projection · scale 1:1'}</text>
      </g>
    </svg>
  );
}

function Canvas({ design, overlay, onOverlay, computing }) {
  return (
    <div className="canvas-wrap">
      <div className="canvas-toolbar">
        <div className="canvas-overlay-pills">
          {['clean', 'isoline', 'fea'].map(o => (
            <button key={o} className={`canvas-overlay-pill ${overlay === o ? 'active' : ''}`} onClick={() => onOverlay(o)}>
              {o === 'clean' ? 'geometry' : o === 'isoline' ? 'mass · iso' : 'stress · FEA'}
            </button>
          ))}
        </div>
        <div className="canvas-readout">
          <div><span className="l">Center of mass</span></div>
          <div><span className="v">x 86.4 mm · y 12.1 mm · z 0.8 mm</span></div>
        </div>
      </div>

      <div className="canvas-svg-wrap">
        <PutterRender overlay={overlay} computing={computing} />
      </div>

      <div className="canvas-corner">
        <div className="row"><b>{design.name}</b> · v{design.version}</div>
        <div className="row">Ti-6Al-4V · DMLS · layer 30 µm</div>
        <div className="row">Vertices 14,228 · faces 28,401</div>
      </div>

      <div className="canvas-zoom">
        <button>−</button>
        <span className="v">100 %</span>
        <button>+</button>
        <button title="fit">⤧</button>
      </div>
    </div>
  );
}

window.Canvas = Canvas;
