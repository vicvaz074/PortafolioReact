import { SectionIntro } from './SectionIntro';

export function Trajectory({ content }) {
  return (
    <section id="trajectory" className="section trajectory-section" aria-labelledby="trajectory-title">
      <SectionIntro
        label={content.label}
        title={content.title}
        intro={content.intro}
        id="trajectory-title"
      />

      <div className="timeline">
        <div className="timeline__rail" aria-hidden="true">
          <span className="timeline__signal" />
        </div>
        {content.roles.map((role, index) => (
          <article className="timeline__role reveal" style={{ '--reveal-delay': `${index * 80}ms` }} key={role.company}>
            <p className="timeline__period">{role.period}</p>
            <div className="timeline__marker" aria-hidden="true">
              <span />
            </div>
            <div className="timeline__content">
              <p className="timeline__company">{role.company}</p>
              <h3>{role.role}</h3>
              <p>{role.copy}</p>
              <ul className="tag-list" aria-label="Focus areas">
                {role.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
