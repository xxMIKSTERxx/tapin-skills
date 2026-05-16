function SiteFooter() {
  return (
    <>
      <footer className="site-footer site">
        <div className="site-footer__brand">
          <div className="site-header__logo">
            <svg width="24" height="20" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
              <g fill="currentColor">
                <rect x="20" y="30" width="200" height="36"/>
                <rect x="50" y="30" width="36" height="160"/>
              </g>
            </svg>
            <svg width="64" height="24" viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" style={{color: 'var(--fg-1)'}}>
              <text x="10" y="125" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="140" fill="currentColor" letterSpacing="-5">TapIn</text>
            </svg>
          </div>
          <p>Computed putters, printed in titanium. Designed in Zürich.</p>
        </div>
        <div>
          <h5>Product</h5>
          <ul>
            <li><a href="#">The Engine</a></li>
            <li><a href="#">Pipeline</a></li>
            <li><a href="#">Series M</a></li>
            <li><a href="#">Materials</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#">Manifesto</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Patents</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h5>Connect</h5>
          <ul>
            <li><a href="#">Schedule a fitting</a></li>
            <li><a href="#">OEM partners</a></li>
            <li><a href="#">Press kit</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </footer>
      <div className="site-footer__base">
        <span>© TapIn AG · Zürich</span>
        <span>v 2.4.0 · kernel 0.18.2</span>
      </div>
    </>
  );
}
window.SiteFooter = SiteFooter;
