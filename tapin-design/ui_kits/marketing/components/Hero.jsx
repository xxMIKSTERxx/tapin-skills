function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <div className="hero__kicker"><span className="dot" />TapIn · Series M · 2026</div>
        <h1>A putter, <span className="it">computed.</span></h1>
        <p className="hero__sub">
          TapIn resolves head geometry, mass distribution, and modal response against your stroke — then prints it in titanium. The output is not a shape. It is a number, made real.
        </p>
        <div className="hero__ctas">
          <button className="btn btn--primary btn--hero">Schedule a fitting</button>
          <button className="btn btn--hero">Read the white paper →</button>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__corners" />
        <img src="../../assets/imagery/putter-isoline.svg" alt="Top-down mass-distribution map of a TapIn putter sole" />
        <div className="hero__readout">
          <span>mass</span><b>354.218 g</b>
          <span>MOI_y</span><b>5,820 g·cm²</b>
          <span>alloy</span><b>Ti-6Al-4V</b>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
