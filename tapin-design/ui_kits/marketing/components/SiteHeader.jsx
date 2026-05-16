function SiteHeader() {
  return (
    <header className="site-header">
      <div className="inner">
        <a href="#" className="site-header__logo">
          <svg width="24" height="20" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
            <g fill="currentColor">
              <rect x="20" y="30" width="200" height="36"/>
              <rect x="50" y="30" width="36" height="160"/>
            </g>
          </svg>
          <svg width="64" height="24" viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
            <text x="10" y="125" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="140" fill="currentColor" letterSpacing="-5">TapIn</text>
          </svg>
        </a>
        <nav className="site-header__nav">
          <a href="#">The Engine</a>
          <a href="#">Manifesto</a>
          <a href="#">Pipeline</a>
          <a href="#">Players</a>
          <a href="#">Press</a>
        </nav>
        <div className="site-header__spacer" />
        <div className="site-header__status">
          <span style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--putter-500)'}} />
          Series M · accepting fittings
        </div>
        <button className="btn btn--primary btn--compact">Schedule a fitting</button>
      </div>
    </header>
  );
}
window.SiteHeader = SiteHeader;
