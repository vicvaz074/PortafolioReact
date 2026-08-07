export function SectionIntro({ label, title, intro, id }) {
  return (
    <header className="section-intro reveal">
      <p className="section-label">{label}</p>
      <div className="section-intro__copy">
        <h2 id={id}>{title}</h2>
        <p>{intro}</p>
      </div>
    </header>
  );
}
