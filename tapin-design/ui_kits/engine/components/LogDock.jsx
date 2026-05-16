// LogDock — streaming compute log.

function LogDock({ lines, pid }) {
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="log">
      <div className="log__header">
        <span>log</span>
        <span className="pid">pid {pid}</span>
        <span style={{color: 'var(--fg-4)'}}>· kernel 0.18.2 · engine 2.4.0</span>
        <div style={{flex: 1}} />
        <span>{lines.length} lines</span>
      </div>
      <div className="log__body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div className="log__line" key={i}>
            <span className="t">{l.t}</span>
            <span className={`tag ${l.tag || 'dim'}`}>{l.label}</span>
            <span className="msg">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.LogDock = LogDock;
