// Toast — engineering status notification.

function Toast({ title, sub, onDismiss }) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 4200);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div className="toast">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--putter-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: 1, flexShrink: 0}}>
        <polyline points="5 12 10 17 20 7"/>
      </svg>
      <div>
        <div className="title">{title}</div>
        <div className="sub">{sub}</div>
      </div>
    </div>
  );
}

window.Toast = Toast;
